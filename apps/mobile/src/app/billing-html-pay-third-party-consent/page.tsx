import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingPayThirdPartyConsentScreen } from "./_sdui-renderer";

export default function BillingPayThirdPartyConsentPage() {
	return (
		<BillingPayThirdPartyConsentScreen
			spec={activeRenderableScreenSpecs["billing-html-pay-third-party-consent"]}
		/>
	);
}
