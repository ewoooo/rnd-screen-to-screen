import { Placeholder } from "@/components/system";

type Props = {
	text: string;
	imageSize: { w: number; h: number };
	imageLabel?: string;
};

/**
 * 스크롤 영역 최상단의 작은 가로 배너 (48h).
 * Statusbar+Header와 다음 카드 사이 얇은 홍보 문구.
 * 혜택/관리/단말기/시니어에서 반복. (비로그인은 Big Hero로 대체)
 */
export function TopBanner({ text, imageSize, imageLabel = "image" }: Props) {
	return (
		<div
			style={{
				height: 48,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "0 var(--spacing-16)",
			}}
		>
			<span
				style={{
					fontSize: 12,
					fontWeight: 700,
					color: "var(--semantic-label-alternative)",
					letterSpacing: "-0.48px",
				}}
			>
				{text}
			</span>
			<Placeholder w={imageSize.w} h={imageSize.h} label={imageLabel} />
		</div>
	);
}
