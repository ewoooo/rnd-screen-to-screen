import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactNode,
} from "react";

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
			<section
				ref={ref}
				data-pxds-pattern="page-stack"
				className={cn("pxds-page-stack", className)}
				{...props}
			>
				{children}
			</section>
		);
	},
);

const PageStackTitle = forwardRef<HTMLDivElement, PageStackPartProps>(
	function PageStackTitle({ children, className, ...props }, ref) {
		return (
			<div
				ref={ref}
				data-pxds-pattern-part="title"
				className={cn("pxds-page-stack__title", className)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

const PageStackSlot = forwardRef<HTMLDivElement, PageStackPartProps>(
	function PageStackSlot({ children, className, ...props }, ref) {
		return (
			<div
				ref={ref}
				data-pxds-pattern-part="slot"
				className={cn("pxds-page-stack__slot", className)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

const PageStackItem = forwardRef<HTMLDivElement, PageStackPartProps>(
	function PageStackItem({ children, className, ...props }, ref) {
		return (
			<div
				ref={ref}
				data-pxds-pattern-part="item"
				className={cn("pxds-page-stack__item", className)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

const PageStackInner = forwardRef<HTMLDivElement, PageStackPartProps>(
	function PageStackInner({ children, className, ...props }, ref) {
		return (
			<div
				ref={ref}
				data-pxds-pattern-part="inner"
				className={cn("pxds-page-stack__inner", className)}
				{...props}
			>
				{children}
			</div>
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
