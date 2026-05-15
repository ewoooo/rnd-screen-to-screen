import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button";
import { Text } from "../text";
import type { FooterProps, FooterType } from "./Footer.types";
import { footerVariants } from "./footer.variants";

function resolveFooterType(type: FooterType | undefined, action: ReactNode): FooterType {
	return type ?? (action ? "02" : "01");
}

export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
	{
		button,
		buttonLabel,
		children,
		className,
		onButtonClick,
		text,
		type,
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "footer",
		"data-figma-property-type": dataFigmaType,
		...props
	},
	ref,
) {
	const content = children ?? text;
	const defaultButton = buttonLabel ? (
		<Button fullWidth onClick={onButtonClick}>
			{buttonLabel}
		</Button>
	) : null;
	const action = button ?? defaultButton;
	const resolvedType = resolveFooterType(type, action);
	const shouldRenderAction = resolvedType === "02" && action;

	return (
		<footer
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-type={dataFigmaType ?? resolvedType}
			data-type={resolvedType}
			className={cn(footerVariants({ type: resolvedType }), className)}
			{...props}
		>
			{content ? (
				<Text
					as="p"
					className="footer__text"
					data-figma-render="slot"
					data-figma-property-name="text"
					variant="bodySubtle"
				>
					{content}
				</Text>
			) : null}
			{shouldRenderAction ? (
				<div
					className="footer__action"
					data-figma-render="slot"
					data-figma-property-name="button"
				>
					{action}
				</div>
			) : null}
		</footer>
	);
});
