import type { ImgHTMLAttributes } from "react";

import { getIconFile, type IconSize, type IconType } from "./registry";

export type IconProps = Omit<
	ImgHTMLAttributes<HTMLImageElement>,
	"height" | "src" | "width"
> & {
	readonly type: IconType;
	readonly size: IconSize;
};

export function Icon({
	type,
	size,
	"aria-hidden": ariaHidden,
	"aria-label": ariaLabel,
	alt,
	...props
}: IconProps) {
	const iconFile = getIconFile(type, size);

	if (!iconFile) {
		return null;
	}

	const accessibleName = ariaLabel ?? alt;
	const isDecorative = accessibleName === undefined || accessibleName === "";

	return (
		<img
			{...props}
			alt={alt ?? ariaLabel ?? ""}
			aria-hidden={ariaHidden ?? (isDecorative ? true : undefined)}
			aria-label={ariaLabel}
			height={size}
			src={iconFile.src}
			width={size}
		/>
	);
}
