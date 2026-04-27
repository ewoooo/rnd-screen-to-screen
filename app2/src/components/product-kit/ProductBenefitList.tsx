import { CardContent, CardTitle } from "@wanteddev/wds";

import { InfoList, Surface, type InfoListItem } from "@/components/patterns";

type BenefitItem = {
	id: string;
	title: string;
	sub: string;
	pill: string;
};

type Props = {
	label: string;
	title: string;
	items: readonly BenefitItem[];
};

export function ProductBenefitList({ label, title, items }: Props) {
	const listItems: InfoListItem[] = items.map((item) => ({
		id: item.id,
		title: item.title,
		sub: item.sub,
		trailingLabel: item.pill,
		mediaLabel: item.title,
	}));

	return (
		<Surface>
			<CardContent style={{ gap: "var(--spacing-16)" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-4)",
					}}
				>
					<CardTitle variant="caption1" weight="bold" color="semantic.label.neutral">
						{label}
					</CardTitle>
					<CardTitle variant="headline1" weight="bold">
						{title}
					</CardTitle>
				</div>
				<InfoList items={listItems} />
			</CardContent>
		</Surface>
	);
}
