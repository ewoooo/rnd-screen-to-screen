import { activeRenderableScreenSpecs } from "@/screens";

import { NcSimpleDormancyResultScreen } from "./_sdui-renderer";

export default function NcSimpleDormancyResultPage() {
	return (
		<NcSimpleDormancyResultScreen
			spec={activeRenderableScreenSpecs["nc-simple-dormancy-result"]}
		/>
	);
}
