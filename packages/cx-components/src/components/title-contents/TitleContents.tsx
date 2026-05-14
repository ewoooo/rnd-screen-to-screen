import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Text } from "../text";
import {
	TitleContentsRightItem,
	type TitleContentsRightItemPreset,
} from "../title-contents-right-item";
import type { TitleContentsProps } from "./TitleContents.types";
import { titleContentsVariants } from "./title-contents.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

const DEFAULT_RIGHT_ITEM = {
	type: "icon",
	label: "접기",
} satisfies TitleContentsRightItemPreset;

export const TitleContents = forwardRef<HTMLDivElement, TitleContentsProps>(
	function TitleContents(
		{
			className,
			title,
			children,
			showButton = true,
			rightItem = DEFAULT_RIGHT_ITEM,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "title-contents",
			"data-figma-property-show-button": dataFigmaShowButton,
			...props
		},
		ref,
	) {
		const shouldShowButton = showButton;
		const titleContent = title ?? children ?? "타이틀";

		return (
			<div
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-show-button={
					dataFigmaShowButton ?? boolAttr(shouldShowButton)
				}
				data-show-button={boolAttr(shouldShowButton)}
				className={cn(
					titleContentsVariants({ showButton: shouldShowButton }),
					className,
				)}
				{...props}
			>
				<Text
					as="span"
					className="title-contents__title"
					data-figma-render="slot"
					data-figma-property-name="title"
					variant="label"
				>
					{titleContent}
				</Text>
				{shouldShowButton ? (
					<TitleContentsRightItem
						className="title-contents__right-item"
						{...rightItem}
					/>
				) : null}
			</div>
		);
	},
);
