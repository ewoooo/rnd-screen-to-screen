import { activeRenderableScreenSpecs } from "@/screens";

import { NcFullJoinCompleteScreen } from "./_sdui-renderer";

export default function NcFullJoinCompletePage() {
	return (
		<NcFullJoinCompleteScreen
			spec={activeRenderableScreenSpecs["nc-full-join-complete"]}
		/>
	);
}
