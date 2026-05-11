import { activeRenderableScreenSpecs } from "@/screens";

import { NcSimpleLeaveAuthScreen } from "./_sdui-renderer";

export default function NcSimpleLeaveAuthPage() {
	return (
		<NcSimpleLeaveAuthScreen
			spec={activeRenderableScreenSpecs["nc-simple-leave-auth"]}
		/>
	);
}
