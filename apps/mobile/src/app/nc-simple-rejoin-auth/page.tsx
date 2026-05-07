import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcSimpleRejoinAuthScreen } from "./_sdui-renderer";

export default function NcSimpleRejoinAuthPage() {
	return (
		<NcSimpleRejoinAuthScreen
			spec={activeRenderableScreenSpecs["nc-simple-rejoin-auth"]}
		/>
	);
}
