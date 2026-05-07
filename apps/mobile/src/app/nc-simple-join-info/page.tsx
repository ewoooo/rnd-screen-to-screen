import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcSimpleJoinInfoScreen } from "./_sdui-renderer";

export default function NcSimpleJoinInfoPage() {
	return (
		<NcSimpleJoinInfoScreen
			spec={activeRenderableScreenSpecs["nc-simple-join-info"]}
		/>
	);
}
