import type { ComponentPropsWithoutRef } from "react";
import type { SectionDividerThickness } from "./section-divider.variants";

export type SectionDividerProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children"
> & {
	thickness?: SectionDividerThickness;
};
