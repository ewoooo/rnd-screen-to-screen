"use client";

import type { ReactNode } from "react";
import { FlexBox, Typography } from "@wanteddev/wds";

import { DividerPilot } from "@/components/pilot-kit/DividerPilot";
import { ImageBrandLogoRoundPilot } from "@/components/pilot-kit/ImageBrandLogoRoundPilot";
import { ImgRectanglePilot } from "@/components/pilot-kit/ImgRectanglePilot";
import { IndicatorDotPilot } from "@/components/pilot-kit/IndicatorDotPilot";
import { TextAreaBodyPilot } from "@/components/pilot-kit/TextAreaBodyPilot";

function Row({
	title,
	figmaName,
	children,
}: {
	title: string;
	figmaName: string;
	children: ReactNode;
}) {
	return (
		<FlexBox flexDirection="column" gap={8} sx={{ paddingBottom: 16 }}>
			<FlexBox flexDirection="column" gap={2}>
				<Typography variant="body2" weight="bold">
					{title}
				</Typography>
				<Typography variant="caption1" weight="medium">
					Figma: {figmaName}
				</Typography>
			</FlexBox>
			<FlexBox
				flexDirection="row"
				gap={12}
				alignItems="center"
				sx={{ flexWrap: "wrap" }}
			>
				{children}
			</FlexBox>
		</FlexBox>
	);
}

export default function AtomsDisplayPreviewPage() {
	return (
		<FlexBox
			flexDirection="column"
			gap={16}
			sx={{ padding: 20, width: "100%", maxWidth: 360 }}
		>
			<FlexBox flexDirection="column" gap={2}>
				<Typography variant="title3" weight="bold">
					Atoms · Display
				</Typography>
				<Typography variant="caption1" weight="medium">
					Figma 04_ADP_P3-T1_Library / atom 섹션 (143:8046) · 5종
				</Typography>
			</FlexBox>

			<Row title="DividerPilot" figmaName="divider (light/heavy/dot)">
				<FlexBox
					flexDirection="column"
					gap={16}
					sx={{ width: "100%" }}
				>
					<DividerPilot type="light" />
					<DividerPilot type="heavy" />
					<DividerPilot type="dot" />
				</FlexBox>
			</Row>

			<Row title="ImageBrandLogoRoundPilot" figmaName="image/brand-logo/round (4 sizes, placeholder)">
				<ImageBrandLogoRoundPilot size="extra-small" />
				<ImageBrandLogoRoundPilot size="small" />
				<ImageBrandLogoRoundPilot size="middle" />
				<ImageBrandLogoRoundPilot size="large" />
			</Row>

			<Row title="ImgRectanglePilot" figmaName="img/rectangle (6 size×type, placeholder)">
				<ImgRectanglePilot size="extra-small" type="standard-product" />
				<ImgRectanglePilot size="small" type="standard-product" />
				<ImgRectanglePilot size="medium" type="standard-product" />
			</Row>

			<Row title="TextAreaBodyPilot" figmaName="text-area/body (body2 regular)">
				<FlexBox flexDirection="column" gap={8}>
					<TextAreaBodyPilot text="기본 본문 텍스트입니다." />
					<TextAreaBodyPilot text="흐림(muted) 보조 텍스트" emphasis="muted" />
				</FlexBox>
			</Row>

			<Row title="IndicatorDotPilot" figmaName="indicator-dot (selected/default)">
				<FlexBox flexDirection="row" gap={6} alignItems="center">
					<IndicatorDotPilot state="selected" />
					<IndicatorDotPilot state="default" />
					<IndicatorDotPilot state="default" />
					<IndicatorDotPilot state="default" />
					<IndicatorDotPilot state="default" />
				</FlexBox>
			</Row>
		</FlexBox>
	);
}
