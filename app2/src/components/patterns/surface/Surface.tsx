import { Card } from "@wanteddev/wds";
import type { CSSProperties, ReactNode } from "react";

type Tone = "default" | "muted";
type Density = "compact" | "comfortable";

type Props = {
	children: ReactNode;
	tone?: Tone;
	density?: Density;
	gap?: number;
	style?: CSSProperties;
};

const toneStyle: Record<Tone, CSSProperties> = {
	default: {
		background: "var(--semantic-background-normal-normal)",
	},
	muted: {
		background: "var(--semantic-background-normal-alternative)",
	},
};

const densityStyle: Record<Density, CSSProperties> = {
	compact: {
		padding: "var(--spacing-16) var(--spacing-20)",
	},
	comfortable: {
		padding: "var(--spacing-20)",
	},
};

export function Surface({
	children,
	tone = "default",
	density = "comfortable",
	gap,
	style,
}: Props) {
	return (
		<Card
			platform="mobile"
			width="100%"
			style={{
				...toneStyle[tone],
				...densityStyle[density],
				...(gap !== undefined ? { gap: `var(--spacing-${gap})` } : null),
				borderRadius: 20,
				border: "1px solid var(--semantic-line-solid-alternative)",
				...style,
			}}
		>
			{children}
		</Card>
	);
}
