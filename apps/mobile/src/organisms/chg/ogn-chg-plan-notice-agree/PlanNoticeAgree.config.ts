import { defineComponentConfig } from "@pxds/cx-spec";

import type { PlanNoticeAgreeProps } from "./PlanNoticeAgree";

export const planNoticeAgreeConfig =
	defineComponentConfig<PlanNoticeAgreeProps>({
		id: "ogn-chg-plan-notice-agree",
		name: "PlanNoticeAgree",
		layer: "organism",
		owner: "@screen/mobile",
		node: {
			kind: "component",
			selectable: true,
			exportable: true,
		},
		props: {},
		figma: {
			componentName: "OGN / CHG / Plan Notice Agree",
		},
	});
