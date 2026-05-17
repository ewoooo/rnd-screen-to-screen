import { TitleMain } from "@pxds/cx-components";
import { PageStackContents } from "@pxds/cx-layout/components/contents";

type FpPageHeaderProps = {
	title: string;
	subTitle?: string;
};

export function FpPageHeader({ title, subTitle }: FpPageHeaderProps) {
	return (
		<PageStackContents title={<TitleMain title={title} subTitle={subTitle} />} />
	);
}
