import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcSimpleLeaveResultScreen } from "./_sdui-renderer";

export default function NcSimpleLeaveResultPage() {
	return (
		<NcSimpleLeaveResultScreen
			spec={activeRenderableScreenSpecs["nc-simple-leave-result"]}
		/>
	);
}
