import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcSimpleJoinAuthScreen } from "./_sdui-renderer";

export default function NcSimpleJoinAuthPage() {
	return (
		<NcSimpleJoinAuthScreen
			spec={activeRenderableScreenSpecs["nc-simple-join-auth"]}
		/>
	);
}
