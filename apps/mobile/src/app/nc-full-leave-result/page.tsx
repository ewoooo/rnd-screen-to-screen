import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcFullLeaveResultScreen } from "./_sdui-renderer";

export default function NcFullLeaveResultPage() {
	return (
		<NcFullLeaveResultScreen
			spec={activeRenderableScreenSpecs["nc-full-leave-result"]}
		/>
	);
}
