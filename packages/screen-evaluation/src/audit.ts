import type {
	RenderableScreenSpecV1,
	ScreenAreaContract,
	ScreenSpecV2,
	SDUINode,
} from "@screen/mobile/screens";

export type AuditJudgement =
	| "OK"
	| "Drift"
	| "Missing"
	| "System Gap"
	| "Needs Review";

export type ScreenAuditRow = {
	item: string;
	designBasis: string;
	specEvidence: string;
	renderEvidence: string;
	judgement: AuditJudgement;
	issueOrAction: string;
};

export type ScreenAuditSummary = {
	newVocabularyRequired: "none" | "present";
	escapeHatches: "none" | "present";
	rawRenderHints: "none" | "present";
	spacingDriftRisk: "none" | "review";
	componentPatternDriftRisk: "none" | "review";
	systemExpansionCandidates: readonly string[];
};

export type ScreenAuditTable = {
	screenId: string;
	screenName: string;
	route: string;
	rows: readonly ScreenAuditRow[];
	summary: ScreenAuditSummary;
};

const EMPTY = "-";

function compact(values: readonly unknown[]): string {
	const text = values
		.flatMap((value) => {
			if (Array.isArray(value)) {
				return value;
			}
			return value == null || value === "" ? [] : [value];
		})
		.map((value) => String(value).trim())
		.filter(Boolean);

	return text.length > 0 ? text.join(", ") : EMPTY;
}

function stringify(value: unknown): string {
	if (value == null || value === "") {
		return EMPTY;
	}
	if (Array.isArray(value)) {
		return compact(value);
	}
	if (typeof value === "object") {
		return JSON.stringify(value);
	}
	return String(value);
}

function collectNodeTypes(nodes: readonly SDUINode[]): string[] {
	const types = new Set<string>();

	const visit = (node: SDUINode) => {
		types.add(node.type);
		for (const child of node.children ?? []) {
			visit(child);
		}
	};

	for (const node of nodes) {
		visit(node);
	}

	return [...types].sort();
}

function collectRawRenderHints(nodes: readonly SDUINode[]): string[] {
	const hints: string[] = [];

	const visit = (node: SDUINode) => {
		if (node.className) {
			hints.push(`${node.id}: className`);
		}
		if (node.style) {
			hints.push(`${node.id}: style`);
		}
		for (const child of node.children ?? []) {
			visit(child);
		}
	};

	for (const node of nodes) {
		visit(node);
	}

	return hints;
}

function areaUses(areas: readonly ScreenAreaContract[]): string[] {
	return [...new Set(areas.flatMap((area) => area.uses))].sort();
}

function hasAnyNeedle(haystack: readonly string[], needles: readonly string[]) {
	return needles.some((needle) => haystack.includes(needle));
}

function row(
	item: string,
	designBasis: string,
	specEvidence: string,
	renderEvidence: string,
	judgement: AuditJudgement,
	issueOrAction: string,
): ScreenAuditRow {
	return {
		item,
		designBasis,
		specEvidence,
		renderEvidence,
		judgement,
		issueOrAction,
	};
}

export function createScreenAuditTable(
	spec: ScreenSpecV2,
	renderSpec?: RenderableScreenSpecV1,
): ScreenAuditTable {
	const contract = renderSpec?.x_screenContract ?? spec;
	const interfacePlan = renderSpec?.x_interfacePlan;
	const policyExtract = renderSpec?.x_policyExtract;
	const renderTypes = renderSpec ? collectNodeTypes(renderSpec.children) : [];
	const rawRenderHints = renderSpec ? collectRawRenderHints(renderSpec.children) : [];
	const contractUses = areaUses(contract.areas);
	const newVocabulary =
		contract.design_system_contract.new_vocabulary_required ?? [];
	const escapeHatches =
		contract.design_system_contract.allowed_escape_hatches ?? [];

	const rows: ScreenAuditRow[] = [
		row(
			"화면 목적",
			compact([
				policyExtract?.purpose,
				interfacePlan?.primary_task,
			]),
			compact([
				spec.screen.name,
				spec.meta.source_ref,
				spec.screen_contract.shell,
			]),
			compact([
				renderSpec?.metadata.name,
				renderSpec?.metadata.route,
			]),
			policyExtract || interfacePlan?.primary_task ? "OK" : "Missing",
			policyExtract || interfacePlan?.primary_task
				? "목적 근거가 spec/render와 연결됨"
				: "x_policyExtract.purpose 또는 x_interfacePlan.primary_task를 보강",
		),
		row(
			"UX 단계",
			compact([
				renderSpec?.x_uxStage?.primary,
				renderSpec?.x_uxStage?.secondary?.join("+"),
				renderSpec?.x_uxStage?.evidence,
			]),
			compact([
				spec.screen.domain,
				spec.screen.type,
				spec.screen_contract.shell,
			]),
			compact(renderSpec?.x_uxStage?.checkpoints ?? []),
			renderSpec?.x_uxStage ? "OK" : "Needs Review",
			renderSpec?.x_uxStage
				? "UX journey 단계가 interface plan 전에 분류됨"
				: "x_uxStage.primary를 entry/explore/search/decision/execution/complete/support 중 하나로 기록",
		),
		row(
			"정보 위계",
			stringify(interfacePlan?.info_hierarchy ?? interfacePlan?.hierarchy),
			compact(contract.areas.map((area) => `${area.id}:${area.pattern}`)),
			compact(renderTypes),
			interfacePlan?.info_hierarchy || interfacePlan?.hierarchy
				? "OK"
				: "Needs Review",
			interfacePlan?.info_hierarchy || interfacePlan?.hierarchy
				? "area pattern과 렌더 node 순서를 육안 검수"
				: "x_interfacePlan.info_hierarchy를 먼저 고정",
		),
		row(
			"시각 순서",
			stringify(interfacePlan?.visual_order),
			compact(contract.areas.map((area) => area.id)),
			compact(renderTypes),
			interfacePlan?.visual_order ? "OK" : "Needs Review",
			interfacePlan?.visual_order
				? "visual_order와 실제 SDUI children 순서가 같은지 확인"
				: "핵심 정보가 문서형으로 평평해지지 않도록 x_interfacePlan.visual_order를 기록",
		),
		row(
			"진행 구조",
			compact([
				interfacePlan?.progress_location,
				policyExtract?.process?.predecessor,
				policyExtract?.process?.successor,
			]),
			compact([
				spec.screen_contract.slots.top?.patterns,
				spec.screen_contract.slots.bottom?.patterns,
			]),
			compact(renderTypes.filter((type) => /progress|step|topbar/i.test(type))),
			interfacePlan?.progress_location ? "OK" : "Needs Review",
			interfacePlan?.progress_location
				? "progress 위치와 전후 화면 전이를 함께 확인"
				: "flow 화면이면 progress_location 또는 x_pagination 연결 확인",
		),
		row(
			"CTA",
			stringify(interfacePlan?.cta_location),
			compact([
				spec.screen_contract.slots.bottom?.owner,
				spec.screen_contract.slots.bottom?.patterns,
			]),
			compact(
				renderTypes.filter((type) =>
					/cta|action|button|continue|purchase|bar/i.test(type),
				),
			),
			interfacePlan?.cta_location ? "OK" : "Needs Review",
			interfacePlan?.cta_location
				? "primary CTA 위치, label, disabled 상태를 렌더에서 확인"
				: "primary task가 있으면 CTA 위치를 명시",
		),
		row(
			"컴포넌트 어휘",
			compact([
				contract.design_system_contract.templates,
				contract.design_system_contract.organisms,
				contract.design_system_contract.molecules,
				contract.design_system_contract.atoms,
			]),
			compact(contractUses),
			compact(renderTypes),
			newVocabulary.length > 0 ? "System Gap" : "OK",
			newVocabulary.length > 0
				? `신규 어휘 후보: ${compact(newVocabulary)}`
				: "기존 어휘로 표현됨",
		),
		row(
			"Spacing",
			compact([
				`outlet:${contract.layout_contract.content_outlet_inline_inset}`,
				`gap:${contract.layout_contract.content_gap}`,
				`owner:${contract.layout_contract.content_gap_owner}`,
			]),
			compact([
				`section:${contract.layout_contract.section_inset}`,
				`bleed:${compact(contract.layout_contract.bleed_sections)}`,
			]),
			compact(rawRenderHints),
			rawRenderHints.length > 0 ? "Drift" : "OK",
			rawRenderHints.length > 0
				? "raw class/style가 spacing drift인지 escape hatch인지 확인"
				: "layout_contract 기준으로 토큰 소유권 확인",
		),
		row(
			"텍스트 정책",
			stringify(interfacePlan?.copy_policy),
			compact(
				contract.areas
					.filter((area) =>
						area.uses.some((use) => /TextBlock|Typography/i.test(use)),
					)
					.map((area) => area.id),
			),
			compact(renderTypes.filter((type) => /text|typography|copy/i.test(type))),
			interfacePlan?.copy_policy ? "OK" : "Needs Review",
			interfacePlan?.copy_policy
				? "lines/maxLines/measure 정책이 렌더 prop에 남는지 확인"
				: "caption/body/title measure 정책을 x_interfacePlan에 기록",
		),
		row(
			"법적/안내 고지",
			stringify(policyExtract?.legal_notices),
			compact(
				contract.areas
					.filter((area) =>
						/notice|legal|policy|footer/i.test(area.id + area.content_role),
					)
					.map((area) => `${area.id}:${area.content_role}`),
			),
			compact(renderTypes.filter((type) => /notice|footer|cs|legal/i.test(type))),
			(policyExtract?.legal_notices?.length ?? 0) > 0
				? "OK"
				: "Needs Review",
			(policyExtract?.legal_notices?.length ?? 0) > 0
				? "고지 source_ref와 target_area가 렌더 영역에 연결되는지 확인"
				: "정책 화면이면 x_policyExtract.legal_notices에 필수/사용성 고지를 도출",
		),
		row(
			"상태 매트릭스",
			stringify(renderSpec?.x_stateMatrix ?? interfacePlan?.state_matrix),
			compact(
				contract.areas
					.filter((area) =>
						/state|input|choice|form|cta|notice/i.test(
							area.content_role + area.pattern,
						),
					)
					.map((area) => area.id),
			),
			compact(
				renderTypes.filter((type) =>
					/input|checkbox|radio|select|notice|cta|button|loading|error/i.test(
						type,
					),
				),
			),
			renderSpec?.x_stateMatrix ?? interfacePlan?.state_matrix
				? "OK"
				: "Needs Review",
			renderSpec?.x_stateMatrix ?? interfacePlan?.state_matrix
				? "default/loading/error/empty/blocked 상태가 CTA와 연결되는지 확인"
				: "x_stateMatrix 또는 x_interfacePlan.state_matrix에 상태별 trigger/visual/action 기록",
		),
		row(
			"인터랙션",
			stringify(renderSpec?.x_interactions),
			compact([
				spec.screen_contract.slots.top?.patterns,
				spec.screen_contract.slots.content?.patterns,
				spec.screen_contract.slots.bottom?.patterns,
			]),
			compact(
				renderTypes.filter((type) =>
					/button|checkbox|radio|select|modal|sheet|tab|nav|cta/i.test(type),
				),
			),
			renderSpec?.x_interactions ? "OK" : "Needs Review",
			renderSpec?.x_interactions
				? "[tap]/[interactive]/[sync]/[enabled]/[loading]/[modal]/[state]/[nav] 계약 확인"
				: "선택/입력/분기 화면이면 x_interactions를 정형 태그 기반으로 기록",
		),
		row(
			"예외/분기",
			compact([
				policyExtract?.branches,
				policyExtract?.exceptions,
			]),
			compact([
				policyExtract?.evidence_refs?.map((ref) => ref.field),
				renderSpec?.x_benchmark.guards,
			]),
			compact(renderTypes.filter((type) => /notice|error|empty|state/i.test(type))),
			policyExtract ? "OK" : "Missing",
			policyExtract
				? "branch/exception이 fixture 또는 상태 표현에 반영됐는지 확인"
				: "정책 근거 없이 렌더만 존재함",
		),
	];

	const summary: ScreenAuditSummary = {
		newVocabularyRequired: newVocabulary.length > 0 ? "present" : "none",
		escapeHatches: escapeHatches.length > 0 ? "present" : "none",
		rawRenderHints: rawRenderHints.length > 0 ? "present" : "none",
		spacingDriftRisk: rawRenderHints.length > 0 ? "review" : "none",
		componentPatternDriftRisk: hasAnyNeedle(renderTypes, contractUses)
			? "none"
			: "review",
		systemExpansionCandidates: newVocabulary,
	};

	return {
		screenId: spec.screen.id,
		screenName: spec.screen.name,
		route: spec.meta.route,
		rows,
		summary,
	};
}

function escapeMarkdownCell(value: string): string {
	return value.replaceAll("|", "\\|").replace(/\s+/g, " ").trim();
}

export function formatScreenAuditTableMarkdown(table: ScreenAuditTable): string {
	const lines = [
		`## ${table.screenName} (${table.route})`,
		"",
		"| 검수 항목 | 설계서 기준 | 스펙 반영 | 화면 렌더 반영 | 판정 | 이슈 / 조치 |",
		"|---|---|---|---|---|---|",
		...table.rows.map((auditRow) =>
			`| ${[
				auditRow.item,
				auditRow.designBasis,
				auditRow.specEvidence,
				auditRow.renderEvidence,
				auditRow.judgement,
				auditRow.issueOrAction,
			]
				.map(escapeMarkdownCell)
				.join(" | ")} |`,
		),
		"",
		"| 요약 지표 | 결과 |",
		"|---|---|",
		`| 신규 컴포넌트/어휘 필요 여부 | ${table.summary.newVocabularyRequired} |`,
		`| escape hatch 사용 여부 | ${table.summary.escapeHatches} |`,
		`| raw render hint | ${table.summary.rawRenderHints} |`,
		`| spacing drift risk | ${table.summary.spacingDriftRisk} |`,
		`| component pattern drift risk | ${table.summary.componentPatternDriftRisk} |`,
		`| 시스템 확장 후보 | ${compact(table.summary.systemExpansionCandidates)} |`,
	];

	return lines.join("\n");
}
