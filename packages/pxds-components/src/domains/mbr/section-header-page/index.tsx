import { Box, VStack } from "@pxds/pxds-layout/primitives";
import { ContentSection } from "@pxds/pxds-layout/app-screen";
import { TextBlock } from "../../../atoms/typography";

type Props = {
	title: string;
};

export function SectionHeaderPage({ title }: Props) {
	return (
		<ContentSection>
			<Box pt="group" pb="section">
				<VStack gap="stack">
					<TextBlock variant="displayTitle" lines={[title]} />
				</VStack>
			</Box>
		</ContentSection>
	);
}
