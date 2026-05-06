import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcSimpleDormancyLoginScreen } from "./_sdui-renderer";

export default function NcSimpleDormancyLoginPage() {
	return (
		<NcSimpleDormancyLoginScreen
			spec={activeRenderableScreenSpecs["nc-simple-dormancy-login"]}
		/>
	);
}
