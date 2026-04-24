import { Card } from "./Card";
import { Placeholder } from "./Placeholder";
import { MonoCaption, SectionLabel } from "./text";

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
				<SectionLabel>{label}</SectionLabel>
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
								<MonoCaption key={d}>{d}</MonoCaption>
							))}
						</div>
						<MonoCaption brand>{timerText}</MonoCaption>
					</div>
				</div>
			</div>
		</Card>
	);
}
