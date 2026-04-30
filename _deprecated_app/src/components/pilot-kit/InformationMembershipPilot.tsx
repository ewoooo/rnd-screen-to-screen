"use client";

import { FlexBox, Typography } from "@wanteddev/wds";

import { ButtonChipPilot } from "./ButtonChipPilot";

// Figma information-membership (molecule, 280×139) → 빈 상태 안내 + CTA
// Source: data/binding/overrides/information-membership.json
export function InformationMembershipPilot({
	showTitle = true,
	title = "어드민 지정 타이틀 텍스트\n두 줄 작성 가능",
	subtitle = "어드민 지정 서브 텍스트\n두 줄 작성 가능 글자수 초과시 말줄임",
	actionLabel = "확인",
	showAction = true,
	onAction,
}: {
	showTitle?: boolean;
	title?: string;
	subtitle?: string;
	actionLabel?: string;
	showAction?: boolean;
	onAction?: () => void;
}) {
	return (
		<FlexBox flexDirection="column" gap={20} alignItems="center" sx={{ width: 280 }}>
			<FlexBox flexDirection="column" gap={5} alignItems="center" sx={{ width: "100%" }}>
				{showTitle && (
					<Typography
						variant="body1"
						weight="bold"
						sx={{ textAlign: "center", whiteSpace: "pre-line" }}
					>
						{title}
					</Typography>
				)}
				<Typography
					variant="label1"
					weight="regular"
					sx={{ color: "#666", textAlign: "center", whiteSpace: "pre-line" }}
				>
					{subtitle}
				</Typography>
			</FlexBox>
			{showAction && (
				<ButtonChipPilot text={actionLabel} size="middle" onClick={onAction} />
			)}
		</FlexBox>
	);
}
