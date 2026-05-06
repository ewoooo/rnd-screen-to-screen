import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcSimpleJoinCompleteScreen } from "./_sdui-renderer";

export default function NcSimpleJoinCompletePage() {
	return (
		<NcSimpleJoinCompleteScreen
			spec={activeRenderableScreenSpecs["nc-simple-join-complete"]}
		/>
	);
}
