import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcFullLeaveConfirmScreen } from "./_sdui-renderer";

export default function NcFullLeaveConfirmPage() {
	return (
		<NcFullLeaveConfirmScreen
			spec={activeRenderableScreenSpecs["nc-full-leave-confirm"]}
		/>
	);
}
