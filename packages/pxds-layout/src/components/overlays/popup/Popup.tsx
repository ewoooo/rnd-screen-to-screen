"use client";

import type { CSSProperties } from "react";
import type {
	PopupActionsProps,
	PopupBackdropProps,
	PopupContentProps,
	PopupRootProps,
	PopupTitleProps,
} from "./Popup.types";
import { popupVariants } from "./popup.variants";

function cx(...values: Array<string | false | null | undefined>) {
	return values.filter(Boolean).join(" ");
}

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
				className={cx(popupVariants(), className)}
				data-state={open ? "open" : "closed"}
				{...props}
			>
			{children}
		</div>
	);
}

export function PopupBackdrop({ className, ...props }: PopupBackdropProps) {
	return (
		<div
			aria-hidden="true"
			className={cx("pxds-popup-backdrop", className)}
			{...props}
		/>
	);
}

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

export function PopupTitle({
	as: As = "h2",
	className,
	...props
}: PopupTitleProps) {
	return <As className={cx("pxds-popup-title", className)} {...props} />;
}

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
