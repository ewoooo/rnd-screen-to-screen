import {
  ProgressIndicator,
  TopNavigation,
  TopNavigationButton,
} from "@pxds/pxds-components/core";
import { IconArrowLeft, IconClose } from "@pxds/pxds-icons";

import { Box, VStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import {
	renderBoolean,
	renderRecord,
	renderString,
	type ComponentRenderReact,
} from "../../../../render-react";

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

export function ProgressTopBar({ title, leading = "back", progress }: Props) {
  const showProgressLabel = progress?.showLabel ?? false;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
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
          <Box px="var(--semantic-spacing-inset)" pb="var(--semantic-spacing-stack)">
            <VStack gap="var(--semantic-spacing-row)">
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
    </div>
  );
}

export const progressTopBarRenderReact: ComponentRenderReact = ({ node }) => {
  const progress = renderRecord(node.props?.progress);
  return (
    <ProgressTopBar
      title={renderString(node.props?.title) ?? ""}
      leading={node.props?.leading === "close" ? "close" : "back"}
      progress={
        progress
          ? {
              label: renderString(progress.label) ?? "",
              percent: typeof progress.percent === "number" ? progress.percent : 0,
              showLabel: renderBoolean(progress.showLabel, true),
            }
          : undefined
      }
    />
  );
};
