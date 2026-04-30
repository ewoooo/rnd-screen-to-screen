"use client";

import { TextButton } from "@wanteddev/wds";
import { IconChevronRight } from "@wanteddev/wds-icon";

// synthesized atom/link (C8) → WDS TextButton 매핑
// Source: data/binding/overrides/link.json
export function LinkPilot({
	text,
	variant = "primary",
	size = "small",
	trailingIcon = false,
	href,
	onClick,
}: {
	text: string;
	variant?: "primary" | "assistive";
	size?: "small" | "medium";
	trailingIcon?: boolean;
	href?: string;
	onClick?: () => void;
}) {
	const trailing = trailingIcon ? (
		<IconChevronRight width={16} height={16} />
	) : undefined;

	if (href) {
		return (
			<TextButton
				as="a"
				href={href}
				color={variant}
				size={size}
				trailingContent={trailing}
			>
				{text}
			</TextButton>
		);
	}
	return (
		<TextButton
			color={variant}
			size={size}
			trailingContent={trailing}
			onClick={onClick}
		>
			{text}
		</TextButton>
	);
}
