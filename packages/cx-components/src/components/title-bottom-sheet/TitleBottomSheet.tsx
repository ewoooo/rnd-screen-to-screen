import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import type { TitleBottomSheetProps } from "./TitleBottomSheet.types";
import { titleBottomSheetVariants } from "./title-bottom-sheet.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

export const TitleBottomSheet = forwardRef<
	HTMLElement,
	TitleBottomSheetProps
>(function TitleBottomSheet(
	{
		className,
		title = "타이틀",
		subText,
		subText2,
		showTitle = true,
		showTitleText,
		showTitleButton = true,
		showSubText,
		showSubText2,
		onClose,
		closeLabel = "닫기",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "title-bottom-sheet",
		"data-figma-property-show-title-text": dataFigmaShowTitleText,
		"data-figma-property-show-title-button": dataFigmaShowTitleButton,
		"data-figma-property-show-sub-text": dataFigmaShowSubText,
		"data-figma-property-show-sub-text-2": dataFigmaShowSubText2,
		"data-figma-property-show-title": dataFigmaShowTitle,
		...props
	},
	ref,
) {
	const shouldShowTitle = showTitle;
	const shouldShowTitleText =
		shouldShowTitle && (showTitleText ?? Boolean(title));
	const shouldShowTitleButton = shouldShowTitle && showTitleButton;
	const shouldShowSubText = showSubText ?? Boolean(subText);
	const shouldShowSubText2 =
		shouldShowSubText && (showSubText2 ?? Boolean(subText2));

	const closeIcon = <Icon type="close" size={24} color="primary" />;

	return (
		<header
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-show-title-text={
				dataFigmaShowTitleText ?? boolAttr(shouldShowTitleText)
			}
			data-figma-property-show-title-button={
				dataFigmaShowTitleButton ?? boolAttr(shouldShowTitleButton)
			}
			data-figma-property-show-sub-text={
				dataFigmaShowSubText ?? boolAttr(shouldShowSubText)
			}
			data-figma-property-show-sub-text-2={
				dataFigmaShowSubText2 ?? boolAttr(shouldShowSubText2)
			}
			data-figma-property-show-title={
				dataFigmaShowTitle ?? boolAttr(shouldShowTitle)
			}
			data-show-title={boolAttr(shouldShowTitle)}
			data-show-title-text={boolAttr(shouldShowTitleText)}
			data-show-title-button={boolAttr(shouldShowTitleButton)}
			data-show-sub-text={boolAttr(shouldShowSubText)}
			data-show-sub-text-2={boolAttr(shouldShowSubText2)}
			className={cn(
				titleBottomSheetVariants({
					showTitle: shouldShowTitle,
					showTitleText: shouldShowTitleText,
					showTitleButton: shouldShowTitleButton,
					showSubText: shouldShowSubText,
					showSubText2: shouldShowSubText2,
				}),
				className,
			)}
			{...props}
		>
			{shouldShowTitle ? (
				<div
					className="title-bottom-sheet__title"
					data-figma-render="ignore"
				>
					{shouldShowTitleText ? (
						<div
							className="title-bottom-sheet__title-text"
							data-figma-render="slot"
							data-figma-property-name="title"
						>
							{title}
						</div>
					) : null}
					{shouldShowTitleButton ? (
						onClose ? (
							<button
								aria-label={closeLabel}
								className="title-bottom-sheet__close-button"
								data-figma-render="primitive"
								onClick={onClose}
								type="button"
							>
								{closeIcon}
							</button>
						) : (
							<span
								aria-hidden="true"
								className="title-bottom-sheet__close-icon"
								data-figma-render="primitive"
							>
								{closeIcon}
							</span>
						)
					) : null}
				</div>
			) : null}
			{shouldShowSubText ? (
				<div
					className="title-bottom-sheet__sub-text"
					data-figma-render="slot"
					data-figma-property-name="sub-text"
				>
					<span className="title-bottom-sheet__sub-text-primary">
						{subText}
					</span>
					{shouldShowSubText2 ? (
						<span className="title-bottom-sheet__sub-text-emphasis">
							{subText2}
						</span>
					) : null}
				</div>
			) : null}
		</header>
	);
});
