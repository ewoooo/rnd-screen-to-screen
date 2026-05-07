import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcFullDormancyAuthScreen } from "./_sdui-renderer";

export default function NcFullDormancyAuthPage() {
	return (
		<NcFullDormancyAuthScreen
			spec={activeRenderableScreenSpecs["nc-full-dormancy-auth"]}
		/>
	);
}
