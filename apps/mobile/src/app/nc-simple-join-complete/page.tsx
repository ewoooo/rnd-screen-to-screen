import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcSimpleJoinCompleteScreen } from "./_sdui-renderer";

export default function NcSimpleJoinCompletePage() {
	return (
		<NcSimpleJoinCompleteScreen
			spec={activeRenderableScreenSpecs["nc-simple-join-complete"]}
		/>
	);
}
