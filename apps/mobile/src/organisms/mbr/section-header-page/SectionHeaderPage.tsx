import { Text } from "@pxds/cx-components";
import { Box } from "@pxds/pxds-layout/primitives";

import type { SectionHeaderPageProps } from "./SectionHeaderPage.config";

export function SectionHeaderPage({ title }: SectionHeaderPageProps) {
	return (
		<Box p={4}>
			<Text variant="displayTitle" as="h1">
				{title}
			</Text>
		</Box>
	);
}
