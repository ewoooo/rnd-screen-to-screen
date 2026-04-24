"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import { IconChevronDown, IconChevronUp } from "@wanteddev/wds-icon";

// Figma accordion (molecule, 304 wide, 3 variant) → raw div + Chevron
// Source: data/binding/overrides/accordion.json
export type AccordionOption = {
	label: string;
	condition?: string;
	disabled?: boolean;
};

export function AccordionPilot({
	state = "close",
	type = "2",
	header = "option type",
	options = [
		{ label: "option-name" },
		{ label: "option-name", disabled: true, condition: "품절" },
		{ label: "option-name" },
		{ label: "option-name" },
	],
	footerOption,
	onToggle,
}: {
	state?: "open" | "close";
	type?: "1" | "2";
	header?: string;
	options?: readonly AccordionOption[];
	footerOption?: AccordionOption;
	onToggle?: () => void;
}) {
	const isOpen = state === "open";
	const Chevron = isOpen ? IconChevronUp : IconChevronDown;

	return (
		<div
			style={{
				width: 304,
				border: "1px solid #b2b2b2",
				borderRadius: 16,
				overflow: "hidden",
				background: "#ffffff",
			}}
		>
			<button
				type="button"
				onClick={onToggle}
				style={{
					width: "100%",
					height: 42,
					padding: "0 20px",
					background: "#f2f2f2",
					border: "none",
					cursor: onToggle ? "pointer" : "default",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Typography variant="caption1" weight="medium">
					{header}
				</Typography>
				<Chevron width={14} height={14} />
			</button>

			{isOpen &&
				options.map((opt, i) => (
					<FlexBox
						key={i}
						flexDirection="row"
						alignItems="center"
						justifyContent="space-between"
						sx={{ width: "100%", height: 34, padding: "0 20px", background: "#ffffff" }}
					>
						<Typography
							variant="caption1"
							weight="medium"
							sx={{ color: opt.disabled ? "#b2b2b2" : "#1a1a1a" }}
						>
							{opt.label}
						</Typography>
						{opt.condition && (
							<Typography
								variant="caption1"
								weight="medium"
								sx={{ color: opt.disabled ? "#b2b2b2" : "#666" }}
							>
								{opt.condition}
							</Typography>
						)}
					</FlexBox>
				))}

			{isOpen && type === "2" && footerOption && (
				<FlexBox
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					sx={{
						width: "100%",
						height: 42,
						padding: "0 20px",
						background: "#ffffff",
						borderTop: "1px solid #f2f2f2",
					}}
				>
					<Typography variant="caption1" weight="medium" sx={{ color: "#666" }}>
						{footerOption.label}
					</Typography>
				</FlexBox>
			)}

			{!isOpen && type === "2" && (
				<FlexBox
					flexDirection="row"
					alignItems="center"
					sx={{ width: "100%", height: 42, padding: "0 20px", background: "#f2f2f2" }}
				>
					<Typography variant="caption1" weight="medium" sx={{ color: "#666" }}>
						option type
					</Typography>
				</FlexBox>
			)}
		</div>
	);
}
