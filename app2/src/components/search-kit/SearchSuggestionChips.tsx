import { CardContent, Chip, Typography } from "@wanteddev/wds";

import { Surface } from "@/components/patterns";

type Props = {
	label: string;
	items: readonly string[];
};

export function SearchSuggestionChips({ label, items }: Props) {
	return (
		<Surface density="compact">
			<CardContent style={{ gap: "var(--spacing-12)" }}>
				<Typography variant="caption1" weight="bold" color="semantic.label.neutral">
					{label}
				</Typography>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: "var(--spacing-8)",
					}}
				>
					{items.map((item) => (
						<Chip key={item} size="small" variant="outlined">
							{item}
						</Chip>
					))}
				</div>
			</CardContent>
		</Surface>
	);
}
