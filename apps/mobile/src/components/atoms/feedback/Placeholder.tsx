import type { CSSProperties } from "react";

import { Thumbnail } from "@wanteddev/wds";

import { HStack } from "@/components/atoms/layout";

type Props = {
	w: number | string;
	h: number | string;
	label: string;
	style?: CSSProperties;
};

/**
 * 이미지/아이콘 자리의 "동일 사이즈" 대체 썸네일.
 * 실제 미디어가 없는 상태도 WDS Thumbnail 표면으로 표현한다.
 */
export function Placeholder({ w, h, label, style }: Props) {
	const width = typeof w === "number" ? `${w}px` : w;
	const height = typeof h === "number" ? `${h}px` : h;

	return (
		<HStack
			align="center"
			justify="center"
			shrink={0}
			style={{
				width,
				height,
				overflow: "hidden",
				...style,
			}}
		>
			<Thumbnail
				width="100%"
				ratio="1:1"
				radius
				border
				alt={label}
				style={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
				}}
				overlay={
					<HStack
						align="center"
						justify="center"
						width="100%"
						height="100%"
						style={{
							color: "var(--semantic-label-alternative)",
							fontSize: 10,
							fontWeight: 500,
							background: "var(--semantic-background-normal-alternative)",
						}}
					>
						{label}
					</HStack>
				}
			/>
		</HStack>
	);
}
