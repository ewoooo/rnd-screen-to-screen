import { Box, VStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { ContentRail, ContentSection } from "@pxds/pxds-layout/app-screen";

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
