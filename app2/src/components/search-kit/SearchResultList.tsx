import { CardContent, CardTitle, Typography } from "@wanteddev/wds";

import { InfoList, Surface, type InfoListItem } from "@/components/patterns";

type ResultItem = {
	id: string;
	title: string;
	sub: string;
	pill: string;
};

type Props = {
	label: string;
	title: string;
	countText: string;
	items: readonly ResultItem[];
};

export function SearchResultList({ label, title, countText, items }: Props) {
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
					<div
						style={{
							display: "flex",
							alignItems: "baseline",
							justifyContent: "space-between",
							gap: "var(--spacing-12)",
						}}
					>
						<CardTitle variant="headline1" weight="bold">
							{title}
						</CardTitle>
						<Typography
							variant="caption1"
							weight="bold"
							color="semantic.label.alternative"
						>
							{countText}
						</Typography>
					</div>
				</div>
				<InfoList items={listItems} />
			</CardContent>
		</Surface>
	);
}
