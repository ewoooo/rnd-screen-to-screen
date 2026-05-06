import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcFullJoinTermsScreen } from "./_sdui-renderer";

export default function NcFullJoinTermsPage() {
	return (
		<NcFullJoinTermsScreen
			spec={activeRenderableScreenSpecs["nc-full-join-terms"]}
		/>
	);
}
