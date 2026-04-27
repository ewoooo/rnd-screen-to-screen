import {
	Hero,
	InfoBox,
	MethodCard,
	PayContent,
	PaySection,
	StepBar,
	StickyCTA,
	SubLabel,
	ThinDivider,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { paymentMethodRegisterV2MockupMock as mock, type PaymentMethodOption } from "./_mock";

export default function PaymentMethodRegisterV2MockupPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<Hero title={mock.heroTitle} sub={mock.heroSub} />
				<RankSection
					label={mock.primary.label}
					mark={mock.primary.mark}
					required
					options={mock.primary.options}
					selectedId={mock.primary.selectedId}
				/>
				<ThinDivider />
				<RankSection
					label={mock.secondary.label}
					mark={mock.secondary.mark}
					options={mock.secondary.options}
					selectedId={mock.secondary.selectedId}
				/>
				<InfoBox title={mock.infoBox.title} bullets={mock.infoBox.bullets} />
			</PayContent>
		</DetailShell>
	);
}

function RankSection({
	label,
	mark,
	required,
	options,
	selectedId,
}: {
	label: string;
	mark: string;
	required?: boolean;
	options: readonly PaymentMethodOption[];
	selectedId: string | null;
}) {
	return (
		<PaySection>
			<SubLabel text={label} mark={mark} required={required} />
			<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
				{options.map((opt) => (
					<MethodCard
						key={opt.id}
						emoji={opt.emoji}
						
						name={opt.name}
						sub={opt.disabled ? opt.disabledReason ?? opt.sub : opt.sub}
						selected={opt.id === selectedId}
						disabled={opt.disabled}
					/>
				))}
			</div>
		</PaySection>
	);
}
