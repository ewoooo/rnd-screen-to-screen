import { Placeholder } from "./Placeholder";
import { OFFERING_BG, OFFERING_BORDER } from "./tokens";

type Props = {
	text: string;
	imageSize: { w: number; h: number };
	imageLabel?: string;
};

/**
 * offering_banner — 거의 투명한 카드에 문구 + 우측 이미지 placeholder.
 * 혜택(카드 이미지 72×62) / 관리(기프트카드 59×47) 등.
 */
export function OfferingBanner({ text, imageSize, imageLabel = "image" }: Props) {
	return (
		<section
			style={{
				background: OFFERING_BG,
				border: `1px solid ${OFFERING_BORDER}`,
				borderRadius: 24,
				height: 94,
				padding: "0 var(--spacing-32)",
				width: "100%",
				boxSizing: "border-box",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				overflow: "hidden",
			}}
		>
			<p
				style={{
					margin: 0,
					fontSize: 14,
					fontWeight: 600,
					letterSpacing: "-0.56px",
					lineHeight: 1.2,
					color: "var(--semantic-label-normal)",
					whiteSpace: "nowrap",
				}}
			>
				{text}
			</p>
			<Placeholder w={imageSize.w} h={imageSize.h} label={imageLabel} />
		</section>
	);
}
