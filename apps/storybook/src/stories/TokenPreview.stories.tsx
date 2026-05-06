import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Typography } from "@wanteddev/wds";

const semanticColors = [
	["primary.normal", "var(--semantic-primary-normal)"],
	["label.normal", "var(--semantic-label-normal)"],
	["label.alternative", "var(--semantic-label-alternative)"],
	["background.normal.normal", "var(--semantic-background-normal-normal)"],
	[
		"background.normal.alternative",
		"var(--semantic-background-normal-alternative)",
	],
	["surface.page.normal", "var(--semantic-surface-page-normal)"],
];

const spacingTokens = [
	["spacing.4", "var(--spacing-4)"],
	["spacing.8", "var(--spacing-8)"],
	["spacing.12", "var(--spacing-12)"],
	["spacing.16", "var(--spacing-16)"],
	["spacing.24", "var(--spacing-24)"],
	["spacing.32", "var(--spacing-32)"],
];

const meta = {
	title: "Tokens/Preview",
	parameters: {
		layout: "centered",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticColors: Story = {
	render: () => (
		<div className="storybook-token-grid">
			{semanticColors.map(([name, value]) => (
				<div className="storybook-token-row" key={name}>
					<Typography variant="label1" weight="medium">
						{name}
					</Typography>
					<div
						className="storybook-token-swatch"
						style={{ background: value }}
					/>
				</div>
			))}
		</div>
	),
};

export const SpacingScale: Story = {
	render: () => (
		<div className="storybook-token-grid">
			{spacingTokens.map(([name, value]) => (
				<div className="storybook-token-row" key={name}>
					<Typography variant="label1" weight="medium">
						{name}
					</Typography>
					<div className="storybook-spacing-bar" style={{ width: value }} />
				</div>
			))}
		</div>
	),
};
