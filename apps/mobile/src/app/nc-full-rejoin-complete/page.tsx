import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcFullRejoinCompleteScreen } from "./_sdui-renderer";

export default function NcFullRejoinCompletePage() {
	return (
		<NcFullRejoinCompleteScreen
			spec={activeRenderableScreenSpecs["nc-full-rejoin-complete"]}
		/>
	);
}
