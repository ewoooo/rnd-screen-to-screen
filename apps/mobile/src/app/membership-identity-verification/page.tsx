import { activeRenderableScreenSpecs } from "@screen/specs";

import { MembershipIdentityVerificationScreen } from "./_screen";

export default function MembershipIdentityVerificationPage() {
	return (
		<MembershipIdentityVerificationScreen
			spec={activeRenderableScreenSpecs["membership-identity-verification"]}
		/>
	);
}
