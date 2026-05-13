import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { MbrOgnSectionLayout } from "../_layout";
import type { SectionHeaderPageProps } from "./SectionHeaderPage.config";

export function SectionHeaderPage({ title }: SectionHeaderPageProps) {
	return (
		<MbrOgnSectionLayout>
			<TextBlock variant="displayTitle" text={title} />
		</MbrOgnSectionLayout>
	);
}
