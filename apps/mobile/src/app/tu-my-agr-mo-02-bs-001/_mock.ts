// Spec: apps/mobile/src/screens/spec-source/active/tu-my-agr-mo-02-bs-001.json
// 혜택 및 이벤트 약관동의 (발견_case2_로그인 위에 떠 있는 바텀시트)
// SPEC-AGR-01 동의 항목 리스트 / SPEC-AGR-02 바텀시트 닫힘 (30일 미노출)

export type AgreementItem = {
	id: string;
	required: boolean;
	defaultChecked: boolean;
	title: string;
	channel?: "app" | "web" | "all"; // app push 항목은 App 환경에서만 노출
};

export type AgreementBottomSheet = {
	headline: string;
	description: string;
	items: AgreementItem[];
	primaryAction: string;
	dismissAction: string; // 30일간 보지 않기
};

export const agreementBottomSheetFixture: AgreementBottomSheet = {
	headline: "맞춤형 소식, 받아보실래요?",
	description: "신규 혜택과 한정 이벤트를 가장 먼저 알려드릴게요.",
	items: [
		{
			id: "marketing",
			required: false,
			defaultChecked: true,
			title: "이벤트·할인 소식 수신 동의",
			channel: "all",
		},
		{
			id: "push",
			required: false,
			defaultChecked: true,
			title: "앱 푸시 알림 수신 동의",
			channel: "app",
		},
	],
	primaryAction: "동의하고 시작하기",
	dismissAction: "30일간 보지 않기",
};
