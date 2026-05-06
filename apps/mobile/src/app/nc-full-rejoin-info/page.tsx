import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcFullRejoinInfoScreen } from "./_sdui-renderer";

export default function NcFullRejoinInfoPage() {
	return (
		<NcFullRejoinInfoScreen
			spec={activeRenderableScreenSpecs["nc-full-rejoin-info"]}
		/>
	);
}
