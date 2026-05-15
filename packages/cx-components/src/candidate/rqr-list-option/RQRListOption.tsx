import { forwardRef, useId } from "react";
import { Badge } from "../../components/badge";
import { checkboxVariants } from "../../components/checkbox";
import { radioButtonVariants } from "../../components/radio-button";
import { Text } from "../../components/text";
import { cn } from "../../lib/cn";
import type { RQRListOptionProps } from "./RQRListOption.types";
import { rqrListOptionVariants } from "./rqr-list-option.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

export const RQRListOption = forwardRef<HTMLLabelElement, RQRListOptionProps>(
	function RQRListOption(
		{
			badgeText,
			badgeType = "blue",
			checked = false,
			className,
			description,
			disabled = false,
			name,
			onCheckedChange,
			title,
			trailing,
			type = "radio",
			value,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "rqr-list-option",
			"data-figma-property-type": dataFigmaType,
			"data-figma-property-checked": dataFigmaChecked,
			"data-figma-property-disabled": dataFigmaDisabled,
			"data-figma-property-description": dataFigmaDescription,
			"data-figma-property-trailing": dataFigmaTrailing,
			...props
		},
		ref,
	) {
		const inputId = useId();
		const resolvedType = type ?? "radio";
		const hasDescription =
			description !== undefined && description !== null && description !== false;
		const hasTrailing =
			trailing !== undefined ||
			(badgeText !== undefined && badgeText !== null && badgeText !== false);

		return (
			<label
				ref={ref}
				htmlFor={inputId}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-type={dataFigmaType ?? resolvedType}
				data-figma-property-checked={dataFigmaChecked ?? boolAttr(checked)}
				data-figma-property-disabled={dataFigmaDisabled ?? boolAttr(disabled)}
				data-figma-property-description={
					dataFigmaDescription ?? boolAttr(hasDescription)
				}
				data-figma-property-trailing={dataFigmaTrailing ?? boolAttr(hasTrailing)}
				data-type={resolvedType}
				data-disabled={disabled ? "" : undefined}
				className={cn(
					rqrListOptionVariants({
						type: resolvedType,
						description: hasDescription,
						trailing: hasTrailing,
					}),
					className,
				)}
				{...props}
			>
				<input
					id={inputId}
					type={resolvedType}
					checked={checked}
					className={
						resolvedType === "radio"
							? "radio-button__input"
							: "checkbox__input"
					}
					disabled={disabled}
					name={name}
					value={value}
					onChange={(event) => onCheckedChange?.(event.currentTarget.checked)}
					readOnly={onCheckedChange ? undefined : true}
				/>
				<span
					className={cn(
						"rqr-list-option__control",
						resolvedType === "radio"
							? radioButtonVariants({ checked, disabled, text: false })
							: checkboxVariants({ checked, disabled, text: false }),
					)}
					data-figma-render="primitive"
					data-figma-component-id={
						resolvedType === "radio" ? "radio-button" : "checkbox"
					}
					data-figma-property-checked={boolAttr(checked)}
					data-figma-property-text="false"
					data-figma-property-disabled={boolAttr(disabled)}
					data-checked={boolAttr(checked)}
					data-text="false"
					data-disabled={boolAttr(disabled)}
				>
					<span
						className={
							resolvedType === "radio"
								? "radio-button__control"
								: "checkbox__control"
						}
						aria-hidden="true"
					/>
				</span>
				<span className="rqr-list-option__body" data-figma-render="layout">
					<span className="rqr-list-option__title-row" data-figma-render="layout">
						<Text
							as="span"
							className="rqr-list-option__title"
							data-figma-render="slot"
							data-figma-property-name="title"
							variant="listTitle"
						>
							{title}
						</Text>
						{hasTrailing ? (
							<span
								className="rqr-list-option__trailing"
								data-figma-render="slot"
								data-figma-property-name="trailing"
							>
								{trailing ?? (
									<Badge
										text={String(badgeText)}
										type={badgeType}
									/>
								)}
							</span>
						) : null}
					</span>
					{hasDescription ? (
						<Text
							as="span"
							className="rqr-list-option__description"
							data-figma-render="slot"
							data-figma-property-name="description"
							variant="bodySubtle"
						>
							{description}
						</Text>
					) : null}
				</span>
			</label>
		);
	},
);
