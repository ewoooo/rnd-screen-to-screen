import { activeRenderableScreenSpecs } from "@/screens";

import { NcSimpleDormancyTermsScreen } from "./_sdui-renderer";

export default function NcSimpleDormancyTermsPage() {
	return (
		<NcSimpleDormancyTermsScreen
			spec={activeRenderableScreenSpecs["nc-simple-dormancy-terms"]}
		/>
	);
}
