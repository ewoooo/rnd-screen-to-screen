import { forwardRef, isValidElement } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "../badge";
import { Icon } from "../icon";
import type { BadgeIconProps } from "./BadgeIcon.types";
import { badgeIconVariants } from "./badge-icon.variants";

function renderIcon({
	icon,
	iconType,
}: Pick<BadgeIconProps, "icon" | "iconType">) {
	if (icon) {
		if (isValidElement(icon)) {
			return (
				<span className="badge-icon__icon" data-figma-render="slot">
					{icon}
				</span>
			);
		}

		return icon;
	}

	if (!iconType) {
		return null;
	}

	return (
		<Icon
			aria-hidden="true"
			className="badge-icon__icon"
			size={40}
			type={iconType}
		/>
	);
}

function renderBadge({
	badge,
	badgeText,
	badgeType,
}: Pick<BadgeIconProps, "badge" | "badgeText" | "badgeType">) {
	if (badge) {
		if (isValidElement(badge)) {
			return (
				<span className="badge-icon__badge" data-figma-render="slot">
					{badge}
				</span>
			);
		}

		return badge;
	}

	if (!badgeText) {
		return null;
	}

	return (
		<Badge
			className="badge-icon__badge"
			data-figma-render="primitive"
			text={badgeText}
			type={badgeType}
		/>
	);
}

export const BadgeIcon = forwardRef<HTMLSpanElement, BadgeIconProps>(
	function BadgeIcon(
		{
			badge,
			badgeText,
			badgeType,
			className,
			icon,
			iconType,
			showSubtext,
			subtext,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId,
			"data-figma-property-subtext": dataFigmaSubtext,
			...props
		},
		ref,
	) {
		const resolvedShowSubtext = showSubtext ?? Boolean(subtext);
		const resolvedSubtext = resolvedShowSubtext ? "on" : "off";
		const resolvedComponentId =
			dataFigmaComponentId ??
			(dataFigmaRender === "component" ? "badge-icon" : undefined);

		return (
			<span
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={resolvedComponentId}
				data-figma-property-subtext={dataFigmaSubtext ?? resolvedSubtext}
				data-subtext={resolvedSubtext}
				className={cn(
					badgeIconVariants({ subtext: resolvedShowSubtext }),
					className,
				)}
				{...props}
			>
				<span className="badge-icon__visual" data-figma-render="ignore">
					{renderIcon({ icon, iconType })}
					{renderBadge({ badge, badgeText, badgeType })}
				</span>
				{resolvedShowSubtext ? (
					<span
						className="badge-icon__subtext"
						data-figma-render="slot"
						data-figma-property-name="subtext"
					>
						{subtext}
					</span>
				) : null}
			</span>
		);
	},
);
