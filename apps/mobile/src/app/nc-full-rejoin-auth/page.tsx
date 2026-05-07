import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcFullRejoinAuthScreen } from "./_sdui-renderer";

export default function NcFullRejoinAuthPage() {
	return (
		<NcFullRejoinAuthScreen
			spec={activeRenderableScreenSpecs["nc-full-rejoin-auth"]}
		/>
	);
}
