import type {
	TextBlockOverflow,
	TextBlockVariant,
} from "@pxds/pxds-components/atoms/typography";

export type ProductTextPolicy = {
	variant?: TextBlockVariant;
	maxLines?: number;
	overflow?: TextBlockOverflow;
};

export type ProductTextPolicyMap = Record<string, ProductTextPolicy>;
