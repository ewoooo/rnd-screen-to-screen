"use client";

import { FlexBox, Typography } from "@wanteddev/wds";

// Figma banner (atom, midium/small) → div + Typography (WDS 매칭 없음)
// Source: data/binding/overrides/banner.json
// Note: organism BannerContentsPilot은 이 위에 contents-info + page-control 추가
export function BannerPilot({
	title,
	subTitle,
	imageSrc,
	size = "midium",
	radius = 35,
	onClick,
}: {
	title: string;
	subTitle?: string;
	imageSrc?: string;
	size?: "midium" | "small";
	radius?: number;
	onClick?: () => void;
}) {
	const isSmall = size === "small";
	const dimensions = isSmall
		? { width: 360, height: 78 }
		: { width: 336, height: 162 };

	return (
		<button
			type="button"
			onClick={onClick}
			style={{
				...dimensions,
				borderRadius: radius,
				border: "none",
				padding: 18,
				cursor: onClick ? "pointer" : "default",
				background: "#333",
				backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
				backgroundSize: "cover",
				backgroundPosition: "center",
				color: "#fff",
				textAlign: "left",
				boxShadow: "0px 4px 15px 0px rgba(0,0,0,0.1)",
				overflow: "hidden",
			}}
		>
			<FlexBox flexDirection="column" gap={4}>
				<Typography
					variant={isSmall ? "body2" : "title2"}
					weight="medium"
					sx={{ color: "#fff" }}
				>
					{title}
				</Typography>
				{subTitle && (
					<Typography
						variant="caption1"
						weight="medium"
						sx={{ color: "#fff", opacity: 0.7 }}
					>
						{subTitle}
					</Typography>
				)}
			</FlexBox>
		</button>
	);
}
