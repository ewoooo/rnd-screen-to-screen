import { defineComponentConfig } from "@pxds/cx-spec";

export type ConsentTermsAccordionProps = {
	allChecked: boolean;
	onAllCheckedChange: (next: boolean) => void;
	checkedById: Record<string, boolean>;
	onItemCheckedChange: (id: string, next: boolean) => void;
};

export const consentTermsAccordionConfig =
	defineComponentConfig<ConsentTermsAccordionProps>({
		id: "ogn-mbr-consent-terms-accordion",
		name: "ConsentTermsAccordion",
		layer: "organism",
		owner: "@screen/mobile",
		node: {
			kind: "component",
			selectable: true,
			exportable: true,
		},
		props: {},
		figma: {
			componentName: "OGN / MBR / Consent Terms Accordion",
		},
	});
