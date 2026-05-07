import {
	ProgressIndicator,
	TopNavigation,
	TopNavigationButton,
} from "@pxds/pxds-components/core";
import { IconArrowLeft, IconClose } from "@pxds/pxds-components/core";

import { Box, VStack } from "@/components/atoms/layout";
import { TextBlock } from "@/components/atoms/typography";
import { StatusBar } from "@/components/templates/app-screen";

export type ProgressTopBarLeading = "back" | "close";

export type ProgressTopBarProgress = {
	label: string;
	percent: number;
	showLabel?: boolean;
};

type Props = {
	title: string;
	leading?: ProgressTopBarLeading;
	progress?: ProgressTopBarProgress;
};

export function ProgressTopBar({
	title,
	leading = "back",
	progress,
}: Props) {
	const showProgressLabel = progress?.showLabel ?? false;
	return (
		<>
			<StatusBar />
			<TopNavigation
				variant="normal"
				leadingContent={
					<TopNavigationButton
						variant="icon"
						color="assistive"
						aria-label={leading === "back" ? "뒤로" : "닫기"}
					>
						{leading === "back" ? (
							<IconArrowLeft width={24} height={24} />
						) : (
							<IconClose width={24} height={24} />
						)}
					</TopNavigationButton>
				}
			>
				{title}
			</TopNavigation>
			{progress ? (
				showProgressLabel ? (
					<Box px="inset" pb="stack">
						<VStack gap="row">
							<TextBlock
								variant="sectionLabel"
								text={progress.label}
								color="semantic.label.alternative"
							/>
							<ProgressIndicator
								percent={progress.percent}
								aria-label={progress.label}
							/>
						</VStack>
					</Box>
				) : (
					<ProgressIndicator
						percent={progress.percent}
						aria-label={progress.label}
					/>
				)
			) : null}
		</>
	);
}
