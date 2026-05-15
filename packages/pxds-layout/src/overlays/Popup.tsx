"use client";

import type {
	CSSProperties,
	HTMLAttributes,
	ReactNode,
} from "react";

function cx(...values: Array<string | false | null | undefined>) {
	return values.filter(Boolean).join(" ");
}

type PopupRootProps = HTMLAttributes<HTMLDivElement> & {
	open?: boolean;
	forceMount?: boolean;
	children: ReactNode;
};

export function PopupRoot({
	open = true,
	forceMount = false,
	className,
	children,
	...props
}: PopupRootProps) {
	if (!open && !forceMount) return null;

	return (
		<div
			className={cx("pxds-popup-root", className)}
			data-state={open ? "open" : "closed"}
			{...props}
		>
			{children}
		</div>
	);
}

type PopupBackdropProps = HTMLAttributes<HTMLDivElement>;

export function PopupBackdrop({ className, ...props }: PopupBackdropProps) {
	return (
		<div
			aria-hidden="true"
			className={cx("pxds-popup-backdrop", className)}
			{...props}
		/>
	);
}

type PopupContentProps = HTMLAttributes<HTMLDivElement> & {
	width?: CSSProperties["width"];
};

export function PopupContent({
	width,
	className,
	style,
	children,
	...props
}: PopupContentProps) {
	return (
		<div
			aria-modal="true"
			className={cx("pxds-popup-content", className)}
			role="dialog"
			style={{
				...(width ? { "--pxds-popup-width": width } : null),
				...style,
			} as CSSProperties}
			{...props}
		>
			{children}
		</div>
	);
}

type PopupTitleProps = HTMLAttributes<HTMLHeadingElement> & {
	as?: "h1" | "h2" | "h3";
};

export function PopupTitle({
	as: As = "h2",
	className,
	...props
}: PopupTitleProps) {
	return <As className={cx("pxds-popup-title", className)} {...props} />;
}

type PopupActionsProps = HTMLAttributes<HTMLDivElement> & {
	orientation?: "horizontal" | "vertical";
};

export function PopupActions({
	orientation = "horizontal",
	className,
	...props
}: PopupActionsProps) {
	return (
		<div
			className={cx("pxds-popup-actions", className)}
			data-orientation={orientation}
			{...props}
		/>
	);
}
