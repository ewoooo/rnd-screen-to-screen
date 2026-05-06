import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcSimpleDormancyAuthScreen } from "./_sdui-renderer";

export default function NcSimpleDormancyAuthPage() {
	return (
		<NcSimpleDormancyAuthScreen
			spec={activeRenderableScreenSpecs["nc-simple-dormancy-auth"]}
		/>
	);
}
