import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcFullRejoinInfoScreen } from "./_sdui-renderer";

export default function NcFullRejoinInfoPage() {
	return (
		<NcFullRejoinInfoScreen
			spec={activeRenderableScreenSpecs["nc-full-rejoin-info"]}
		/>
	);
}
