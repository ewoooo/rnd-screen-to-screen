import { activeRenderableScreenSpecs } from "@/screens";

import { MembershipTermsConsentScreen } from "./_sdui-renderer";

export default function MembershipTermsConsentPage() {
	return (
		<MembershipTermsConsentScreen
			spec={activeRenderableScreenSpecs["membership-terms-consent"]}
		/>
	);
}
