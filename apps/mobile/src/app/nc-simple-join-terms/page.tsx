import { activeRenderableScreenSpecs } from "@/screens";

import { NcSimpleJoinTermsScreen } from "./_sdui-renderer";

export default function NcSimpleJoinTermsPage() {
	return (
		<NcSimpleJoinTermsScreen
			spec={activeRenderableScreenSpecs["nc-simple-join-terms"]}
		/>
	);
}
