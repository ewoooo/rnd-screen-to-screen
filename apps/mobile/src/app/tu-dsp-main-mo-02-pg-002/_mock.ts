// Spec: apps/mobile/src/screens/spec-source/active/tu-dsp-main-mo-02-pg-002.json
// 접근권한 안내 (앱 최초 실행 시 OS 권한 요청 전 안내 화면)
// SPEC-MAIN-16 권한 항목 리스트 / SPEC-MAIN-17 페이지 닫힘 + 상태값 반영

export type PermissionItem = {
	id: string;
	required: boolean;
	icon: string; // emoji or short tag
	title: string;
	purpose: string;
};

export type PermissionGuide = {
	headline: string;
	description: string;
	required: PermissionItem[];
	optional: PermissionItem[];
	footnote: string; // 보조 안내 (REQ-005)
	primaryAction: string;
};

export const permissionGuideFixture: PermissionGuide = {
	headline: "앱 이용에 필요한 권한을 안내드려요",
	description:
		"서비스를 정상적으로 이용하려면 아래 권한이 필요합니다. 선택 권한은 동의하지 않아도 서비스 이용이 가능해요.",
	required: [
		{
			id: "device",
			required: true,
			icon: "📱",
			title: "기기 정보",
			purpose: "기기 식별 및 부정 이용 방지",
		},
		{
			id: "network",
			required: true,
			icon: "📶",
			title: "네트워크 상태",
			purpose: "서비스 안정적 연결 확인",
		},
	],
	optional: [
		{
			id: "notification",
			required: false,
			icon: "🔔",
			title: "알림",
			purpose: "구독 상태·혜택 안내 푸시",
		},
		{
			id: "storage",
			required: false,
			icon: "📂",
			title: "사진/파일",
			purpose: "프로필 이미지 등록",
		},
	],
	footnote:
		"선택 권한은 동의하지 않아도 서비스 이용이 가능합니다. 해당 기능 최초 사용 시점에 다시 요청될 수 있어요.",
	primaryAction: "확인",
};
