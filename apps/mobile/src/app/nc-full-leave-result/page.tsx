import { activeRenderableScreenSpecs } from "@/screens";

import { NcFullLeaveResultScreen } from "./_sdui-renderer";

export default function NcFullLeaveResultPage() {
	return (
		<NcFullLeaveResultScreen
			spec={activeRenderableScreenSpecs["nc-full-leave-result"]}
		/>
	);
}
