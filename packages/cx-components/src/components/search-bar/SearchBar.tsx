import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconType } from "../icon";
import { IconButton } from "../icon-button";
import { Text } from "../text";
import type { SearchBarProps } from "./SearchBar.types";
import { type SearchBarType, searchBarVariants } from "./search-bar.variants";

const LEADING_ICON_BY_TYPE = {
	llm: "ai-search",
	search: "search",
} satisfies Record<SearchBarType, IconType>;

export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
	function SearchBar(
		{
			action,
			className,
			disabled = false,
			leadingIcon,
			onClick,
			placeholder,
			type = "search",
			value,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "search-bar",
			...props
		},
		ref,
	) {
		const resolvedType = type ?? "search";
		const resolvedLeadingIcon = leadingIcon ?? LEADING_ICON_BY_TYPE[resolvedType];
		const hasValue = Boolean(value);
		const displayText = hasValue ? value : placeholder;

		return (
			<div
				{...props}
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-type={resolvedType}
				data-has-value={hasValue ? "true" : "false"}
				data-disabled={disabled ? "" : undefined}
				className={cn(searchBarVariants({ type: resolvedType }), className)}
			>
				<button
					className="search-bar__trigger"
					data-figma-render="primitive"
					disabled={disabled}
					onClick={onClick}
					type="button"
				>
					<Icon
						aria-hidden="true"
						className="search-bar__leading-icon"
						data-figma-render="primitive"
						size={24}
						type={resolvedLeadingIcon}
					/>
					<Text
						as="span"
						className="search-bar__text"
						data-figma-render="primitive"
						variant="body"
					>
						{displayText}
					</Text>
				</button>
				{action ? (
					<IconButton
						aria-label={action.label}
						className="search-bar__action"
						disabled={disabled}
						data-figma-render="primitive"
						onClick={action.onClick}
						size="small"
						variant="plain"
					>
						<Icon
							aria-hidden="true"
							className="search-bar__action-icon"
							data-figma-render="primitive"
							size={24}
							type={action.icon}
						/>
					</IconButton>
				) : null}
			</div>
		);
	},
);
