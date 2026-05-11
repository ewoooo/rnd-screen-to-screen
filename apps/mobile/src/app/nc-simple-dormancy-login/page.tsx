import { activeRenderableScreenSpecs } from "@/screens";

import { NcSimpleDormancyLoginScreen } from "./_sdui-renderer";

export default function NcSimpleDormancyLoginPage() {
	return (
		<NcSimpleDormancyLoginScreen
			spec={activeRenderableScreenSpecs["nc-simple-dormancy-login"]}
		/>
	);
}
