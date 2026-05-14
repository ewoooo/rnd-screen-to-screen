import { forwardRef, isValidElement } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconType } from "../icon";
import { Text } from "../text";
import type { CalloutProps } from "./Callout.types";
import { calloutVariants } from "./callout.variants";

function renderIcon(icon: CalloutProps["icon"]) {
	if (!icon) {
		return null;
	}

	if (typeof icon === "string") {
		return (
			<Icon
				aria-hidden="true"
				className="callout__icon"
				size={20}
				type={icon as IconType}
			/>
		);
	}

	if (isValidElement(icon)) {
		return <span className="callout__icon">{icon}</span>;
	}

	return icon;
}

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(function Callout(
	{
		children,
		className,
		icon,
		title,
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "callout",
		"data-figma-property-title": dataFigmaTitle,
		...props
	},
	ref,
) {
	const hasTitle = title !== undefined && title !== null && title !== false;

	return (
		<div
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-title={dataFigmaTitle ?? (hasTitle ? "true" : "false")}
			className={cn(calloutVariants(), className)}
			{...props}
		>
			{renderIcon(icon)}
			<div
				className="callout__content"
				data-figma-render="slot"
				data-figma-property-name="content"
			>
				{hasTitle ? (
					<Text
						as="strong"
						className="callout__title"
						data-figma-render="slot"
						data-figma-property-name="title"
						variant="label"
					>
						{title}
					</Text>
				) : null}
				<Text
					as="p"
					className="callout__body"
					data-figma-render="slot"
					data-figma-property-name="description"
					variant="bodySubtle"
				>
					{children}
				</Text>
			</div>
		</div>
	);
});
