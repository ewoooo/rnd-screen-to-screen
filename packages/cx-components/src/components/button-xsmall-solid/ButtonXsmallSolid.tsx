import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button";
import { Icon } from "../icon";
import type { ButtonXsmallSolidProps } from "./ButtonXsmallSolid.types";
import { buttonXsmallSolidVariants } from "./button-xsmall-solid.variants";

export const ButtonXsmallSolid = forwardRef<
	HTMLButtonElement,
	ButtonXsmallSolidProps
>(function ButtonXsmallSolid(
	{
		children,
		className,
		disabled = false,
		icon,
		state = "active",
		type = "button",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "button-xsmall-solid",
		"data-figma-property-state": dataFigmaState,
		...props
	},
	ref,
) {
	const resolvedState = disabled || state === "disabled" ? "disabled" : "active";
	const isDisabled = resolvedState === "disabled";
	const figmaState = isDisabled ? "disabled" : (dataFigmaState ?? resolvedState);
	const trailingIcon =
		icon === false || isDisabled
			? null
			: (icon ?? <Icon type="download" size={12} color="on-brand" />);

	return (
		<Button
			ref={ref}
			type={type}
			variant="primary"
			size="small"
			disabled={isDisabled}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-state={figmaState}
			data-figma-property-size="xsmall"
			data-state={resolvedState}
			className={cn(
				buttonXsmallSolidVariants({ state: resolvedState }),
				className,
			)}
			{...props}
		>
			<span className="cx-button-xsmall-solid__label">{children}</span>
			{trailingIcon ? (
				<span
					aria-hidden="true"
					className="cx-button-xsmall-solid__icon"
					data-figma-render="primitive"
				>
					{trailingIcon}
				</span>
			) : null}
		</Button>
	);
});
