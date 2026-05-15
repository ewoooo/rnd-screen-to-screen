import type { ReactNode } from "react";

import {
	FormErrorMessage,
	FormLabel,
	FormMessage,
	Typography,
	FormField as WdsFormField,
} from "../../core";
import {
	type ComponentRenderReact,
	renderBoolean,
	renderString,
} from "../../render-react";
import { TextField } from "../form-controls";

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

export const formFieldRenderReact: ComponentRenderReact = ({
	node,
	renderChildren,
}) => {
	const children = renderChildren();
	const placeholder = renderString(node.props?.placeholder);

	return (
		<FormField
			label={renderString(node.props?.label) ?? ""}
			required={renderBoolean(node.props?.required, false)}
			helperText={renderString(node.props?.helperText)}
			errorText={renderString(node.props?.errorText)}
		>
			{children ?? <TextField value="" placeholder={placeholder} readOnly />}
		</FormField>
	);
};
