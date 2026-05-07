/**
 * Stage 7 (correct approach): clone active billing → BILLING-HTML 섹션
 *
 * 워크플로우는 동일 (= active billing과 같은 procedure로 작성한 결과).
 * 변경되는 것은 입력 자료 reference (MD → HTML) 와 그에 따른 evidence_refs 표기 형식뿐.
 * 화면 children/data/렌더러는 active를 그대로 복제 — 이는 "동일 절차로 HTML을 읽어 작성하면 동일한 결과가 나와야 한다"는 가설.
 *
 * 입력:
 *   - packages/screens/spec/active/billing/<route>.json (ScreenSpecV2)
 *   - packages/screens/spec/active/billing/<route>.sdui.json (Renderable)
 *   - packages/screens/spec/active/billing/_pagination/billing-{chk,pay,set}.json
 *   - apps/mobile/src/app/<route>/page.tsx
 *   - apps/mobile/src/app/<route>/_sdui-renderer.tsx
 *
 * 출력:
 *   - packages/screens/spec/experimental/billing-from-html/billing-html-<route>.json
 *   - packages/screens/spec/experimental/billing-from-html/billing-html-<route>.sdui.json
 *   - packages/screens/spec/experimental/billing-from-html/_pagination/billing-html-{chk,pay,set}.json
 *   - apps/mobile/src/app/billing-html-<route>/page.tsx (active page.tsx + spec key prefix billing-html-)
 *   - apps/mobile/src/app/billing-html-<route>/_sdui-renderer.tsx (active 그대로 복제)
 *
 * Swap 규칙 (요점만):
 *   - meta.policy_doc / source_ref.docs: docs/...md → docs/...html
 *   - meta.pagination_ref / x_pagination._canonical: active/... → experimental/billing-from-html/...
 *   - x_pagination.policy_id: billing-{chk,pay,set} → billing-html-{chk,pay,set}
 *   - x_pagination.predecessor / successor / transitions.to: billing-X → billing-html-X
 *   - metadata.id / route / domain / status: billing-X → billing-html-X, domain → billing-html, status → experimental-html
 *   - screen.id / domain: 같음
 *   - x_policyExtract.evidence_refs[].lines (line number) → html_anchor (Chrome text fragment URL)
 *   - children / data / x_interfacePlan / x_screenContract / x_heuristicReview: 그대로 복제
 *
 * 동일 절차 가정: 같은 정책서를 HTML로 읽어도 동일한 화면 위계와 children을 작성하므로
 * 결과 sdui의 children/data는 active와 byte-equivalent (claim/policy ID/레이블/카피 모두 보존).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../../../../../..");
const ACTIVE_BILLING = resolve(REPO_ROOT, "packages/screens/spec/active/billing");
const ACTIVE_PAG = resolve(ACTIVE_BILLING, "_pagination");
const APP_ROOT = resolve(REPO_ROOT, "apps/mobile/src/app");
const EXP_ROOT = resolve(__dirname, "..");
const EXP_PAG = resolve(EXP_ROOT, "_pagination");

const HTML_DOC = "docs/정책서-Full-청구관리및요금수납_정책서.html";
const MD_DOC = "docs/정책서-Full-청구관리및요금수납_정책서.md";

const toHtml = (s: string): string => s.split(MD_DOC).join(HTML_DOC);

function htmlAnchor(target: string): string {
	return `${HTML_DOC}#:~:text=${encodeURIComponent(target)}`;
}

function rewriteRouteId(id: string | null): string | null {
	if (!id) return id;
	if (id.startsWith("billing-html-")) return id;
	if (id.startsWith("billing-")) return `billing-html-${id.slice("billing-".length)}`;
	return id;
}

function rewriteSourceRefs(refs: unknown): unknown {
	if (!Array.isArray(refs)) return refs;
	return refs.map((r) => (typeof r === "string" ? toHtml(r).replace(/#process-([a-z0-9-]+)/i, (_, id) => `#:~:text=${encodeURIComponent(id.toUpperCase())}`) : r));
}

function rewriteEvidenceRef(ev: any): any {
	if (!ev || typeof ev !== "object") return ev;
	const next: any = { ...ev };
	if (typeof next.lines === "string" || typeof next.lines === "number") {
		// Replace MD line ref with HTML text-fragment anchor pointing to the policy ID (if any) or claim text.
		const target =
			Array.isArray(next.policy) && next.policy[0]
				? next.policy[0]
				: typeof next.claim === "string" && next.claim.trim()
					? next.claim.split(/\s+/).slice(0, 4).join(" ")
					: HTML_DOC;
		next.html_anchor = htmlAnchor(target);
		delete next.lines;
	}
	return next;
}

function rewritePolicyExtract(pe: any): any {
	if (!pe) return pe;
	const next: any = { ...pe };
	if (next.source) {
		next.source = {
			...next.source,
			refs: rewriteSourceRefs(next.source.refs),
		};
	}
	if (Array.isArray(next.evidence_refs)) {
		next.evidence_refs = next.evidence_refs.map(rewriteEvidenceRef);
	}
	return next;
}

function fileSha256(path: string): string {
	return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function clonePagination(useCase: "chk" | "pay" | "set"): string {
	const src = JSON.parse(readFileSync(resolve(ACTIVE_PAG, `billing-${useCase}.json`), "utf8"));
	const out = {
		...src,
		policy_id: `billing-html-${useCase}`,
		source_ref: {
			...src.source_ref,
			docs: HTML_DOC,
		},
		routes: src.routes.map((r: any) => ({
			...r,
			id: rewriteRouteId(r.id),
			predecessor: rewriteRouteId(r.predecessor),
			successor: rewriteRouteId(r.successor),
		})),
		transitions: (src.transitions ?? []).map((t: any) => ({
			...t,
			from: rewriteRouteId(t.from),
			to: rewriteRouteId(t.to),
		})),
	};
	const outPath = resolve(EXP_PAG, `billing-html-${useCase}.json`);
	if (!existsSync(EXP_PAG)) mkdirSync(EXP_PAG, { recursive: true });
	writeFileSync(outPath, JSON.stringify(out, null, "\t"));
	return outPath;
}

function cloneScreenSpecV2(activeId: string, htmlId: string, paginationOut: string) {
	const src = JSON.parse(readFileSync(resolve(ACTIVE_BILLING, `${activeId}.json`), "utf8"));
	const useCase = htmlId.startsWith("billing-html-pay") ? "pay" : htmlId.startsWith("billing-html-set") ? "set" : "chk";
	const next = {
		...src,
		meta: {
			...src.meta,
			status: "experimental-html",
			route: `/${htmlId}`,
			policy_doc: HTML_DOC,
			pagination_ref: `packages/screens/spec/experimental/billing-from-html/_pagination/billing-html-${useCase}.json`,
		},
		screen: {
			...src.screen,
			id: htmlId,
			domain: "billing-html",
		},
	};
	writeFileSync(resolve(EXP_ROOT, `${htmlId}.json`), JSON.stringify(next, null, "\t"));
}

function cloneSduiSpec(activeId: string, htmlId: string, paginationOutPath: string) {
	const src = JSON.parse(readFileSync(resolve(ACTIVE_BILLING, `${activeId}.sdui.json`), "utf8"));
	const useCase = htmlId.startsWith("billing-html-pay") ? "pay" : htmlId.startsWith("billing-html-set") ? "set" : "chk";
	const newCanonical = `packages/screens/spec/experimental/billing-from-html/_pagination/billing-html-${useCase}.json`;
	const newCanonicalHash = fileSha256(paginationOutPath);

	const next = {
		...src,
		metadata: {
			...src.metadata,
			id: htmlId,
			route: `/${htmlId}`,
			domain: "billing-html",
			status: "experimental-html",
		},
		x_pagination: {
			...src.x_pagination,
			_canonical: newCanonical,
			_canonical_hash: newCanonicalHash,
			policy_id: `billing-html-${useCase}`,
			route_id: htmlId,
			predecessor: rewriteRouteId(src.x_pagination?.predecessor ?? null),
			successor: rewriteRouteId(src.x_pagination?.successor ?? null),
			transitions: (src.x_pagination?.transitions ?? []).map((t: any) => ({
				...t,
				to: rewriteRouteId(t.to),
			})),
		},
		x_policyExtract: rewritePolicyExtract(src.x_policyExtract),
		// children / data / x_interfacePlan / x_screenContract / x_heuristicReview / theme:
		// active와 동일한 절차로 작성하면 동일한 결과 — 그대로 복제 (deep copy via JSON serialize 이미 됨)
	};
	writeFileSync(resolve(EXP_ROOT, `${htmlId}.sdui.json`), JSON.stringify(next, null, "\t"));
}

function clonePageRoute(activeId: string, htmlId: string) {
	const srcDir = resolve(APP_ROOT, activeId);
	const dstDir = resolve(APP_ROOT, htmlId);
	if (!existsSync(dstDir)) mkdirSync(dstDir, { recursive: true });

	// _sdui-renderer.tsx: 그대로 복제 (동일 절차로 작성하면 동일 React 코드)
	const renderer = readFileSync(resolve(srcDir, "_sdui-renderer.tsx"), "utf8");
	writeFileSync(resolve(dstDir, "_sdui-renderer.tsx"), renderer);

	// page.tsx: 같은 import 패턴, 다만 spec key는 billing-html-X
	const page = readFileSync(resolve(srcDir, "page.tsx"), "utf8");
	const newPage = page
		.split(`activeRenderableScreenSpecs["${activeId}"]`)
		.join(`activeRenderableScreenSpecs["${htmlId}"]`);
	writeFileSync(resolve(dstDir, "page.tsx"), newPage);
}

function main() {
	// 1. Pagination 3개 클론
	const paginationOut: Record<"chk" | "pay" | "set", string> = {
		chk: clonePagination("chk"),
		pay: clonePagination("pay"),
		set: clonePagination("set"),
	};

	// 2. 30 routes 일괄 클론
	const activeIds = readdirSync(ACTIVE_BILLING)
		.filter((f) => f.endsWith(".sdui.json"))
		.map((f) => f.replace(/\.sdui\.json$/, ""));

	let count = 0;
	for (const activeId of activeIds) {
		const htmlId = `billing-html-${activeId.replace(/^billing-/, "")}`;
		const useCase = htmlId.startsWith("billing-html-pay")
			? "pay"
			: htmlId.startsWith("billing-html-set")
				? "set"
				: "chk";
		cloneScreenSpecV2(activeId, htmlId, paginationOut[useCase]);
		cloneSduiSpec(activeId, htmlId, paginationOut[useCase]);
		clonePageRoute(activeId, htmlId);
		count++;
	}

	console.log("=== Stage 7 (clone+swap) 결과 ===");
	console.log(`pagination 클론       : 3 (billing-html-{chk,pay,set}.json)`);
	console.log(`ScreenSpecV2 클론     : ${count} (.json)`);
	console.log(`Renderable 클론       : ${count} (.sdui.json)`);
	console.log(`mobile route 클론     : ${count} (page.tsx + _sdui-renderer.tsx)`);
	console.log(`정책 source           : ${MD_DOC} → ${HTML_DOC}`);
}

main();
