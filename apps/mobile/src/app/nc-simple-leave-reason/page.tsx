import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcSimpleLeaveReasonScreen } from "./_sdui-renderer";

export default function NcSimpleLeaveReasonPage() {
	return (
		<NcSimpleLeaveReasonScreen
			spec={activeRenderableScreenSpecs["nc-simple-leave-reason"]}
		/>
	);
}
