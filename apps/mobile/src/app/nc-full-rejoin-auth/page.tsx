import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcFullRejoinAuthScreen } from "./_sdui-renderer";

export default function NcFullRejoinAuthPage() {
	return (
		<NcFullRejoinAuthScreen
			spec={activeRenderableScreenSpecs["nc-full-rejoin-auth"]}
		/>
	);
}
