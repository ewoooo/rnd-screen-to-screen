import { CharCountTextarea, CheckList } from "@/components/auth-kit";
import {
	Hero,
	PayContent,
	StepBar,
	StickyCTA,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { withdrawalReasonInputV2KitMock as mock } from "./_mock";

export default function WithdrawalReasonInputV2KitPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<Hero title={mock.heroTitle} sub={mock.heroSub} />
				<CheckList items={mock.reasons} />
				<CharCountTextarea
					label={mock.textarea.label}
					value={mock.textarea.value}
					placeholder={mock.textarea.placeholder}
					max={mock.textarea.max}
				/>
			</PayContent>
		</DetailShell>
	);
}
