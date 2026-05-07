import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcSimpleDormancyResultScreen } from "./_sdui-renderer";

export default function NcSimpleDormancyResultPage() {
	return (
		<NcSimpleDormancyResultScreen
			spec={activeRenderableScreenSpecs["nc-simple-dormancy-result"]}
		/>
	);
}
