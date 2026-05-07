import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcFullDormancyLoginScreen } from "./_sdui-renderer";

export default function NcFullDormancyLoginPage() {
	return (
		<NcFullDormancyLoginScreen
			spec={activeRenderableScreenSpecs["nc-full-dormancy-login"]}
		/>
	);
}
