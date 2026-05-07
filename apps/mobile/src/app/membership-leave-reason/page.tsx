import { activeRenderableScreenSpecs } from "@screen/specs";

import { MembershipLeaveReasonScreen } from "./_screen";

export default function MembershipLeaveReasonPage() {
	return (
		<MembershipLeaveReasonScreen
			spec={activeRenderableScreenSpecs["membership-leave-reason"]}
		/>
	);
}
