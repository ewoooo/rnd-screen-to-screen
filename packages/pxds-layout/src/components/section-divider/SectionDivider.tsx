import { forwardRef } from "react";
import type { SectionDividerProps } from "./SectionDivider.types";
import { sectionDividerVariants } from "./section-divider.variants";

const cn = (...values: Array<string | false | null | undefined>) =>
	values.filter(Boolean).join(" ");

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
				className={cn(sectionDividerVariants({ thickness }), className)}
				{...props}
			/>
		);
	},
);
