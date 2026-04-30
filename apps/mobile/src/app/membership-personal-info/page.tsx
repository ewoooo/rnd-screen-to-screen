import { activeRenderableScreenSpecs } from "@screen/screens";

import { MembershipPersonalInfoScreen } from "./_screen";

export default function MembershipPersonalInfoPage() {
	return (
		<MembershipPersonalInfoScreen
			spec={activeRenderableScreenSpecs["membership-personal-info"]}
		/>
	);
}
