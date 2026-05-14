import { cva } from "class-variance-authority";

export const popupVariants = cva("popup", {
	variants: {
		hasSubText: {
			true: "popup--with-sub-text",
			false: "popup--without-sub-text",
		},
		hasContents: {
			true: "popup--with-contents",
			false: "popup--without-contents",
		},
	},
	defaultVariants: {
		hasSubText: false,
		hasContents: false,
	},
});

export type PopupVariant = NonNullable<
	Parameters<typeof popupVariants>[0]
>;
