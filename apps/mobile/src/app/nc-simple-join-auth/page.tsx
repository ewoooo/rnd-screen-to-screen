import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcSimpleJoinAuthScreen } from "./_sdui-renderer";

export default function NcSimpleJoinAuthPage() {
	return (
		<NcSimpleJoinAuthScreen
			spec={activeRenderableScreenSpecs["nc-simple-join-auth"]}
		/>
	);
}
