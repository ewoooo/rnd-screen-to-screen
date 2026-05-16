import { TitleMain } from "@pxds/cx-components";
import { PageStackContents } from "@pxds/cx-layout/components/contents";

import type { SectionHeaderPageProps } from "./SectionHeaderPage.config";

export function SectionHeaderPage({ title, subTitle }: SectionHeaderPageProps) {
	return (
		<PageStackContents
			title={<TitleMain title={title} subTitle={subTitle} />}
		/>
	);
}
