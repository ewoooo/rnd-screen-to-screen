import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcSimpleLeaveResultScreen } from "./_sdui-renderer";

export default function NcSimpleLeaveResultPage() {
	return (
		<NcSimpleLeaveResultScreen
			spec={activeRenderableScreenSpecs["nc-simple-leave-result"]}
		/>
	);
}
