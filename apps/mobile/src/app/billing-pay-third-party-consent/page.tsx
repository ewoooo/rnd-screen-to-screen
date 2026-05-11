import { activeRenderableScreenSpecs } from "@/screens";

import { BillingPayThirdPartyConsentScreen } from "./_sdui-renderer";

export default function BillingPayThirdPartyConsentPage() {
	return (
		<BillingPayThirdPartyConsentScreen
			spec={activeRenderableScreenSpecs["billing-pay-third-party-consent"]}
		/>
	);
}
