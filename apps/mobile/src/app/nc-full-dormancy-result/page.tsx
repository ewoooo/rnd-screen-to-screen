import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcFullDormancyResultScreen } from "./_sdui-renderer";

export default function NcFullDormancyResultPage() {
	return (
		<NcFullDormancyResultScreen
			spec={activeRenderableScreenSpecs["nc-full-dormancy-result"]}
		/>
	);
}
