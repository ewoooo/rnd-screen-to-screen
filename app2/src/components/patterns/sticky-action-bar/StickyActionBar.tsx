import { Button, Card, IconButton, Typography } from "@wanteddev/wds";
import type { ReactNode } from "react";

type Props = {
	eyebrow: string;
	title: string;
	secondaryAction: string;
	primaryAction: string;
	icon?: ReactNode;
	bottomOffset?: number;
};

export function StickyActionBar({
	eyebrow,
	title,
	secondaryAction,
	primaryAction,
	icon,
	bottomOffset = 76,
}: Props) {
	return (
		<div
			style={{
				position: "absolute",
				left: 0,
				right: 0,
				bottom: bottomOffset,
				zIndex: 13,
				padding: "0 var(--spacing-12) var(--spacing-10)",
				background:
					"linear-gradient(to top, rgba(255,255,255,0.96), rgba(255,255,255,0))",
			}}
		>
			<Card
				platform="mobile"
				width="100%"
				style={{
					padding: "var(--spacing-12)",
					borderRadius: 20,
					border: "1px solid var(--semantic-line-solid-alternative)",
					boxShadow: "0 8px 24px rgba(0, 0, 0, 0.10)",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-10)",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							gap: "var(--spacing-12)",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "var(--spacing-2)",
								minWidth: 0,
							}}
						>
							<Typography variant="caption1" weight="bold" color="semantic.primary.normal">
								{eyebrow}
							</Typography>
							<Typography variant="headline1" weight="bold" noWrap>
								{title}
							</Typography>
						</div>
						{icon ? (
							<IconButton variant="outlined" size="small" color="semantic.label.normal">
								{icon}
							</IconButton>
						) : null}
					</div>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "96px 1fr",
							gap: "var(--spacing-8)",
						}}
					>
						<Button size="large" variant="outlined" color="assistive" fullWidth>
							{secondaryAction}
						</Button>
						<Button size="large" variant="solid" color="primary" fullWidth>
							{primaryAction}
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
}
