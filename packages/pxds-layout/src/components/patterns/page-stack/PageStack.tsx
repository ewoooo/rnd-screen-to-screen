import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactNode,
} from "react";
import { Box, Slot } from "../../primitives";

const cn = (...values: Array<string | false | null | undefined>) =>
	values.filter(Boolean).join(" ");

type DataAttributes = {
	[key: `data-${string}`]: string | number | boolean | undefined;
};

type PageStackRootProps = Omit<
	ComponentPropsWithoutRef<"section">,
	"children"
> &
	DataAttributes & {
		children?: ReactNode;
	};

type PageStackPartProps = Omit<ComponentPropsWithoutRef<"div">, "children"> &
	DataAttributes & {
		children?: ReactNode;
	};

const PageStackRoot = forwardRef<HTMLElement, PageStackRootProps>(
	function PageStackRoot({ children, className, ...props }, ref) {
		return (
			<Box
				as="section"
				ref={ref}
				data-figma-render="layout"
				data-figma-component-id="page-stack"
				data-figma-layout-kind="pattern"
				data-figma-layout-layer="section"
				data-pxds-pattern="page-stack"
				className={cn("pxds-page-stack", className)}
				{...props}
			>
				{children}
			</Box>
		);
	},
);

const PageStackTitle = forwardRef<HTMLDivElement, PageStackPartProps>(
	function PageStackTitle({ children, className, ...props }, ref) {
		return (
			<Slot
				ref={ref}
				data-figma-render="slot"
				data-figma-layout-kind="pattern"
				data-figma-layout-layer="slot"
				data-figma-layout-slot="title"
				data-pxds-pattern-part="title"
				className={cn("pxds-page-stack__title", className)}
				name="title"
				{...props}
			>
				{children}
			</Slot>
		);
	},
);

const PageStackSlot = forwardRef<HTMLDivElement, PageStackPartProps>(
	function PageStackSlot({ children, className, ...props }, ref) {
		return (
			<Slot
				ref={ref}
				data-figma-render="slot"
				data-figma-layout-kind="pattern"
				data-figma-layout-layer="slot"
				data-figma-layout-slot="content"
				data-pxds-pattern-part="slot"
				className={cn("pxds-page-stack__slot", className)}
				name="content"
				{...props}
			>
				{children}
			</Slot>
		);
	},
);

const PageStackItem = forwardRef<HTMLDivElement, PageStackPartProps>(
	function PageStackItem({ children, className, ...props }, ref) {
		return (
			<Box
				ref={ref}
				data-figma-render="layout"
				data-figma-component-id="page-stack-item"
				data-figma-layout-kind="pattern"
				data-figma-layout-layer="content"
				data-pxds-pattern-part="item"
				className={cn("pxds-page-stack__item", className)}
				{...props}
			>
				{children}
			</Box>
		);
	},
);

const PageStackInner = forwardRef<HTMLDivElement, PageStackPartProps>(
	function PageStackInner({ children, className, ...props }, ref) {
		return (
			<Box
				ref={ref}
				data-figma-render="layout"
				data-figma-component-id="page-stack-inner"
				data-figma-layout-kind="pattern"
				data-figma-layout-layer="content"
				data-pxds-pattern-part="inner"
				className={cn("pxds-page-stack__inner", className)}
				{...props}
			>
				{children}
			</Box>
		);
	},
);

export const PageStack = Object.assign(PageStackRoot, {
	Title: PageStackTitle,
	Slot: PageStackSlot,
	Item: PageStackItem,
	Inner: PageStackInner,
});

export type {
	PageStackPartProps,
	PageStackRootProps,
};
