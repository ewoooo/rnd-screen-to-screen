import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcFullJoinInfoScreen } from "./_sdui-renderer";

export default function NcFullJoinInfoPage() {
	return (
		<NcFullJoinInfoScreen
			spec={activeRenderableScreenSpecs["nc-full-join-info"]}
		/>
	);
}
