import { Chip, Thumbnail, Typography } from "@wanteddev/wds";

export type InfoListItem = {
	id: string;
	title: string;
	sub: string;
	trailingLabel?: string;
	mediaLabel?: string;
};

type Props = {
	items: readonly InfoListItem[];
	selectedId?: string;
	selectable?: boolean;
};

export function InfoList({ items, selectedId, selectable = false }: Props) {
	return (
		<div role="list" style={{ display: "flex", flexDirection: "column" }}>
			{items.map((item, index) => {
				const selected = selectedId === item.id;
				return (
					<div
						key={item.id}
						role="listitem"
						style={{
							display: "grid",
							gridTemplateColumns: "48px minmax(0, 1fr) auto",
							alignItems: "center",
							gap: "var(--spacing-12)",
							padding: "var(--spacing-12) 0",
							borderBottom:
								index < items.length - 1
									? "1px solid var(--semantic-line-solid-alternative)"
									: undefined,
						}}
					>
						<Thumbnail
							width={48}
							ratio="1:1"
							radius
							border={selectable && selected}
							alt={item.mediaLabel ?? item.title}
						/>
						<div
							style={{
								display: "flex",
								minWidth: 0,
								flexDirection: "column",
								gap: "var(--spacing-4)",
							}}
						>
							<Typography
								variant="label1"
								weight="bold"
								style={{
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								{item.title}
							</Typography>
							<Typography
								variant="caption1"
								weight="bold"
								color="semantic.label.alternative"
								style={{
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								{item.sub}
							</Typography>
						</div>
						{item.trailingLabel ? (
							<Chip
								size="small"
								variant={selected ? "solid" : "outlined"}
								active={selectable && selected}
							>
								{item.trailingLabel}
							</Chip>
						) : (
							<span aria-hidden />
						)}
					</div>
				);
			})}
		</div>
	);
}
