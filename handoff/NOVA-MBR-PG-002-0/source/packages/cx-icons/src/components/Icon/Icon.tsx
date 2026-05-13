import type { CSSProperties, HTMLAttributes } from "react";

import {
	getIconFile,
	isRecolorableIconType,
	type IconSize,
	type IconType,
	type RecolorableIconType,
} from "../../registry";

export const iconColors = [
	"primary",
	"secondary",
	"tertiary",
	"disabled",
	"brand",
	"critical",
	"on-brand",
] as const;

export type IconColor = (typeof iconColors)[number];

type IconBaseProps = Omit<
	HTMLAttributes<HTMLElement>,
	"children" | "color"
> & {
	readonly type: IconType;
	readonly size: IconSize;
	readonly alt?: string;
};

type RecolorableIconProps = Omit<IconBaseProps, "type"> & {
	readonly type: RecolorableIconType;
	readonly color?: IconColor;
};

type FixedColorIconProps = IconBaseProps & {
	readonly color?: never;
};

export type IconProps = RecolorableIconProps | FixedColorIconProps;

export function Icon({
	type,
	size,
	color,
	"aria-hidden": ariaHidden,
	"aria-label": ariaLabel,
	alt,
	style,
	...props
}: IconProps) {
	const iconFile = getIconFile(type, size);

	if (!iconFile) {
		return null;
	}

	const accessibleName = ariaLabel ?? alt;
	const isDecorative = accessibleName === undefined || accessibleName === "";

	if (color && isRecolorableIconType(type)) {
		const maskStyle = {
			...style,
			backgroundColor: `var(--semantic-light-color-text-${color})`,
			display: "inline-block",
			height: size,
			maskImage: `url("${iconFile.src}")`,
			maskPosition: "center",
			maskRepeat: "no-repeat",
			maskSize: "contain",
			WebkitMaskImage: `url("${iconFile.src}")`,
			WebkitMaskPosition: "center",
			WebkitMaskRepeat: "no-repeat",
			WebkitMaskSize: "contain",
			width: size,
		} satisfies CSSProperties;

		return (
			<span
				{...props}
				aria-hidden={ariaHidden ?? (isDecorative ? true : undefined)}
				aria-label={accessibleName}
				role="img"
				style={maskStyle}
			/>
		);
	}

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
