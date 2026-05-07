import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcSimpleDormancyAuthScreen } from "./_sdui-renderer";

export default function NcSimpleDormancyAuthPage() {
	return (
		<NcSimpleDormancyAuthScreen
			spec={activeRenderableScreenSpecs["nc-simple-dormancy-auth"]}
		/>
	);
}
