import type {
	TextBlockOverflow,
	TextBlockVariant,
} from "@/components/atoms/typography";

export type ProductTextPolicy = {
	variant?: TextBlockVariant;
	maxLines?: number;
	overflow?: TextBlockOverflow;
};

export type ProductTextPolicyMap = Record<string, ProductTextPolicy>;
