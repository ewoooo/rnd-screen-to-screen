import { Box, VStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { ContentRail, ContentSection } from "@pxds/pxds-layout/app-screen";
import {
	renderString,
	renderStringArray,
	type ComponentRenderReact,
} from "../../../../render-react";

type Props = {
	titleLines: readonly string[];
	description: string;
};

export function FlowHero({ titleLines, description }: Props) {
	return (
		<ContentSection>
			<Box pt="group" pb="section">
				<VStack gap="stack">
					<VStack gap="inline">
						<TextBlock variant="displayTitle" lines={titleLines} />
					</VStack>
					<ContentRail rail="measure" measure="body">
						<TextBlock
							variant="bodySubtle"
							text={description}
							color="semantic.label.alternative"
							maxLines={3}
						/>
					</ContentRail>
				</VStack>
			</Box>
		</ContentSection>
	);
}

export const flowHeroRenderReact: ComponentRenderReact = ({ node }) => (
	<FlowHero
		titleLines={renderStringArray(node.props?.titleLines) ?? []}
		description={renderString(node.props?.description) ?? ""}
	/>
);
