import { type ComponentPropsWithoutRef, forwardRef } from "react";

const cn = (...values: Array<string | false | null | undefined>) =>
	values.filter(Boolean).join(" ");

export type SectionDividerThickness = "section" | "hairline";

export type SectionDividerProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children"
> & {
	thickness?: SectionDividerThickness;
};

export const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
	function SectionDivider(
		{ className, thickness = "section", role = "separator", ...props },
		ref,
	) {
		return (
			<div
				ref={ref}
				role={role}
				data-pxds-pattern="section-divider"
				data-pxds-thickness={thickness}
				className={cn(
					"pxds-section-divider",
					`pxds-section-divider--${thickness}`,
					className,
				)}
				{...props}
			/>
		);
	},
);
