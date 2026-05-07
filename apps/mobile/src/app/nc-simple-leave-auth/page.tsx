import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcSimpleLeaveAuthScreen } from "./_sdui-renderer";

export default function NcSimpleLeaveAuthPage() {
	return (
		<NcSimpleLeaveAuthScreen
			spec={activeRenderableScreenSpecs["nc-simple-leave-auth"]}
		/>
	);
}
