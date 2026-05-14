import { TitleMain } from "@pxds/cx-components";
import { PageStackContents } from "@pxds/pxds-layout/components/compositions";

import type { SectionHeaderPageProps } from "./SectionHeaderPage.config";

export function SectionHeaderPage({ title, subTitle }: SectionHeaderPageProps) {
	return (
		<PageStackContents
			title={<TitleMain title={title} subTitle={subTitle} />}
		/>
	);
}
