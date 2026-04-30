export {
	benchmarkGlobalGuards,
	benchmarkCriteria,
	designBenchmarkCriteria,
	planningBenchmarkCriteria,
	type BenchmarkCriterion,
	type BenchmarkCriterionId,
	type BenchmarkScore,
	type BenchmarkSide,
} from "./benchmark";
export {
	activeRenderableScreenSpecs,
	activeScreenSpecs,
	type ActiveRenderableScreenSpecId,
	type ActiveScreenSpecId,
} from "./active-specs";
export {
	getScreenSpecIssues,
	type DesignException,
	type DesignSystemContract,
	type ScreenAreaContract,
	type ScreenLayoutContract,
	type ScreenSlotContract,
	type ScreenSpecIssue,
	type ScreenSpecIssueSeverity,
	type ScreenSpecV2,
	getRenderableScreenSpecIssues,
	type PolicyExtract,
	type RenderableScreenSpecV1,
	type ScreenBenchmarkTrace,
	type SDUIJsonValue,
	type SDUINode,
} from "./spec";

export type ScreenGroup = "home" | "membership" | "product" | "search" | "tu";

export type ScreenEntry = {
	id: string;
	path: `/${string}`;
	label: string;
	group: ScreenGroup;
	spec: `spec/active/${string}.json`;
	renderSpec?: `spec/active/${string}.sdui.json`;
	createdAt: `${number}-${number}-${number}`;
};

export const screens = [
	{
		id: "home-benefit",
		path: "/home-benefit",
		label: "홈 혜택",
		group: "home",
		spec: "spec/active/home-benefit.json",
		createdAt: "2026-04-30",
	},
	{
		id: "home-manage",
		path: "/home-manage",
		label: "관리 홈",
		group: "home",
		spec: "spec/active/home-manage.json",
		createdAt: "2026-04-30",
	},
	{
		id: "home-device-change",
		path: "/home-device-change",
		label: "기기 변경",
		group: "home",
		spec: "spec/active/home-device-change.json",
		createdAt: "2026-04-30",
	},
	{
		id: "home-senior",
		path: "/home-senior",
		label: "시니어 홈",
		group: "home",
		spec: "spec/active/home-senior.json",
		createdAt: "2026-04-30",
	},
	{
		id: "home-guest",
		path: "/home-guest",
		label: "게스트 홈",
		group: "home",
		spec: "spec/active/home-guest.json",
		createdAt: "2026-04-30",
	},
	{
		id: "product-detail",
		path: "/product-detail",
		label: "상품 상세",
		group: "product",
		spec: "spec/active/product-detail.json",
		renderSpec: "spec/active/product-detail.sdui.json",
		createdAt: "2026-04-30",
	},
	{
		id: "membership-terms-consent",
		path: "/membership-terms-consent",
		label: "약관 동의",
		group: "membership",
		spec: "spec/active/membership-terms-consent.json",
		renderSpec: "spec/active/membership-terms-consent.sdui.json",
		createdAt: "2026-04-30",
	},
	{
		id: "membership-join-complete",
		path: "/membership-join-complete",
		label: "가입 완료",
		group: "membership",
		spec: "spec/active/membership-join-complete.json",
		renderSpec: "spec/active/membership-join-complete.sdui.json",
		createdAt: "2026-04-30",
	},
	{
		id: "membership-leave-reason",
		path: "/membership-leave-reason",
		label: "탈퇴 사유",
		group: "membership",
		spec: "spec/active/membership-leave-reason.json",
		renderSpec: "spec/active/membership-leave-reason.sdui.json",
		createdAt: "2026-04-30",
	},
	{
		id: "membership-personal-info",
		path: "/membership-personal-info",
		label: "개인정보 입력",
		group: "membership",
		spec: "spec/active/membership-personal-info.json",
		renderSpec: "spec/active/membership-personal-info.sdui.json",
		createdAt: "2026-04-30",
	},
	{
		id: "membership-identity-verification",
		path: "/membership-identity-verification",
		label: "본인인증",
		group: "membership",
		spec: "spec/active/membership-identity-verification.json",
		renderSpec: "spec/active/membership-identity-verification.sdui.json",
		createdAt: "2026-04-30",
	},
	{
		id: "membership-leave-impact",
		path: "/membership-leave-impact",
		label: "탈퇴 영향",
		group: "membership",
		spec: "spec/active/membership-leave-impact.json",
		renderSpec: "spec/active/membership-leave-impact.sdui.json",
		createdAt: "2026-04-30",
	},
	{
		id: "membership-leave-complete",
		path: "/membership-leave-complete",
		label: "탈퇴 결과",
		group: "membership",
		spec: "spec/active/membership-leave-complete.json",
		renderSpec: "spec/active/membership-leave-complete.sdui.json",
		createdAt: "2026-04-30",
	},
	{
		id: "search-result",
		path: "/search-result",
		label: "검색 결과",
		group: "search",
		spec: "spec/active/search-result.json",
		createdAt: "2026-04-30",
	},
	{
		id: "tu-dsp-main-mo-02-pg-001-2",
		path: "/tu-dsp-main-mo-02-pg-001-2",
		label: "TU 발견",
		group: "tu",
		spec: "spec/active/tu-dsp-main-mo-02-pg-001-2.json",
		createdAt: "2026-04-30",
	},
	{
		id: "tu-dsp-main-mo-02-pg-002",
		path: "/tu-dsp-main-mo-02-pg-002",
		label: "TU 권한",
		group: "tu",
		spec: "spec/active/tu-dsp-main-mo-02-pg-002.json",
		createdAt: "2026-04-30",
	},
	{
		id: "tu-my-agr-mo-02-bs-001",
		path: "/tu-my-agr-mo-02-bs-001",
		label: "TU 바텀시트",
		group: "tu",
		spec: "spec/active/tu-my-agr-mo-02-bs-001.json",
		createdAt: "2026-04-30",
	},
] as const satisfies readonly ScreenEntry[];

export type ScreenId = (typeof screens)[number]["id"];
export type ScreenPath = (typeof screens)[number]["path"];

export const screenCount = screens.length;
