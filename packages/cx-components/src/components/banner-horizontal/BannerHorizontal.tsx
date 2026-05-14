import {
	createElement,
	type ElementType,
	forwardRef,
	isValidElement,
	type KeyboardEventHandler,
} from "react";
import { cn } from "../../lib/cn";
import { Indicator } from "../indicator";
import { Text } from "../text";
import type { BannerHorizontalProps } from "./BannerHorizontal.types";
import { bannerHorizontalVariants } from "./banner-horizontal.variants";

const DEFAULT_INDICATOR_COUNT = 6;
const DEFAULT_ACTIVE_INDEX = 0;

const boolAttr = (value: boolean) => (value ? "true" : "false");

function renderMedia(image: BannerHorizontalProps["image"]) {
	if (!image) {
		return null;
	}

	if (typeof image === "string") {
		return <img src={image} alt="" />;
	}

	if (isValidElement(image)) {
		return image;
	}

	return image;
}

export const BannerHorizontal = forwardRef<HTMLElement, BannerHorizontalProps>(
	function BannerHorizontal(
		{
			activeIndex = DEFAULT_ACTIVE_INDEX,
			ariaLabel,
			className,
			description,
			href,
			image,
			indicator = true,
			indicatorCount = DEFAULT_INDICATOR_COUNT,
			onClick,
			onKeyDown,
			role,
			tabIndex,
			title,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "banner-horizontal",
			"data-figma-property-indicator": dataFigmaIndicator,
			...props
		},
		ref,
	) {
		const Root: ElementType = href ? "a" : "div";
		const media = renderMedia(image);
		const isClickableDiv = !href && Boolean(onClick);
		const isInteractive = Boolean(href || onClick);
		const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
			onKeyDown?.(event);

			if (event.defaultPrevented || !isClickableDiv) {
				return;
			}

			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				event.currentTarget.click();
			}
		};

		return createElement(
			Root,
			{
				ref,
				...props,
				href,
				onClick,
				onKeyDown: isClickableDiv ? handleKeyDown : onKeyDown,
				role: isClickableDiv ? (role ?? "button") : role,
				tabIndex: isClickableDiv ? (tabIndex ?? 0) : tabIndex,
				"aria-label": ariaLabel,
				"data-figma-render": dataFigmaRender,
				"data-figma-component-id": dataFigmaComponentId,
				"data-figma-property-indicator":
					dataFigmaIndicator ?? boolAttr(indicator),
				"data-interactive": isInteractive ? "true" : undefined,
				className: cn(bannerHorizontalVariants(), className),
			},
			<>
				<div className="banner-horizontal__surface">
					<div
						className="banner-horizontal__text-stack"
						data-figma-render="slot"
						data-figma-property-name="text"
					>
						<Text
							as="strong"
							className="banner-horizontal__title"
							data-figma-render="slot"
							data-figma-property-name="title"
							variant="label"
						>
							{title}
						</Text>
						<Text
							as="p"
							className="banner-horizontal__description"
							data-figma-render="slot"
							data-figma-property-name="description"
							variant="caption"
						>
							{description}
						</Text>
					</div>
					{media ? (
						<div
							className="banner-horizontal__media"
							data-figma-render="slot"
							data-figma-property-name="image"
						>
							{media}
						</div>
					) : null}
				</div>
				{indicator ? (
					<Indicator
						activeIndex={activeIndex}
						className="banner-horizontal__indicator"
						count={indicatorCount}
					/>
				) : null}
			</>,
		);
	},
);
