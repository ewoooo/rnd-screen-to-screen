import type { VariantProps } from "class-variance-authority";
import type {
	ComponentPropsWithoutRef,
	KeyboardEvent,
	ReactNode,
} from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { underlineTabVariants } from "./underline-tab.variants";

export type UnderlineTabState = "01" | "02";

export type UnderlineTabItem = {
	value: string;
	label: ReactNode;
	disabled?: boolean;
};

export type UnderlineTabFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-state"?: UnderlineTabState;
};

type NativeUnderlineTabProps = ComponentPropsWithoutRef<"div">;

export type UnderlineTabProps = Omit<
	NativeUnderlineTabProps,
	"children" | "defaultValue" | "onChange" | "onKeyDown"
> &
	Omit<VariantProps<typeof underlineTabVariants>, "state"> &
	UnderlineTabFigmaBridgeProps & {
		state?: UnderlineTabState;
		items: [UnderlineTabItem, UnderlineTabItem];
		value?: string;
		defaultValue?: string;
		onValueChange?: (value: string) => void;
		ariaLabel?: string;
		onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
	};
