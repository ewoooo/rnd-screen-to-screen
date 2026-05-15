import type { VariantProps } from "class-variance-authority";
import type {
	ComponentPropsWithoutRef,
	KeyboardEvent,
	ReactNode,
} from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { tabVariants } from "./tab.variants";

export type TabItemOption = {
	value: string;
	label: ReactNode;
	disabled?: boolean;
};

export type TabFigmaBridgeProps = FigmaBridgeAttributes;

type NativeTabProps = ComponentPropsWithoutRef<"div">;

export type TabProps = Omit<
	NativeTabProps,
	"children" | "defaultValue" | "onChange" | "onKeyDown"
> &
	VariantProps<typeof tabVariants> &
	TabFigmaBridgeProps & {
		items: readonly TabItemOption[];
		value?: string;
		defaultValue?: string;
		onValueChange?: (value: string) => void;
		ariaLabel?: string;
		onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
	};
