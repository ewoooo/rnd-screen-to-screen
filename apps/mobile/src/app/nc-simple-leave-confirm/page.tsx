import { activeRenderableScreenSpecs } from "@screen/screens";

import { NcSimpleLeaveConfirmScreen } from "./_sdui-renderer";

export default function NcSimpleLeaveConfirmPage() {
	return (
		<NcSimpleLeaveConfirmScreen
			spec={activeRenderableScreenSpecs["nc-simple-leave-confirm"]}
		/>
	);
}
