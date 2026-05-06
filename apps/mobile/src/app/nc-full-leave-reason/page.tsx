import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcFullLeaveReasonScreen } from "./_sdui-renderer";

export default function NcFullLeaveReasonPage() {
	return (
		<NcFullLeaveReasonScreen
			spec={activeRenderableScreenSpecs["nc-full-leave-reason"]}
		/>
	);
}
