"use client";

import { FlexBox, TextButton, Typography } from "@wanteddev/wds";
import { IconChevronRight } from "@wanteddev/wds-icon";
import type { ReactNode } from "react";

import { Placeholder } from "@/components/home-kit";

// Figma card-horizontal-product-select (molecule, 336×136) → header + slot
// Source: data/binding/overrides/card-horizontal-product-select.json
export function CardHorizontalProductSelectPilot({
	title = "product-type",
	actionLabel = "변경",
	showAction = true,
	slotContents,
	onAction,
}: {
	title?: string;
	actionLabel?: string;
	showAction?: boolean;
	slotContents?: ReactNode;
	onAction?: () => void;
}) {
	return (
		<FlexBox
			flexDirection="column"
			gap={12}
			sx={{ width: 336 }}
		>
			<FlexBox
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				sx={{ width: "100%", padding: "0 12px" }}
			>
				<Typography variant="body1" weight="bold">
					{title}
				</Typography>
				{showAction && (
					<TextButton
						color="primary"
						size="small"
						trailingContent={<IconChevronRight width={16} height={16} />}
						onClick={onAction}
					>
						{actionLabel}
					</TextButton>
				)}
			</FlexBox>
			<div
				style={{
					width: "100%",
					height: 104,
					display: "flex",
					alignItems: "stretch",
					justifyContent: "stretch",
				}}
			>
				{slotContents ?? <Placeholder w="100%" h="100%" label="slot" />}
			</div>
		</FlexBox>
	);
}
