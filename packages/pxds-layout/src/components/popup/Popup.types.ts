import type {
	CSSProperties,
	HTMLAttributes,
	ReactNode,
} from "react";

export type PopupRootProps = HTMLAttributes<HTMLDivElement> & {
	open?: boolean;
	forceMount?: boolean;
	children: ReactNode;
};

export type PopupBackdropProps = HTMLAttributes<HTMLDivElement>;

export type PopupContentProps = HTMLAttributes<HTMLDivElement> & {
	width?: CSSProperties["width"];
};

export type PopupTitleProps = HTMLAttributes<HTMLHeadingElement> & {
	as?: "h1" | "h2" | "h3";
};

export type PopupActionsProps = HTMLAttributes<HTMLDivElement> & {
	orientation?: "horizontal" | "vertical";
};
