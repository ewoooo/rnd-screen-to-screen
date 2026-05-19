import { defineComponentConfig } from "@pxds/cx-spec";

export type GuardianInputProps = {
	/**
	 * 고객유형=미성년자(만 14세 미만)일 때만 true.
	 * 기본 false → mounted-hidden marker(레이아웃 점유 0).
	 * REQ-002(POL-MBR-TERM-002-01) 조건부 노출.
	 */
	visible?: boolean;
	/**
	 * 법정대리인 동의 미완료 상태에서 진행 시도 시 true.
	 * REQ-002 error 인접 안내(ERR_1).
	 */
	showError?: boolean;
	/** 동의 요청 발송(섹션 내부 보조 action, BTN_4 위계). */
	onRequestSend?: () => void;
};

export const guardianInputConfig = defineComponentConfig<GuardianInputProps>({
	id: "ogn-mbr-guardian-input",
	name: "GuardianInput",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "Legacy OGN / MBR-FP / Guardian Input",
	},
});
