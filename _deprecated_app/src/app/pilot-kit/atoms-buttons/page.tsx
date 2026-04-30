"use client";

import type { ReactNode } from "react";
import { FlexBox, Typography } from "@wanteddev/wds";
import { IconChevronRight } from "@wanteddev/wds-icon";

import { BtnSearchPilot } from "@/components/pilot-kit/BtnSearchPilot";
import { BtnTextPilot } from "@/components/pilot-kit/BtnTextPilot";
import { BtnTextIconPilot } from "@/components/pilot-kit/BtnTextIconPilot";
import { ButtonAddPilot } from "@/components/pilot-kit/ButtonAddPilot";
import { ButtonCallToActionPilot } from "@/components/pilot-kit/ButtonCallToActionPilot";
import { ButtonChipPilot } from "@/components/pilot-kit/ButtonChipPilot";
import { ButtonIconTextBackgroundPilot } from "@/components/pilot-kit/ButtonIconTextBackgroundPilot";

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

export default function AtomsButtonsPreviewPage() {
	return (
		<FlexBox
			flexDirection="column"
			gap={16}
			sx={{ padding: 20, width: "100%", maxWidth: 360 }}
		>
			<FlexBox flexDirection="column" gap={2}>
				<Typography variant="title3" weight="bold">
					Atoms · Buttons
				</Typography>
				<Typography variant="caption1" weight="medium">
					Figma 04_ADP_P3-T1_Library / atom 섹션 (143:8046) · 7종
				</Typography>
			</FlexBox>

			<Row title="BtnSearchPilot" figmaName="btn-search">
				<BtnSearchPilot />
			</Row>

			<Row title="BtnTextPilot" figmaName="btn-text (4 variants)">
				<BtnTextPilot text="default-bold" type="default" weight="bold" />
				<BtnTextPilot text="default-medium" type="default" weight="medium" />
				<BtnTextPilot text="line-bold" type="line" weight="bold" />
				<BtnTextPilot text="line-medium" type="line" weight="medium" />
			</Row>

			<Row title="BtnTextIconPilot" figmaName="btn-text-icon (size mid/sm)">
				<BtnTextIconPilot
					text="더보기"
					icon={<IconChevronRight width={14} height={14} />}
					size="middle"
				/>
				<BtnTextIconPilot
					text="더보기"
					icon={<IconChevronRight width={12} height={12} />}
					size="small"
				/>
				<BtnTextIconPilot
					text="leading"
					icon={<IconChevronRight width={14} height={14} />}
					iconPosition="leading"
				/>
			</Row>

			<Row title="ButtonAddPilot" figmaName="button-add (size mid/sm)">
				<ButtonAddPilot size="middle" />
				<ButtonAddPilot size="small" />
			</Row>

			<Row
				title="ButtonIconTextBackgroundPilot"
				figmaName="button-icon-text-background (fill/stroke × mid/sm)"
			>
				<ButtonIconTextBackgroundPilot text="구독하기" type="fill" size="middle" />
				<ButtonIconTextBackgroundPilot text="구독하기" type="fill" size="small" />
				<ButtonIconTextBackgroundPilot text="더보기" type="stroke" size="middle" />
				<ButtonIconTextBackgroundPilot text="더보기" type="stroke" size="small" />
				<ButtonIconTextBackgroundPilot
					text="이동"
					type="fill"
					size="middle"
					icon={<IconChevronRight width={14} height={14} />}
				/>
			</Row>

			<Row title="ButtonChipPilot" figmaName="button-chip (size mid/sm)">
				<ButtonChipPilot text="OTT" size="middle" />
				<ButtonChipPilot text="OTT" size="middle" active />
				<ButtonChipPilot text="음악" size="small" />
				<ButtonChipPilot text="독서" size="small" active />
			</Row>

			<Row title="ButtonCallToActionPilot" figmaName="button-calltoaction (3 states)">
				<ButtonCallToActionPilot text="결제하기" state="default" />
				<ButtonCallToActionPilot text="결제하기" state="disabled" />
				<ButtonCallToActionPilot text="결제하기" state="loading" />
			</Row>
		</FlexBox>
	);
}
