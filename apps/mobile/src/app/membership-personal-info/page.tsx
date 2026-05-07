import { activeRenderableScreenSpecs } from "@screen/specs";

import { MembershipPersonalInfoScreen } from "./_screen";

export default function MembershipPersonalInfoPage() {
	return (
		<MembershipPersonalInfoScreen
			spec={activeRenderableScreenSpecs["membership-personal-info"]}
		/>
	);
}
