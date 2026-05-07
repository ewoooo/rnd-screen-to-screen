import { OFFERING_BG, OFFERING_BORDER } from "@pxds/pxds-tokens";
import type { CSSProperties } from "react";

import { HStack } from "@pxds/pxds-layout/primitives";
import { Placeholder } from "@pxds/pxds-components/feedback";
import { TextBlock } from "@pxds/pxds-components/typography";

type Variant = "top" | "offering";

type Props = {
	variant: Variant;
	text: string;
	imageSize: { w: number; h: number };
	imageLabel?: string;
};

type VariantStyle = {
	container: CSSProperties;
	textColor: "semantic.label.alternative" | "semantic.label.normal";
	textVariant: "promoLabel" | "promoText";
};

const STYLES: Record<Variant, VariantStyle> = {
	top: {
		container: {
			height: 48,
			padding: "0 var(--spacing-16)",
		},
		textColor: "semantic.label.alternative",
		textVariant: "promoLabel",
	},
	offering: {
		container: {
			background: OFFERING_BG,
			border: `1px solid ${OFFERING_BORDER}`,
			borderRadius: "var(--pxds-surface-card-radius)",
			height: 94,
			padding: "0 var(--spacing-32)",
			overflow: "hidden",
		},
		textColor: "semantic.label.normal",
		textVariant: "promoText",
	},
};

/**
 * 좌측 텍스트 + 우측 이미지 placeholder 의 가로 배너.
 * - `top`     : 스크롤 영역 최상단 얇은 홍보 (h=48, 투명, alternative 톤)
 * - `offering`: 카드 형태 반투명 배너 (h=94, OFFERING bg/border, normal 톤)
 */
export function Banner({ variant, text, imageSize, imageLabel = "image" }: Props) {
	const s = STYLES[variant];
	return (
		<HStack
			align="center"
			justify="space-between"
			width="100%"
			style={{
				boxSizing: "border-box",
				...s.container,
			}}
		>
			<TextBlock
				variant={s.textVariant}
				text={text}
				color={s.textColor}
				maxLines={1}
				overflow="truncate"
			/>
			<Placeholder w={imageSize.w} h={imageSize.h} label={imageLabel} />
		</HStack>
	);
}
