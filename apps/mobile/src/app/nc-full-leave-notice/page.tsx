import { activeRenderableScreenSpecs } from "@/screens";

import { NcFullLeaveNoticeScreen } from "./_sdui-renderer";

export default function NcFullLeaveNoticePage() {
	return (
		<NcFullLeaveNoticeScreen
			spec={activeRenderableScreenSpecs["nc-full-leave-notice"]}
		/>
	);
}
