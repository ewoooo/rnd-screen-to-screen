"use client";

import {
	Card,
	CardCaption,
	CardContent,
	CardTitle,
	Chip,
	IconButton,
	Typography,
} from "@wanteddev/wds";
import { IconPlus } from "@wanteddev/wds-icon";

// Figma card-horizontal-product (C4) → WDS Card 매핑
// Source: data/binding/overrides/card-horizontal-product.json
export function CardHorizontalProductPilot({
	thumbnailSrc,
	brand = "brand-name",
	title = "어드민 지정 타이틀 텍스트 최대 두 줄까지 노출됩니다",
	info = "23%",
	price = "29,900원",
	month = "/1개월",
	ctaLabel = "보러가기",
	showCta = true,
	showAdd = true,
	onAdd,
	onClick,
}: {
	thumbnailSrc?: string;
	brand?: string;
	title?: string;
	info?: string;
	price?: string;
	month?: string;
	ctaLabel?: string;
	showCta?: boolean;
	showAdd?: boolean;
	onAdd?: () => void;
	onClick?: () => void;
}) {
	return (
		<Card
			platform="mobile"
			flexDirection="row"
			gap={16}
			width={310}
			flexShrink={0}
			onClick={onClick}
		>
			<div
				style={{
					position: "relative",
					width: 80,
					height: 80,
					flexShrink: 0,
				}}
			>
				<div
					style={{
						width: 80,
						height: 80,
						borderRadius: 16,
						backgroundColor:
							"var(--semantic-background-elevated-alternative, #f2f2f2)",
						backgroundImage: thumbnailSrc
							? `url(${thumbnailSrc})`
							: undefined,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
					aria-label={title}
				/>
				{showAdd && (
					<div style={{ position: "absolute", left: 52, top: 52 }}>
						<IconButton
							variant="solid"
							size="small"
							onClick={(e) => {
								e.stopPropagation();
								onAdd?.();
							}}
						>
							<IconPlus width={16} height={16} />
						</IconButton>
					</div>
				)}
			</div>

			<CardContent
				flexDirection="column"
				gap={10}
				sx={{ flex: 1, minWidth: 0 }}
			>
				<CardCaption variant="caption1" weight="medium">
					{brand}
				</CardCaption>
				<CardTitle
					variant="body2"
					weight="bold"
					sx={{
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
					}}
				>
					{title}
				</CardTitle>
				<Typography
					variant="label1"
					weight="bold"
					sx={{ fontSize: 14, lineHeight: "20px", letterSpacing: "-0.05em" }}
				>
					<span
						style={{ color: "var(--semantic-text-accent-violet)" }}
					>
						{info}{" "}
					</span>
					<span>{price}</span>
					<span style={{ fontSize: 12, fontWeight: 400 }}>{month}</span>
				</Typography>
				{showCta && (
					<Chip size="small" variant="outlined">
						{ctaLabel}
					</Chip>
				)}
			</CardContent>
		</Card>
	);
}
