/**
 * Stage 6: registry 일괄 등록
 *   - packages/screen-specs/src/active-spec-list.ts: 30 imports + 30 entries × 2 maps
 *   - packages/screen-registry/src/index.ts: 30 screens entries
 *
 * 멱등 (re-run 시 이미 추가된 라인은 건너뜀).
 * pilot(billing-html-detail)는 이미 추가됐다고 가정 — skip.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../../../../../..");
const SPEC_LIST = resolve(REPO_ROOT, "packages/screen-specs/src/active-spec-list.ts");
const INDEX_TS = resolve(REPO_ROOT, "packages/screen-registry/src/index.ts");
const GEN_ROUTES = resolve(__dirname, "generated-routes.json");

type Gen = {
	id: string;
	htmlId: string;
	route: {
		id: string;
		type: string;
		use_case_id: string;
		primary_task: string;
		predecessor: string | null;
		successor: string | null;
	};
	useCase: "chk" | "pay" | "set";
};

function camelCase(htmlId: string): string {
	// "billing-html-detail" → "billingHtmlDetail"
	return htmlId.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function buildImportLines(gens: Gen[]): string[] {
	const lines: string[] = [];
	for (const g of gens) {
		const cc = camelCase(g.htmlId);
		lines.push(
			`import ${cc}Spec from "../spec/experimental/billing-from-html/${g.htmlId}.json";`,
			`import ${cc}RenderableSpec from "../spec/experimental/billing-from-html/${g.htmlId}.sdui.json";`,
		);
	}
	return lines;
}

function buildSpecEntries(gens: Gen[]): string[] {
	return gens.map((g) => `\t"${g.htmlId}": asScreenSpec(${camelCase(g.htmlId)}Spec),`);
}

function buildRenderableEntries(gens: Gen[]): string[] {
	return gens.map((g) => `\t"${g.htmlId}": asRenderableScreenSpec(${camelCase(g.htmlId)}RenderableSpec),`);
}

const labelOverride: Record<string, string> = {
	"billing-html-summary": "[HTML] 청구 요약",
	"billing-html-detail": "[HTML] 청구 상세 및 변동 사유",
	"billing-html-realtime": "[HTML] 실시간·예상 이용요금",
	"billing-html-msc-history": "[HTML] 휴대폰결제·콘텐츠 이용내역",
	"billing-html-statement": "[HTML] 요금안내서 조회",
	"billing-html-statement-result": "[HTML] 요금안내서 발급 결과",
	"billing-html-target-select": "[HTML] 납부 대상 선택",
	"billing-html-payment-history": "[HTML] 납부 이력",
	"billing-html-receipt-result": "[HTML] 증빙 발급 결과",
	"billing-html-arrears-status": "[HTML] 미납 해소 결과",
	"billing-html-pay-method": "[HTML] 납부수단 선택",
	"billing-html-pay-method-auth": "[HTML] 납부수단 인증",
	"billing-html-pay-confirm": "[HTML] 즉시 납부 확인",
	"billing-html-pay-result": "[HTML] 납부 결과",
	"billing-html-pay-schedule": "[HTML] 납부 예약",
	"billing-html-pay-schedule-result": "[HTML] 납부 예약 결과",
	"billing-html-pay-proxy": "[HTML] 대리 납부",
	"billing-html-pay-proxy-execute": "[HTML] 대리 납부 실행",
	"billing-html-pay-proxy-result": "[HTML] 대리 납부 결과",
	"billing-html-pay-third-party-consent": "[HTML] 타인 명의 동의",
	"billing-html-pay-prepay": "[HTML] 선결제",
	"billing-html-pay-prepay-result": "[HTML] 선결제 결과",
	"billing-html-pay-failure": "[HTML] 납부 실패 후속",
	"billing-html-set-statement": "[HTML] 요금안내서 수신 설정",
	"billing-html-set-method": "[HTML] 납부방법 신청·변경",
	"billing-html-set-method-cancel": "[HTML] 납부방법 해지",
	"billing-html-set-method-cancel-result": "[HTML] 납부방법 해지 결과",
	"billing-html-set-msc-limit": "[HTML] 휴대폰 결제 한도",
	"billing-html-set-content-limit": "[HTML] 콘텐츠 이용료 한도",
	"billing-html-set-auto-prepay": "[HTML] 자동 선결제 설정",
};

function buildScreenEntries(gens: Gen[]): string {
	return gens
		.map((g) => `	{
		id: "${g.htmlId}",
		path: "/${g.htmlId}",
		label: "${labelOverride[g.htmlId] ?? `[HTML] ${g.route.primary_task.slice(0, 18)}`}",
		group: "billing-html",
		spec: "spec/experimental/billing-from-html/${g.htmlId}.json",
		renderSpec: "spec/experimental/billing-from-html/${g.htmlId}.sdui.json",
		createdAt: "2026-05-06",
	},`)
		.join("\n");
}

function injectIntoSpecList(gens: Gen[]) {
	let content = readFileSync(SPEC_LIST, "utf8");

	// 1. Insert imports BEFORE the existing "billingHtmlDetailSpec" line
	const targetImport = `import billingHtmlDetailSpec from "../spec/experimental/billing-from-html/billing-html-detail.json";`;
	if (!content.includes(targetImport)) {
		throw new Error("pilot import line not found in active-spec-list.ts — registry was not pre-bootstrapped.");
	}

	const newImports = buildImportLines(gens.filter((g) => g.htmlId !== "billing-html-detail"));
	// Add our 29 imports right before the pilot line, ensuring no duplicates.
	for (const line of newImports) {
		if (!content.includes(line)) {
			content = content.replace(targetImport, `${line}\n${targetImport}`);
		}
	}

	// 2. Insert spec entries
	const targetEntry = `\t"billing-html-detail": asScreenSpec(billingHtmlDetailSpec),`;
	if (!content.includes(targetEntry)) {
		throw new Error("pilot spec map entry not found.");
	}
	const newEntries = buildSpecEntries(gens.filter((g) => g.htmlId !== "billing-html-detail"));
	for (const line of newEntries) {
		if (!content.includes(line)) {
			content = content.replace(targetEntry, `${line}\n${targetEntry}`);
		}
	}

	// 3. Insert renderable entries
	const targetRenderable = `\t"billing-html-detail": asRenderableScreenSpec(billingHtmlDetailRenderableSpec),`;
	if (!content.includes(targetRenderable)) {
		throw new Error("pilot renderable map entry not found.");
	}
	const newRenderable = buildRenderableEntries(gens.filter((g) => g.htmlId !== "billing-html-detail"));
	for (const line of newRenderable) {
		if (!content.includes(line)) {
			content = content.replace(targetRenderable, `${line}\n${targetRenderable}`);
		}
	}

	writeFileSync(SPEC_LIST, content);
}

function injectIntoIndex(gens: Gen[]) {
	let content = readFileSync(INDEX_TS, "utf8");
	const allEntries = buildScreenEntries(gens);
	// Replace pilot section with full block
	const pilotMarker = `	{
		id: "billing-html-detail",
		path: "/billing-html-detail",
		label: "[HTML] 청구 상세 및 변동 사유",
		group: "billing-html",
		spec: "spec/experimental/billing-from-html/billing-html-detail.json",
		renderSpec: "spec/experimental/billing-from-html/billing-html-detail.sdui.json",
		createdAt: "2026-05-06",
	},`;
	if (!content.includes(pilotMarker)) {
		throw new Error("pilot screens entry not found in index.ts");
	}
	// If already replaced (idempotent), skip
	const firstNonPilot = gens.find((g) => g.htmlId !== "billing-html-detail");
	if (firstNonPilot && content.includes(`id: "${firstNonPilot.htmlId}"`)) {
		console.log("index.ts already has bulk entries, skip");
		return;
	}
	content = content.replace(pilotMarker, allEntries);
	writeFileSync(INDEX_TS, content);
}

function main() {
	const gens = JSON.parse(readFileSync(GEN_ROUTES, "utf8")) as Gen[];
	console.log(`Registering ${gens.length} routes...`);
	injectIntoSpecList(gens);
	injectIntoIndex(gens);
	console.log("✓ active-spec-list.ts updated");
	console.log("✓ index.ts updated");
}

main();
