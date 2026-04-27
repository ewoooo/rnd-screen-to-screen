import { Placeholder } from "@/components/system";
import { Typography } from "@/components/typography";

import { Card } from "./Card";
import { T_BRAND } from "./tokens";

type Props = {
	label: string;
	digits: string[];
	timerText: string;
};

/**
 * T멤버십 바코드 카드. 혜택/관리/단말기 등 공용.
 * 바코드 자체는 이미지 placeholder (100%×48).
 */
export function BarcodeCard({ label, digits, timerText }: Props) {
	return (
		<Card>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-12)",
				}}
			>
				<Typography variant="section-label">{label}</Typography>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-4)",
					}}
				>
					<Placeholder w="100%" h={48} label="barcode" />
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<div style={{ display: "flex", gap: "var(--spacing-8)" }}>
							{digits.map((d) => (
								<Typography key={d} variant="mono-caption">
									{d}
								</Typography>
							))}
						</div>
						<Typography variant="mono-caption" color={T_BRAND}>
							{timerText}
						</Typography>
					</div>
				</div>
			</div>
		</Card>
	);
}
