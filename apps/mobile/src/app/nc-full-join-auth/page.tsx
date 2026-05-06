import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcFullJoinAuthScreen } from "./_sdui-renderer";

export default function NcFullJoinAuthPage() {
	return (
		<NcFullJoinAuthScreen
			spec={activeRenderableScreenSpecs["nc-full-join-auth"]}
		/>
	);
}
