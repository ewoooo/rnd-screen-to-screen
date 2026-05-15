import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { sectionItemVariants } from "./section-item.variants";

export type SectionItemFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-type"?: "default-20" | "card-0";
	"data-figma-property-contents"?: "slot";
};

type NativeSectionItemProps = ComponentPropsWithoutRef<"div">;

export type SectionItemProps = Omit<NativeSectionItemProps, "children"> &
	VariantProps<typeof sectionItemVariants> &
	SectionItemFigmaBridgeProps & {
		children?: ReactNode;
		type?: NonNullable<
			NonNullable<VariantProps<typeof sectionItemVariants>["variant"]>
		>;
	};
