"use client";

import { Button, FlexBox, Typography } from "@wanteddev/wds";

// Figma button-select-product (atom) → WDS Button outlined/solid + title/price 합성
// Source: data/binding/overrides/button-select-product.json
export function ButtonSelectProductPilot({
	title,
	price,
	selected = false,
	disabled = false,
	onClick,
}: {
	title: string;
	price?: string;
	selected?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}) {
	return (
		<Button
			variant={selected ? "solid" : "outlined"}
			color="primary"
			size="medium"
			fullWidth
			disabled={disabled}
			onClick={onClick}
			sx={{ maxWidth: 336, height: 60 }}
		>
			<FlexBox
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				sx={{ width: "100%" }}
			>
				<Typography variant="body2" weight="medium">
					{title}
				</Typography>
				{price && (
					<Typography variant="body2" weight="bold">
						{price}
					</Typography>
				)}
			</FlexBox>
		</Button>
	);
}
