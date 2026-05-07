import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingPayThirdPartyConsentScreen } from "./_sdui-renderer";

export default function BillingPayThirdPartyConsentPage() {
	return (
		<BillingPayThirdPartyConsentScreen
			spec={activeRenderableScreenSpecs["billing-html-pay-third-party-consent"]}
		/>
	);
}
