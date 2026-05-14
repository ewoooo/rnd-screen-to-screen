import { cva } from "class-variance-authority";

export const buttonVariants = cva(
	[
		"cx-button relative inline-flex appearance-none items-center justify-center",
		"box-border cursor-pointer select-none whitespace-nowrap no-underline",
		"border border-transparent rounded-[var(--semantic-radius-md)]",
		"font-[family-name:var(--16-semi-font-family)] font-semibold leading-[1.3] tracking-normal",
		"[gap:var(--semantic-spacing-gap-default)]",
		"transition-colors duration-150 ease-in-out",
		"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focused",
		"disabled:pointer-events-none disabled:cursor-not-allowed",
		"aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed",
		"data-disabled:pointer-events-none data-disabled:cursor-not-allowed",
	].join(" "),
	{
		variants: {
			variant: {
				primary:
					"bg-button-primary text-button-fg-primary active:bg-button-primary-pressed",
				secondary:
					"border-button-border-secondary bg-button-secondary text-button-fg-secondary active:bg-button-secondary-pressed",
				disabled:
					"border-transparent bg-button-primary-disabled text-button-fg-primary-disabled",
			},
			size: {
				small:
					"text-13-semi min-h-8 [padding-inline:var(--semantic-spacing-inset-md)]",
				medium:
					"text-14-semi min-h-10 [padding-inline:var(--semantic-spacing-inset-lg)]",
				large:
					"text-16-semi min-h-12 [padding-inline:var(--semantic-spacing-inset-xl)]",
				xlarge:
					"text-16-semi min-h-14 [padding-inline:var(--semantic-spacing-inset-xl)]",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "medium",
		},
	},
);

export type ButtonVariant = NonNullable<
	Parameters<typeof buttonVariants>[0]
>["variant"];
export type ButtonSize = NonNullable<Parameters<typeof buttonVariants>[0]>["size"];
