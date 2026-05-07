import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcSimpleRejoinBlockedScreen } from "./_sdui-renderer";

export default function NcSimpleRejoinBlockedPage() {
	return (
		<NcSimpleRejoinBlockedScreen
			spec={activeRenderableScreenSpecs["nc-simple-rejoin-blocked"]}
		/>
	);
}
