/**
 * Stage 3: <route>.policy.json + active route grid → <route>.sdui.json (skeleton)
 *
 * 산출 sdui는 RenderableScreenSpecV1 형식을 따르되, 다음만 채운다:
 *   - version, minRendererVersion, minComponentsVersion (active 그대로)
 *   - metadata (route id/name/route/domain — active에서 복사)
 *   - theme (default)
 *   - x_pagination 슬라이스 + 새 _canonical_hash (HTML pagination 기준)
 *   - x_policyExtract (Stage 2 산출)
 *   - x_interfacePlan (route.type → genre 매핑으로 draft)
 *   - x_screenContract (draft)
 *   - x_heuristicReview (empty)
 *   - data: {} placeholder
 *   - children: [{ type: "PLACEHOLDER", ... }] — 사람 작성 필요 표시
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../../../../../..");
const ACTIVE_BILLING = resolve(REPO_ROOT, "packages/screens/spec/active/billing");
const EXP_ROOT = resolve(__dirname, "..");
const EXP_PAG_DIR = resolve(EXP_ROOT, "_pagination");

type Route = {
	id: string;
	type: string;
	use_case_id: string;
	process_id: string;
	primary_task: string;
	predecessor: string | null;
	successor: string | null;
	step_fraction: string;
};

const TYPE_TO_GENRE: Record<string, string> = {
	browse: "browse",
	detail: "detail",
	selector: "selector",
	form: "form",
	result: "result",
	notice: "notice",
};

const TYPE_TO_CTA_LOCATION: Record<string, string> = {
	form: "bottom-sticky",
	selector: "bottom-sticky",
	browse: "inline",
	detail: "none",
	result: "bottom-sticky",
	notice: "inline",
};

const TYPE_TO_LEADING: Record<string, "back" | "close"> = {
	result: "close",
	notice: "close",
	browse: "back",
	detail: "back",
	form: "back",
	selector: "back",
};

const TYPE_TO_SECTIONING: Record<string, "flat" | "one-card" | "multi-card"> = {
	form: "one-card",
	selector: "flat",
	result: "flat",
	browse: "multi-card",
	detail: "multi-card",
	notice: "flat",
};

function fileSha256(path: string): string {
	const buf = readFileSync(path);
	return createHash("sha256").update(buf).digest("hex");
}

function buildPagination(route: Route, policyId: "chk" | "pay" | "set", transitions: unknown[]) {
	const expCanonical = resolve(EXP_PAG_DIR, `billing-${policyId}.json`);
	const relCanonical = `packages/screens/spec/experimental/billing-from-html/_pagination/billing-${policyId}.json`;
	return {
		_canonical: relCanonical,
		_canonical_hash: fileSha256(expCanonical),
		policy_id: `billing-${policyId}`,
		route_id: route.id,
		step_fraction: route.step_fraction,
		predecessor: route.predecessor,
		successor: route.successor,
		transitions,
	};
}

function buildInterfacePlan(route: Route) {
	const genre = TYPE_TO_GENRE[route.type] ?? route.type;
	return {
		_extraction_status: "draft-from-route-type",
		_hint: "Route.type → genre 자동 매핑. Heuristic Review 통과 위해 사람 검수 필요.",
		genre,
		primary_task: route.primary_task,
		info_hierarchy: route.type === "result"
			? ["status-hero", "summary-detail", "next-action"]
			: route.type === "form" || route.type === "selector"
				? ["hero", "required-input", "supporting", "action"]
				: route.type === "detail"
					? ["summary", "detail-list", "supporting"]
					: ["hero", "list", "action"],
		cta_location: TYPE_TO_CTA_LOCATION[route.type] ?? "inline",
		progress_location: "none",
		sectioning: TYPE_TO_SECTIONING[route.type] ?? "multi-card",
		copy_policy: {
			caption_measure: "short",
			avoid_full_width_caption: true,
		},
	};
}

function buildScreenContract(route: Route, policyExtract: any) {
	const isFlow = route.predecessor != null || route.successor != null;
	return {
		_extraction_status: "draft-from-route-type",
		_hint: "기본 shell + slots + layout_contract. design_system_contract.allowed_components는 사람 검수 필수.",
		shell: {
			template: "AppScreen",
			leading: TYPE_TO_LEADING[route.type] ?? "back",
			has_top: true,
			has_bottom: TYPE_TO_CTA_LOCATION[route.type] === "bottom-sticky",
		},
		slots: {
			top: ["GlobalNavigationHeader"],
			content: ["ContentList"],
			bottom: TYPE_TO_CTA_LOCATION[route.type] === "bottom-sticky" ? ["PrimaryCTABar"] : [],
		},
		layout_contract: {
			content_inset: "default",
			vertical_rhythm: "ContentList var(--spacing-4)",
			bleed_allowed: false,
		},
		areas: [
			{
				name: "primary",
				role: "primary-task-anchor",
				layout: { trailing_semantic: null },
				note: "PLACEHOLDER — process step description 기반으로 사람 작성",
			},
		],
		design_system_contract: {
			allowed_components: [
				"AppScreen",
				"ContentList",
				"ContentSection",
				"InfoList",
				"SectionCard",
				"NoticeBlock",
				"PromoBlock",
				"PrimaryCTABar",
			],
			allowed_escape_hatches: [],
		},
		_seed_evidence: {
			related_functions: policyExtract?.process?.related_functions ?? [],
			related_policies: policyExtract?.process?.related_policies ?? [],
		},
	};
}

function buildPlaceholderChildren(route: Route, policyExtract: any) {
	const steps = policyExtract?.evidence_refs ?? [];
	return [
		{
			type: "PLACEHOLDER",
			id: `${route.id}-placeholder-children`,
			meta: {
				_extraction_status: "skeleton",
				_hint: "HTML 추출은 화면 children을 자동 생성하지 않음. 아래 process step을 기반으로 사람이 SDUI 트리 작성.",
				route_type: route.type,
				primary_task: route.primary_task,
				process_steps: steps.map((e: any) => ({
					process_id: e.process_id,
					name: e.claim,
					description: e.description,
					related_functions: e.related_functions,
					related_policies: e.related_policies,
				})),
			},
		},
	];
}

function findActivePagination(routeId: string): { policyId: "chk" | "pay" | "set"; transitions: unknown[] } | null {
	for (const pid of ["chk", "pay", "set"] as const) {
		const path = resolve(ACTIVE_BILLING, `_pagination/billing-${pid}.json`);
		const data = JSON.parse(readFileSync(path, "utf8"));
		const found = data.routes.find((r: Route) => r.id === routeId);
		if (found) {
			const transitions = (data.transitions ?? []).filter((t: any) => t.from === routeId);
			return { policyId: pid, transitions };
		}
	}
	return null;
}

function loadActiveSdui(routeId: string) {
	const path = resolve(ACTIVE_BILLING, `${routeId}.sdui.json`);
	try {
		return JSON.parse(readFileSync(path, "utf8"));
	} catch {
		return null;
	}
}

function main() {
	const policyFiles = readdirSync(EXP_ROOT).filter((f) => f.endsWith(".policy.json"));
	let written = 0;
	for (const file of policyFiles) {
		const routeId = file.replace(/\.policy\.json$/, "");
		const policyDoc = JSON.parse(readFileSync(resolve(EXP_ROOT, file), "utf8"));
		const route = policyDoc.route as Route;
		const policyExtract = policyDoc.x_policyExtract;

		const pag = findActivePagination(routeId);
		if (!pag) {
			console.warn(`pagination not found for ${routeId}, skip`);
			continue;
		}

		const activeSdui = loadActiveSdui(routeId);
		const metadata = activeSdui?.metadata ?? {
			id: routeId,
			name: route.primary_task,
			route: `/${routeId}`,
			domain: "billing",
			type: "page",
			status: "spec-only",
		};
		const theme = activeSdui?.theme ?? {
			color: { primary: "semantic.primary.normal", page: "semantic.surface.page.normal" },
		};

		const sdui = {
			version: activeSdui?.version ?? "1.0.0",
			minRendererVersion: activeSdui?.minRendererVersion ?? "0.1.0",
			minComponentsVersion: activeSdui?.minComponentsVersion ?? "0.1.0",
			metadata: { ...metadata, status: "skeleton-from-html" },
			theme,
			data: {
				_extraction_status: "skeleton",
				_hint: "Fixture는 HTML에서 자동 추출되지 않음. process step 기반으로 사람 작성.",
			},
			children: buildPlaceholderChildren(route, policyExtract),
			x_pagination: buildPagination(route, pag.policyId, pag.transitions),
			x_policyExtract: policyExtract,
			x_interfacePlan: buildInterfacePlan(route),
			x_screenContract: buildScreenContract(route, policyExtract),
			x_heuristicReview: {
				_extraction_status: "skeleton",
				_hint: "Heuristic Review는 사람이 작성한 children/screenContract 위에서만 의미 있음. skeleton 단계에서는 빈 상태.",
				applied_rules: [],
			},
		};

		writeFileSync(resolve(EXP_ROOT, `${routeId}.sdui.json`), JSON.stringify(sdui, null, "\t"));
		written++;
	}

	console.log("=== Stage 3 결과 ===");
	console.log(`skeleton sdui.json 생성 : ${written}`);
	console.log(`출력                    : ${EXP_ROOT}/<route>.sdui.json`);
}

main();
