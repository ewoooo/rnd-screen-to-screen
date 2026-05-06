import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcFullDormancyLoginScreen } from "./_sdui-renderer";

export default function NcFullDormancyLoginPage() {
	return (
		<NcFullDormancyLoginScreen
			spec={activeRenderableScreenSpecs["nc-full-dormancy-login"]}
		/>
	);
}
