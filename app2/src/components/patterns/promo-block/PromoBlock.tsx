import { Button, CardContent, ContentBadge, Typography } from "@wanteddev/wds";

import { MediaBlock } from "../media-block";
import { Surface } from "../surface";

type Props = {
	text: string;
	badge: string;
	action: string;
	mediaLabel: string;
};

export function PromoBlock({ text, badge, action, mediaLabel }: Props) {
	return (
		<Surface tone="muted" density="compact">
			<CardContent
				style={{
					display: "grid",
					gridTemplateColumns: "1fr auto",
					alignItems: "center",
					gap: "var(--spacing-16)",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-8)",
						minWidth: 0,
					}}
				>
					<ContentBadge size="small" color="accent" variant="outlined">
						{badge}
					</ContentBadge>
					<Typography variant="label1" weight="bold">
						{text}
					</Typography>
					<Button size="small" variant="outlined" color="assistive">
						{action}
					</Button>
				</div>
				<MediaBlock width={64} ratio="1:1" alt={mediaLabel} />
			</CardContent>
		</Surface>
	);
}
