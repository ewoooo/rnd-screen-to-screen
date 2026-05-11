import { activeRenderableScreenSpecs } from "@/screens";

import { NcSimpleJoinInfoScreen } from "./_sdui-renderer";

export default function NcSimpleJoinInfoPage() {
	return (
		<NcSimpleJoinInfoScreen
			spec={activeRenderableScreenSpecs["nc-simple-join-info"]}
		/>
	);
}
