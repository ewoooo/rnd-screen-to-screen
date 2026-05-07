import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcFullJoinTermsScreen } from "./_sdui-renderer";

export default function NcFullJoinTermsPage() {
	return (
		<NcFullJoinTermsScreen
			spec={activeRenderableScreenSpecs["nc-full-join-terms"]}
		/>
	);
}
