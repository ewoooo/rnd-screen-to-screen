import { TitleSection } from "@pxds/cx-components";
import { PageStackContents } from "@pxds/pxds-layout/components/compositions";

import type { SectionHeaderPageProps } from "./SectionHeaderPage.config";

export function SectionHeaderPage({ title }: SectionHeaderPageProps) {
	return (
		<PageStackContents title={<TitleSection title={title} />}>
		</PageStackContents>
	);
}
