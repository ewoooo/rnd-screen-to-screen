/**
 * Stage 2: intermediate.json + active route grid → pagination + per-route policy.json
 *
 * 입력
 *   - ./intermediate.json (Stage 1 산출)
 *   - ../../active/billing/_pagination/billing-{chk,pay,set}.json (route grid SSOT)
 *
 * 출력
 *   - ../_pagination/billing-{chk,pay,set}.json (HTML 기반 pagination, source_ref → HTML)
 *   - ../<route-id>.policy.json (각 화면별 x_policyExtract만 우선 산출)
 *
 * 설계 원칙:
 *   - 화면 분할(route grid)은 인간 설계 결정이라 active를 그대로 사용 (UI 분할은 HTML이 결정 못 함)
 *   - 변경되는 것: source_ref (md → html), evidence_refs (line → cell coordinates), process metadata
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../../../../../..");
const ACTIVE_PAG_DIR = resolve(REPO_ROOT, "packages/screens/spec/active/billing/_pagination");
const EXP_ROOT = resolve(__dirname, "..");
const EXP_PAG_DIR = resolve(EXP_ROOT, "_pagination");
const INTERMEDIATE = resolve(__dirname, "intermediate.json");
const HTML_DOC = "docs/정책서-Full-청구관리및요금수납_정책서.html";

type ActiveRoute = {
	id: string;
	type: string;
	use_case_id: string;
	process_id: string;
	primary_task: string;
	actor: string;
	predecessor: string | null;
	successor: string | null;
	step_fraction: string;
	split_reason: string;
};

type ActivePagination = {
	policy_id: string;
	name: string;
	actor_group: string;
	source_ref: Record<string, string>;
	actors: string[];
	entry_condition: string;
	exit_condition: string;
	routes: ActiveRoute[];
	transitions: { from: string; to: string; trigger: string; guard?: string }[];
};

type ProcessStep = {
	processId: string;
	name: string;
	description: string;
	relatedFunctions: string[];
	relatedPolicies: string[];
};

type UseCase = {
	ucId: string;
	title: string;
	rawHeading: string;
	steps: ProcessStep[];
	rawTablesCount: number;
};

type Intermediate = {
	source: { docs: string; chars: number };
	useCases: UseCase[];
	functions: { id: string; name: string; section: string }[];
	policies: { id: string; name: string; section: string }[];
};

const intermediate = JSON.parse(readFileSync(INTERMEDIATE, "utf8")) as Intermediate;
const ucIndex = new Map(intermediate.useCases.map((uc) => [uc.ucId, uc] as const));

function htmlAnchor(processId: string): string {
	// HTML doesn't use named anchors per process; we encode the search target as a text fragment.
	// Compatible with Chrome text fragment URL spec.
	return `${HTML_DOC}#:~:text=${encodeURIComponent(processId)}`;
}

function parseProcessIdList(raw: string): string[] {
	// Active uses formats: "PR-BIL-CHK-001-02", "PR-BIL-CHK-002-01,02", "PR-BIL-CHK-003-01,02,03"
	const m = raw.match(/^(PR-BIL-[A-Z]+-\d+)-(\d+(?:,\d+)*)$/);
	if (!m) return [raw];
	const prefix = m[1]!;
	const suffixes = m[2]!.split(",");
	return suffixes.map((s) => `${prefix}-${s}`);
}

function buildPolicyExtract(route: ActiveRoute): unknown {
	const uc = ucIndex.get(route.use_case_id);
	if (!uc) {
		return {
			source: { type: "policy", refs: [route.process_id], note: `UC ${route.use_case_id} not found in HTML extraction` },
			process: null,
			extraction_status: "missing-uc",
		};
	}

	const targetIds = parseProcessIdList(route.process_id);
	const matchedSteps = uc.steps.filter((s) => targetIds.includes(s.processId));
	const primary = matchedSteps[0] ?? uc.steps[0];

	const relatedFunctions = Array.from(
		new Set(matchedSteps.flatMap((s) => s.relatedFunctions))
	);
	const relatedPolicies = Array.from(
		new Set(matchedSteps.flatMap((s) => s.relatedPolicies))
	);

	const evidence = matchedSteps.map((s) => ({
		claim: s.name,
		process_id: s.processId,
		uc_id: uc.ucId,
		html_anchor: htmlAnchor(s.processId),
		source_cell: {
			document: HTML_DOC,
			section: "4. 프로세스 정의 / 다. 프로세스 상세",
			use_case_heading: uc.rawHeading,
			table: "프로세스 ID / 프로세스명 / 설명 / 관련 기능 / 관련 정책",
			row_id: s.processId,
		},
		related_functions: s.relatedFunctions,
		related_policies: s.relatedPolicies,
		description: s.description,
	}));

	return {
		source: {
			type: "policy",
			refs: [
				...targetIds,
				`${HTML_DOC}#${uc.ucId}`,
			],
		},
		process: {
			id: route.process_id,
			name: matchedSteps.map((s) => s.name).filter(Boolean).join(" + ") || uc.title,
			cluster: uc.ucId,
			actor: route.actor,
			entry_condition: matchedSteps[0]?.description ?? "",
			exit_condition: matchedSteps[matchedSteps.length - 1]?.description ?? "",
			predecessor: route.predecessor ? [route.predecessor] : [],
			successor: route.successor ? [route.successor] : [],
			related_functions: relatedFunctions,
			related_policies: relatedPolicies,
		},
		purpose: primary?.description ?? route.primary_task,
		system_inputs_to_user: {
			_extraction_status: "needs-synthesis",
			_hint: "Synthesize from related_functions and process step description. HTML structure does not encode this directly.",
			candidates: relatedFunctions,
		},
		user_inputs: {
			_extraction_status: "needs-synthesis",
			_hint: "Synthesize from process step description and route.primary_task.",
		},
		system_outputs: {
			_extraction_status: "needs-synthesis",
			_hint: "Synthesize from process step + related_functions output side.",
			candidates: relatedFunctions,
		},
		branches: {
			_extraction_status: "needs-cross-ref-section-6",
			_hint: "Branches/guards live in section 6. 정책 정의 entries referenced via related_policies.",
			seed_from_policies: relatedPolicies,
		},
		exceptions: {
			_extraction_status: "needs-cross-ref-section-6",
			_hint: "Exceptions live in section 6 policy entries (often POL-*-EXCEPTION rows).",
			seed_from_policies: relatedPolicies,
		},
		design_signals: {
			_extraction_status: "needs-synthesis",
			_hint: "Derive from primary_task + route.type (browse/detail/selector/result).",
			route_type: route.type,
		},
		evidence_refs: evidence,
	};
}

function buildPagination(active: ActivePagination): unknown {
	return {
		policy_id: active.policy_id,
		name: active.name,
		actor_group: active.actor_group,
		source_ref: {
			docs: HTML_DOC,
			section: active.source_ref.section,
			flow_chart: active.source_ref.flow_chart,
			extraction_method: "html-structured",
		},
		actors: active.actors,
		entry_condition: active.entry_condition,
		exit_condition: active.exit_condition,
		routes: active.routes.map((r) => ({
			...r,
			html_evidence: {
				use_case_heading: ucIndex.get(r.use_case_id)?.rawHeading ?? null,
				process_steps: parseProcessIdList(r.process_id).filter((pid) =>
					ucIndex.get(r.use_case_id)?.steps.some((s) => s.processId === pid)
				),
			},
		})),
		transitions: active.transitions ?? [],
	};
}

function main() {
	if (!existsSync(EXP_PAG_DIR)) mkdirSync(EXP_PAG_DIR, { recursive: true });

	const summary = { totalRoutes: 0, withFullEvidence: 0, missingUC: 0, missingSteps: 0 };

	for (const useCase of ["chk", "pay", "set"] as const) {
		const activePath = resolve(ACTIVE_PAG_DIR, `billing-${useCase}.json`);
		const active = JSON.parse(readFileSync(activePath, "utf8")) as ActivePagination;

		const pag = buildPagination(active);
		writeFileSync(
			resolve(EXP_PAG_DIR, `billing-${useCase}.json`),
			JSON.stringify(pag, null, "\t")
		);

		for (const route of active.routes) {
			const policy = buildPolicyExtract(route);
			writeFileSync(
				resolve(EXP_ROOT, `${route.id}.policy.json`),
				JSON.stringify({ x_policyExtract: policy, route }, null, "\t")
			);
			summary.totalRoutes++;
			const uc = ucIndex.get(route.use_case_id);
			if (!uc) summary.missingUC++;
			else {
				const targetIds = parseProcessIdList(route.process_id);
				const matched = uc.steps.filter((s) => targetIds.includes(s.processId)).length;
				if (matched === 0) summary.missingSteps++;
				else if (matched === targetIds.length) summary.withFullEvidence++;
			}
		}
	}

	console.log("=== Stage 2 결과 ===");
	console.log(`총 routes              : ${summary.totalRoutes}`);
	console.log(`완전 매칭 (모든 PR 발견): ${summary.withFullEvidence}`);
	console.log(`UC 누락                : ${summary.missingUC}`);
	console.log(`PR step 미발견         : ${summary.missingSteps}`);
	console.log(`\npagination → ${EXP_PAG_DIR}/billing-{chk,pay,set}.json`);
	console.log(`per-route policy → ${EXP_ROOT}/<route>.policy.json`);
}

main();
