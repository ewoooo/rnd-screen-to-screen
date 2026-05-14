import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { PopupActionButton } from "../popup-action-button";
import { Text } from "../text";
import type { PopupProps } from "./Popup.types";
import { popupVariants } from "./popup.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

export const Popup = forwardRef<HTMLDivElement, PopupProps>(function Popup(
	{
		actionOptions = "2Buttons",
		children,
		className,
		primaryAction,
		secondaryAction,
		showContents,
		showSubText,
		subText,
		title,
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "popup",
		"data-figma-property-contents": dataFigmaContents,
		"data-figma-property-show-contents": dataFigmaShowContents,
		"data-figma-property-show-sub-text": dataFigmaShowSubText,
		...props
	},
	ref,
) {
	const shouldShowSubText = showSubText ?? Boolean(subText);
	const shouldShowContents = showContents ?? Boolean(children);

	return (
		<div
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-contents={
				dataFigmaContents ?? (shouldShowContents ? "children" : undefined)
			}
			data-figma-property-show-contents={
				dataFigmaShowContents ?? boolAttr(shouldShowContents)
			}
			data-figma-property-show-sub-text={
				dataFigmaShowSubText ?? boolAttr(shouldShowSubText)
			}
			data-show-contents={boolAttr(shouldShowContents)}
			data-show-sub-text={boolAttr(shouldShowSubText)}
			className={cn(
				popupVariants({
					hasContents: shouldShowContents,
					hasSubText: shouldShowSubText,
				}),
				className,
			)}
			{...props}
		>
			<div className="popup__title" data-figma-render="ignore">
				<Text as="h2" className="popup__title-text" variant="sectionTitle">
					{title}
				</Text>
			</div>
			{shouldShowSubText ? (
				<div className="popup__sub-text" data-figma-render="ignore">
					<Text as="p" className="popup__sub-text-value" variant="body">
						{subText}
					</Text>
				</div>
			) : null}
			{shouldShowContents ? (
				<div
					className="popup__contents"
					data-figma-render="slot"
					data-figma-property-name="contents"
				>
					{children}
				</div>
			) : null}
			{actionOptions === "1Button" ? (
				<PopupActionButton
					className="popup__actions"
					options="1Button"
					secondaryAction={secondaryAction}
				/>
			) : (
				<PopupActionButton
					className="popup__actions"
					options="2Buttons"
					primaryAction={primaryAction ?? secondaryAction}
					secondaryAction={secondaryAction}
				/>
			)}
		</div>
	);
});
