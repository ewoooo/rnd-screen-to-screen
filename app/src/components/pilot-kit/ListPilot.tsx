"use client";

import type { ReactNode } from "react";
import { FlexBox, ScrollArea } from "@wanteddev/wds";
import { TextAreaPilot } from "./TextAreaPilot";
import { LinkPilot } from "./LinkPilot";

// synthesized mlc/list (C3) → WDS 합성 컨테이너
// Source: data/binding/overrides/list.json
export function ListPilot({
	title,
	subTitle,
	showMore = false,
	moreLabel = "전체보기",
	onMoreClick,
	direction = "horizontal",
	itemGap = 12,
	children,
}: {
	title: string;
	subTitle?: string;
	showMore?: boolean;
	moreLabel?: string;
	onMoreClick?: () => void;
	direction?: "horizontal" | "vertical";
	itemGap?: number;
	children: ReactNode;
}) {
	return (
		<FlexBox flexDirection="column" gap={12}>
			<FlexBox
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				sx={{ paddingLeft: 18, paddingRight: 18 }}
			>
				<TextAreaPilot text={title} subText={subTitle} />
				{showMore && (
					<LinkPilot
						text={moreLabel}
						variant="assistive"
						size="small"
						trailingIcon
						onClick={onMoreClick}
					/>
				)}
			</FlexBox>

			{direction === "horizontal" ? (
				<ScrollArea scrollbars="horizontal">
					<FlexBox
						flexDirection="row"
						gap={itemGap}
						sx={{ paddingLeft: 18, paddingRight: 18 }}
					>
						{children}
					</FlexBox>
				</ScrollArea>
			) : (
				<FlexBox
					flexDirection="column"
					gap={itemGap}
					sx={{ paddingLeft: 18, paddingRight: 18 }}
				>
					{children}
				</FlexBox>
			)}
		</FlexBox>
	);
}
