import { activeRenderableScreenSpecs } from "@screen/screens";

import { MembershipLeaveReasonScreen } from "./_screen";

export default function MembershipLeaveReasonPage() {
	return (
		<MembershipLeaveReasonScreen
			spec={activeRenderableScreenSpecs["membership-leave-reason"]}
		/>
	);
}
