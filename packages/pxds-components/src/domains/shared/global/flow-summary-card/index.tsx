import {
	InfoSection,
	type InfoListItem,
} from "../../../../molecules";
import {
	renderString,
	type ComponentRenderReact,
	type RenderReactPropValue,
} from "../../../../render-react";

export type FlowSummaryItem = InfoListItem;

type Props = {
	label: string;
	title: string;
	items: readonly FlowSummaryItem[];
};

export function FlowSummaryCard({ label, title, items }: Props) {
	return <InfoSection label={label} title={title} items={items} />;
}

export const flowSummaryCardRenderReact: ComponentRenderReact = ({ node }) => (
	<FlowSummaryCard
		label={renderString(node.props?.label) ?? ""}
		title={renderString(node.props?.title) ?? ""}
		items={renderInfoListItems(node.props?.items)}
	/>
);

function renderInfoListItems(
	value: RenderReactPropValue | undefined,
): readonly InfoListItem[] {
	if (!Array.isArray(value)) return [];
	return value.flatMap((item) => {
		if (!item || typeof item !== "object" || Array.isArray(item)) return [];
		const id = renderString(item.id);
		const title = renderString(item.title);
		if (!id || !title) return [];
		return [
			{
				id,
				title,
				sub: renderString(item.sub) ?? "",
				trailingLabel: renderString(item.trailingLabel),
				mediaLabel: renderString(item.mediaLabel),
			},
		];
	});
}
