import { activeRenderableScreenSpecs } from "@screen/screens";

import { MembershipIdentityVerificationScreen } from "./_screen";

export default function MembershipIdentityVerificationPage() {
	return (
		<MembershipIdentityVerificationScreen
			spec={activeRenderableScreenSpecs["membership-identity-verification"]}
		/>
	);
}
