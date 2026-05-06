import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcFullRejoinCompleteScreen } from "./_sdui-renderer";

export default function NcFullRejoinCompletePage() {
	return (
		<NcFullRejoinCompleteScreen
			spec={activeRenderableScreenSpecs["nc-full-rejoin-complete"]}
		/>
	);
}
