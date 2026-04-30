import type { ReactNode } from "react";

import {
	FormErrorMessage,
	FormField as WdsFormField,
	FormLabel,
	FormMessage,
	Typography,
} from "@wanteddev/wds";

type Props = {
	label: string;
	required?: boolean;
	helperText?: string;
	errorText?: string;
	children: ReactNode;
};

export function FormField({
	label,
	required,
	helperText,
	errorText,
	children,
}: Props) {
	return (
		<WdsFormField
			style={{
				display: "grid",
				gap: "var(--spacing-8)",
			}}
		>
			<FormLabel>
				{label}
				{required ? (
					<Typography
						as="span"
						variant="label1"
						weight="bold"
						color="semantic.status.negative"
						// strain: spacing-2 어휘 밖
						style={{ marginLeft: "var(--spacing-2)" }}
					>
						*
					</Typography>
				) : null}
			</FormLabel>
			{children}
			{errorText ? (
				<FormErrorMessage variant="caption1" color="semantic.status.negative">
					{errorText}
				</FormErrorMessage>
			) : helperText ? (
				<FormMessage variant="caption1" color="semantic.label.alternative">
					{helperText}
				</FormMessage>
			) : null}
		</WdsFormField>
	);
}
