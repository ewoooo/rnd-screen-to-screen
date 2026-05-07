import { activeRenderableScreenSpecs } from "@screen/specs";

import { MembershipLeaveImpactScreen } from "./_screen";

export default function MembershipLeaveImpactPage() {
	return (
		<MembershipLeaveImpactScreen
			spec={activeRenderableScreenSpecs["membership-leave-impact"]}
		/>
	);
}
