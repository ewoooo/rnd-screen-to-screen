import { cva } from "class-variance-authority";

export const rqrListOptionVariants = cva("rqr-list-option", {
	variants: {
		type: {
			radio: "rqr-list-option--radio",
			checkbox: "rqr-list-option--checkbox",
		},
		description: {
			false: "rqr-list-option--description-off",
			true: "rqr-list-option--description-on",
		},
		trailing: {
			false: "rqr-list-option--trailing-off",
			true: "rqr-list-option--trailing-on",
		},
	},
	defaultVariants: {
		type: "radio",
		description: true,
		trailing: false,
	},
});

export type RQRListOptionType = NonNullable<
	Parameters<typeof rqrListOptionVariants>[0]
>["type"];

export type RQRListOptionTrailingPresence = NonNullable<
	Parameters<typeof rqrListOptionVariants>[0]
>["trailing"];
