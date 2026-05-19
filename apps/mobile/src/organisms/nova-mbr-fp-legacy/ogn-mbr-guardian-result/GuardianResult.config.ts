import { defineComponentConfig } from "@pxds/cx-spec";

export type GuardianResultStatus = "waiting" | "expired";

export type GuardianResultProps = {
	/**
	 * out-of-state. 동의 요청 발송 이후에만 의미.
	 * 기본 false → mounted-hidden marker(초기 wire 미노출, 레이아웃 영향 0).
	 */
	visible?: boolean;
	/** waiting=대기 안내(info) / expired=만료 안내(negative, REQ-003). */
	status?: GuardianResultStatus;
	/** 만료 시 동의 재요청(보조 위계, BTN_4). */
	onRetry?: () => void;
};

export const guardianResultConfig = defineComponentConfig<GuardianResultProps>({
	id: "ogn-mbr-guardian-result",
	name: "GuardianResult",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "Legacy OGN / MBR-FP / Guardian Result",
	},
});
