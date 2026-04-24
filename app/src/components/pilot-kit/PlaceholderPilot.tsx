import type { CSSProperties } from "react";

type Props = {
	w: number | string;
	h: number | string;
	label: string;
	style?: CSSProperties;
};

/**
 * 이미지/아이콘 자리의 "동일 사이즈" 대체 블록.
 * Figma 원본에서 이미지 슬롯은 모두 이걸로 치환한다.
 * (memory: project_placeholder_transparent — 회색 박스 금지, 투명 체커보드)
 */
export function PlaceholderPilot({ w, h, label, style }: Props) {
	return (
		<div
			style={{
				width: typeof w === "number" ? `${w}px` : w,
				height: typeof h === "number" ? `${h}px` : h,
				border: "1px dashed var(--semantic-line-solid-normal)",
				borderRadius: 6,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "var(--semantic-label-alternative)",
				fontSize: 10,
				fontWeight: 500,
				background: "var(--semantic-background-normal-alternative)",
				boxSizing: "border-box",
				flexShrink: 0,
				...style,
			}}
		>
			{label}
		</div>
	);
}
