import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcSimpleRejoinCompleteScreen } from "./_sdui-renderer";

export default function NcSimpleRejoinCompletePage() {
	return (
		<NcSimpleRejoinCompleteScreen
			spec={activeRenderableScreenSpecs["nc-simple-rejoin-complete"]}
		/>
	);
}
