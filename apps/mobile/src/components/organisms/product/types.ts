import type {
	TextBlockOverflow,
	TextBlockVariant,
} from "@pxds/pxds-components/typography";

export type ProductTextPolicy = {
	variant?: TextBlockVariant;
	maxLines?: number;
	overflow?: TextBlockOverflow;
};

export type ProductTextPolicyMap = Record<string, ProductTextPolicy>;
