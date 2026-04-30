"use client";

import { Card, FlexBox, TextButton, Typography } from "@wanteddev/wds";
import { IconChevronRight } from "@wanteddev/wds-icon";

export type ComCardProductItem = {
	logoSrc?: string;
	name: string;
	info?: string;
	sub?: string;
};

// Figma com-card-product (336×N) — con-title-card best-case 전용 (1~N rows + footer btn)
// Source: data/binding/overrides/com-card-product.json
export function ComCardProductPilot({
	items,
	showBtn = true,
	btnLabel = "전체보기",
	onBtn,
}: {
	items: readonly ComCardProductItem[];
	showBtn?: boolean;
	btnLabel?: string;
	onBtn?: () => void;
}) {
	return (
		<Card
			platform="mobile"
			flexDirection="column"
			alignItems="center"
			width={336}
			flexShrink={0}
			sx={{
				padding: "20px 12px",
				borderRadius: 30,
				background: "white",
				boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
			}}
		>
			<FlexBox flexDirection="column" gap={20} alignItems="center" sx={{ width: "100%" }}>
				<FlexBox flexDirection="column" gap={8} alignItems="center" sx={{ width: "100%" }}>
					{items.map((it, i) => (
						<FlexBox
							key={i}
							flexDirection="row"
							gap={16}
							alignItems="center"
							sx={{ width: "100%", height: 62, padding: "0 12px" }}
						>
							<div
								style={{
									width: 32,
									height: 32,
									borderRadius: 200,
									background: it.logoSrc
										? `url(${it.logoSrc}) center/cover no-repeat`
										: "rgba(0,0,0,0.03)",
									flexShrink: 0,
								}}
							/>
							<FlexBox
								flexDirection="column"
								gap={6}
								sx={{ flex: 1, minWidth: 0 }}
							>
								<Typography
									variant="body1"
									weight="bold"
									sx={{
										color: "#000",
										fontSize: 16,
										lineHeight: "20px",
										maxWidth: 188,
										display: "block",
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
									}}
								>
									{it.name}
								</Typography>
								{(it.info || it.sub) && (
									<FlexBox flexDirection="row" gap={6} alignItems="center">
										{it.info && (
											<Typography
												variant="caption1"
												weight="medium"
												sx={{ color: "#6c6c6c", fontSize: 12, lineHeight: "14px" }}
											>
												{it.info}
											</Typography>
										)}
										{it.info && it.sub && (
											<div
												style={{
													width: 1,
													height: 8,
													background: "#a0a0a0",
													opacity: 0.5,
												}}
											/>
										)}
										{it.sub && (
											<Typography
												variant="caption1"
												weight="medium"
												sx={{ color: "#6c6c6c", fontSize: 12, lineHeight: "14px" }}
											>
												{it.sub}
											</Typography>
										)}
									</FlexBox>
								)}
							</FlexBox>
						</FlexBox>
					))}
				</FlexBox>

				{showBtn && (
					<FlexBox
						flexDirection="column"
						gap={15}
						alignItems="center"
						sx={{ width: "100%", padding: "0 8px" }}
					>
						<div style={{ width: "100%", height: 1, background: "#f6f6f6" }} />
						<TextButton
							color="primary"
							size="small"
							trailingContent={<IconChevronRight width={16} height={16} />}
							onClick={onBtn}
						>
							{btnLabel}
						</TextButton>
					</FlexBox>
				)}
			</FlexBox>
		</Card>
	);
}
