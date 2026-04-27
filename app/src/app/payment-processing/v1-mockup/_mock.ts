export type ProcessingStep = {
	id: string;
	title: string;
	desc: string;
	state: "done" | "in-progress";
};

export const paymentProcessingV1MockupMock = {
	header: "결제 처리 중",
	steps: [
		{ id: "s1", title: "1순위 · 쿠폰", desc: "T우주 50% 할인쿠폰 → -6,950원", state: "done" },
		{ id: "s2", title: "2순위 · T+ 포인트", desc: "5,000P 차감 → 잔여 1,950원", state: "done" },
		{ id: "s3", title: "3순위 · 신한카드 ••3721", desc: "처리 중… 1,950원", state: "in-progress" },
	] satisfies ProcessingStep[],
	loadingTitle: "결제를 처리하고 있어요",
	loadingSub: "잠시만 기다려 주세요\n화면을 닫거나 뒤로 가지 마세요",
} as const;
