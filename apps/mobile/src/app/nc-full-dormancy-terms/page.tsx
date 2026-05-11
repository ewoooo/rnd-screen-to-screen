import { activeRenderableScreenSpecs } from "@/screens";

import { NcFullDormancyTermsScreen } from "./_sdui-renderer";

export default function NcFullDormancyTermsPage() {
	return (
		<NcFullDormancyTermsScreen
			spec={activeRenderableScreenSpecs["nc-full-dormancy-terms"]}
		/>
	);
}
