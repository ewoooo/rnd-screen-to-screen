import { activeRenderableScreenSpecs } from "@/screens";

import { NcSimpleRejoinInfoScreen } from "./_sdui-renderer";

export default function NcSimpleRejoinInfoPage() {
	return (
		<NcSimpleRejoinInfoScreen
			spec={activeRenderableScreenSpecs["nc-simple-rejoin-info"]}
		/>
	);
}
