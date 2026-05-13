import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import { Text } from "../text";
import type { AppBarProps } from "./AppBar.types";
import { appBarVariants } from "./app-bar.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

export const AppBar = forwardRef<HTMLElement, AppBarProps>(function AppBar(
	{
		className,
		leftIcon,
		leftLabel = "뒤로가기",
		logo,
		onLeftClick,
		rightItems,
		showLeftItem = false,
		showLogo = false,
		showRightItem = false,
		showTitle,
		title,
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "app-bar",
		"data-figma-property-left-item": dataFigmaLeftItem,
		"data-figma-property-right-item": dataFigmaRightItem,
		"data-figma-property-title": dataFigmaTitle,
		"data-figma-property-logo": dataFigmaLogo,
	},
	ref,
) {
	const shouldShowTitle = showTitle ?? Boolean(title);
	const shouldShowLeading = showLeftItem || (!showLogo && shouldShowTitle);
	const resolvedLeftIcon = leftIcon ?? (
		<Icon type="arrow-left" size={24} color="primary" />
	);
	const resolvedRightItems =
		rightItems && rightItems.length > 0
			? rightItems
			: [<Icon key="shop" type="shop" size={24} />];

	return (
		<header
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-left-item={
				dataFigmaLeftItem ?? boolAttr(showLeftItem)
			}
			data-figma-property-right-item={
				dataFigmaRightItem ?? boolAttr(showRightItem)
			}
			data-figma-property-title={dataFigmaTitle ?? boolAttr(shouldShowTitle)}
			data-figma-property-logo={dataFigmaLogo ?? boolAttr(showLogo)}
			data-left-item={boolAttr(showLeftItem)}
			data-right-item={boolAttr(showRightItem)}
			data-title={boolAttr(shouldShowTitle)}
			data-logo={boolAttr(showLogo)}
			className={cn(
				appBarVariants({
					leftItem: showLeftItem,
					logo: showLogo,
					rightItem: showRightItem,
					title: shouldShowTitle,
				}),
				className,
			)}
		>
			{showLogo ? (
				<div className="cx-app-bar__logo">{logo}</div>
			) : shouldShowLeading ? (
				<div
					className="cx-app-bar__title-group"
					data-figma-render="slot"
					data-figma-property-name="title"
				>
					{showLeftItem ? (
						<IconButton aria-label={leftLabel} onClick={onLeftClick}>
							{resolvedLeftIcon}
						</IconButton>
					) : null}
					{shouldShowTitle && title ? (
						<Text
							as="div"
							variant="listTitle"
							className="cx-app-bar__title"
							data-figma-render="primitive"
						>
							{title}
						</Text>
					) : null}
				</div>
			) : null}
			{showRightItem ? (
				<div
					className="cx-app-bar__right"
					data-figma-render="slot"
					data-figma-property-name="right-item"
				>
					{resolvedRightItems.map((item, index) => (
						<IconButton
							// biome-ignore lint/suspicious/noArrayIndexKey: slot order is the only stable identity here.
							key={index}
							aria-label={`앱바 오른쪽 액션 ${index + 1}`}
						>
							{item}
						</IconButton>
					))}
				</div>
			) : null}
		</header>
	);
});
