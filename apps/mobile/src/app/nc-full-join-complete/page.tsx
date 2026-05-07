import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcFullJoinCompleteScreen } from "./_sdui-renderer";

export default function NcFullJoinCompletePage() {
	return (
		<NcFullJoinCompleteScreen
			spec={activeRenderableScreenSpecs["nc-full-join-complete"]}
		/>
	);
}
