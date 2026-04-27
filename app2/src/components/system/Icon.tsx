import Image, { type StaticImageData } from "next/image";

type Props = {
	src: StaticImageData;
	/** 미지정 시 SVG 원본 사이즈 사용 */
	width?: number;
	height?: number;
	/** 색 지정 시 mask 모드 — 단색으로 채움 (멀티컬러 SVG는 단색 압축됨) */
	color?: string;
	alt?: string;
};

/**
 * SVG 아이콘 wrap.
 * - color 없으면 next/image 로 원본 표시 (멀티컬러 SVG, 로고 등)
 * - color 있으면 CSS mask 로 색 변경
 */
export function Icon({
	src,
	width = src.width,
	height = src.height,
	color,
	alt = "",
}: Props) {
	if (color) {
		return (
			<span
				aria-label={alt || undefined}
				role={alt ? "img" : undefined}
				style={{
					display: "inline-block",
					width,
					height,
					backgroundColor: color,
					maskImage: `url(${src.src})`,
					WebkitMaskImage: `url(${src.src})`,
					maskRepeat: "no-repeat",
					WebkitMaskRepeat: "no-repeat",
					maskSize: "contain",
					WebkitMaskSize: "contain",
					maskPosition: "center",
					WebkitMaskPosition: "center",
					flexShrink: 0,
				}}
			/>
		);
	}
	return <Image src={src} alt={alt} width={width} height={height} />;
}
