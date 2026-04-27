import type { CSSProperties } from "react";

import { Placeholder } from "@/components/system";

import { OFFERING_BG, OFFERING_BORDER } from "../tokens";

type Variant = "top" | "offering";

type Props = {
	variant: Variant;
	text: string;
	imageSize: { w: number; h: number };
	imageLabel?: string;
};

type VariantStyle = {
	container: CSSProperties;
	text: CSSProperties;
};

const STYLES: Record<Variant, VariantStyle> = {
	top: {
		container: {
			height: 48,
			padding: "0 var(--spacing-16)",
		},
		text: {
			fontSize: 12,
			fontWeight: 700,
			color: "var(--semantic-label-alternative)",
			letterSpacing: "-0.48px",
		},
	},
	offering: {
		container: {
			background: OFFERING_BG,
			border: `1px solid ${OFFERING_BORDER}`,
			borderRadius: 24,
			height: 94,
			padding: "0 var(--spacing-32)",
			overflow: "hidden",
		},
		text: {
			fontSize: 14,
			fontWeight: 600,
			letterSpacing: "-0.56px",
			lineHeight: 1.2,
			color: "var(--semantic-label-normal)",
			whiteSpace: "nowrap",
		},
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
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
				boxSizing: "border-box",
				...s.container,
			}}
		>
			<span style={{ margin: 0, ...s.text }}>{text}</span>
			<Placeholder w={imageSize.w} h={imageSize.h} label={imageLabel} />
		</div>
	);
}
