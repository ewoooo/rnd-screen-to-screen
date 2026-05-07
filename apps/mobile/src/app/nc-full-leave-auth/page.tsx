import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcFullLeaveAuthScreen } from "./_sdui-renderer";

export default function NcFullLeaveAuthPage() {
	return (
		<NcFullLeaveAuthScreen
			spec={activeRenderableScreenSpecs["nc-full-leave-auth"]}
		/>
	);
}
