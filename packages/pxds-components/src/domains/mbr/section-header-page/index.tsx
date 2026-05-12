import { Box, VStack } from "@pxds/pxds-layout/primitives";
import { ContentSection } from "@pxds/pxds-layout/app-screen";
import { TextBlock } from "../../../atoms/typography";
import { renderString, type ComponentRenderReact } from "../../../render-react";

type Props = {
	title: string;
};

export function SectionHeaderPage({ title }: Props) {
	return (
		<ContentSection
			exportNode={{
				type: "SectionHeaderPage",
				id: "section-header-page",
				props: {
					componentId: "ogn-mbr-section-header-page",
					title,
				},
			}}
		>
			<Box pt="group" pb="section">
				<VStack gap="stack">
					<TextBlock variant="displayTitle" lines={[title]} />
				</VStack>
			</Box>
		</ContentSection>
	);
}

export const sectionHeaderPageRenderReact: ComponentRenderReact = ({ node }) => (
	<SectionHeaderPage title={renderString(node.props?.title) ?? ""} />
);
