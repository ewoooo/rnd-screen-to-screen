"use client";

import type { ReactNode } from "react";
import { FlexBox, Typography } from "@wanteddev/wds";
import { IconBusinessBag } from "@wanteddev/wds-icon";

import { BadgeLabelTextPilot } from "@/components/pilot-kit/BadgeLabelTextPilot";
import { BadgeNumberPilot } from "@/components/pilot-kit/BadgeNumberPilot";
import { BadgePassProductPilot } from "@/components/pilot-kit/BadgePassProductPilot";
import { BadgeProductStatePilot } from "@/components/pilot-kit/BadgeProductStatePilot";
import { PageIndicatorNumberPilot } from "@/components/pilot-kit/PageIndicatorNumberPilot";

function Row({
	title,
	figmaName,
	bg,
	children,
}: {
	title: string;
	figmaName: string;
	bg?: string;
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
				sx={{
					flexWrap: "wrap",
					padding: bg ? 12 : 0,
					borderRadius: bg ? 8 : 0,
					background: bg,
				}}
			>
				{children}
			</FlexBox>
		</FlexBox>
	);
}

export default function AtomsBadgesPreviewPage() {
	return (
		<FlexBox
			flexDirection="column"
			gap={16}
			sx={{ padding: 20, width: "100%", maxWidth: 360 }}
		>
			<FlexBox flexDirection="column" gap={2}>
				<Typography variant="title3" weight="bold">
					Atoms · Badges
				</Typography>
				<Typography variant="caption1" weight="medium">
					Figma 04_ADP_P3-T1_Library / atom 섹션 (143:8046) · 5종
				</Typography>
			</FlexBox>

			<Row title="BadgeProductStatePilot" figmaName="badge-product-state (blue/gray)">
				<BadgeProductStatePilot text="NEW" type="blue" />
				<BadgeProductStatePilot text="BEST" type="blue" />
				<BadgeProductStatePilot text="종료" type="gray" />
			</Row>

			<Row title="BadgeLabelTextPilot" figmaName="badge-label-text (17×17)">
				<BadgeLabelTextPilot text="N" />
				<BadgeLabelTextPilot text="!" />
				<BadgeLabelTextPilot text="D" />
			</Row>

			<Row title="BadgePassProductPilot" figmaName="badge-pass-product (34×17)">
				<BadgePassProductPilot text="PASS" />
				<BadgePassProductPilot text="구독" />
			</Row>

			<Row
				title="BadgeNumberPilot"
				figmaName="badge-number (target wrapper / standalone)"
			>
				<BadgeNumberPilot
					count={1}
					target={<IconBusinessBag width={24} height={24} />}
				/>
				<BadgeNumberPilot
					count={9}
					target={<IconBusinessBag width={24} height={24} />}
				/>
				<BadgeNumberPilot
					count={99}
					target={<IconBusinessBag width={24} height={24} />}
				/>
			</Row>

			<Row
				title="PageIndicatorNumberPilot (default)"
				figmaName="pageindicator-number"
			>
				<PageIndicatorNumberPilot currentPage={1} totalPages={5} />
				<PageIndicatorNumberPilot currentPage={3} totalPages={5} />
			</Row>

			<Row
				title="PageIndicatorNumberPilot (alternative — 어두운 배경 위)"
				figmaName="pageindicator-number alternative"
				bg="#222"
			>
				<PageIndicatorNumberPilot currentPage={1} totalPages={5} alternative />
				<PageIndicatorNumberPilot currentPage={3} totalPages={5} alternative />
			</Row>
		</FlexBox>
	);
}
