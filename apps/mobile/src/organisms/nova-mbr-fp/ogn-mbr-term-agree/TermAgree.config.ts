import { defineComponentConfig } from "@pxds/cx-spec";

export type TermAgreeProps = {
	/**
	 * Screen.diagram.html section id. 001 uses `termAgree`; 009 uses
	 * `termAgreeSection` so the OGN root matches the visible contract.
	 */
	sectionId?: string;
	/**
	 * 필수 약관 미동의 상태에서 진행 시도 시 true.
	 * REQ-001(POL-MBR-TERM-001-06) negative 인접 안내를 노출한다(ERR_1).
	 */
	showRequiredError?: boolean;
	/**
	 * 009 recovery scroll target. When true, keep a hidden zero-occupancy
	 * anchor in the DOM before the blocked-progress Notice appears.
	 */
	keepErrorAnchorMounted?: boolean;
	/**
	 * 필수 약관 전체 동의 여부가 바뀔 때 호출.
	 * 진행 게이트(Bottom Primary)는 Screen이 소유한다(BTN_4).
	 */
	onRequiredAgreedChange?: (allRequiredAgreed: boolean) => void;
};

export const termAgreeConfig = defineComponentConfig<TermAgreeProps>({
	id: "ogn-mbr-term-agree",
	name: "TermAgree",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / MBR-FP / Term Agree",
	},
});
