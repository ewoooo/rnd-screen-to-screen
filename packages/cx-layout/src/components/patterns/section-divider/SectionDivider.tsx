import { forwardRef } from "react";
import { Box } from "../../primitives";
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
			<Box
				ref={ref}
				role={role}
				data-figma-render="layout"
				data-figma-component-id="section-divider"
				data-figma-layout-kind="pattern"
				data-figma-layout-layer="divider"
				data-figma-layout-auto="false"
				data-figma-property-thickness={thickness}
				data-pxds-pattern="section-divider"
				data-pxds-thickness={thickness}
				className={cn(sectionDividerVariants({ thickness }), className)}
				{...props}
			/>
		);
	},
);
