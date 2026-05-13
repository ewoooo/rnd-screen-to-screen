import { Text } from "@pxds/cx-components";
import { MbrOgnSectionLayout } from "../_layout";
import type { SectionHeaderPageProps } from "./SectionHeaderPage.config";

export function SectionHeaderPage({ title }: SectionHeaderPageProps) {
	return (
		<MbrOgnSectionLayout>
			<Text variant="displayTitle" as="h1">
				{title}
			</Text>
		</MbrOgnSectionLayout>
	);
}
