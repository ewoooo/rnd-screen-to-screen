import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcFullLeaveAuthScreen } from "./_sdui-renderer";

export default function NcFullLeaveAuthPage() {
	return (
		<NcFullLeaveAuthScreen
			spec={activeRenderableScreenSpecs["nc-full-leave-auth"]}
		/>
	);
}
