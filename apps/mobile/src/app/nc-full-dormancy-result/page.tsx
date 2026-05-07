import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcFullDormancyResultScreen } from "./_sdui-renderer";

export default function NcFullDormancyResultPage() {
	return (
		<NcFullDormancyResultScreen
			spec={activeRenderableScreenSpecs["nc-full-dormancy-result"]}
		/>
	);
}
