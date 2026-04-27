export type ProgressStep = {
	id: string;
	label: readonly string[];
	state: "done" | "current" | "future";
};

export type HoldActionRow = {
	id: string;
	label: string;
	desc: string;
	state: "ok" | "disabled";
	trailing: string;
};

export const paymentRecurringHoldV1MockupMock = {
	header: "구독 관리",
	subscriptionCard: {
		label: "현재 구독 중",
		name: "T우주 멤버십",
		meta: "월 13,900원 · 결제일 매월 1일",
	},
	alert: {
		badge: "D+3",
		title: "정기 결제 보류 중",
		body: "1월 1일~3일 결제 6회 모두 실패했어요. 2월 1일까지 즉시 결제하지 않으면 구독이 해지돼요.",
	},
	steps: [
		{ id: "d", label: ["D", "1·2회차", "실패"], state: "done" },
		{ id: "d1", label: ["D+1", "3·4회차", "실패"], state: "done" },
		{ id: "d2", label: ["D+2", "5·6회차", "실패"], state: "done" },
		{ id: "d3", label: ["D+3~", "보류"], state: "current" },
		{ id: "m1", label: ["M+1D", "해지"], state: "future" },
	] satisfies ProgressStep[],
	actionLabel: "지금 할 수 있는 것",
	actions: [
		{ id: "instant", label: "즉시 결제", desc: "지금 바로 결제해서 구독을 재개해요", state: "ok", trailing: "가능 ›" },
		{ id: "change", label: "결제 수단 변경", desc: "다른 카드나 계좌로 변경할 수 있어요", state: "ok", trailing: "가능 ›" },
		{ id: "cancel", label: "즉시 해지", desc: "구독을 바로 종료해요", state: "ok", trailing: "가능 ›" },
		{ id: "refund", label: "결제 취소", desc: "보류 상태에서는 불가해요", state: "disabled", trailing: "불가" },
	] satisfies HoldActionRow[],
	secondaryCta: "해지하기",
	primaryCta: "즉시 결제",
} as const;
