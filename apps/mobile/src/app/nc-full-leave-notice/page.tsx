import { activeRenderableScreenSpecs } from "@screen/specs";

import { NcFullLeaveNoticeScreen } from "./_sdui-renderer";

export default function NcFullLeaveNoticePage() {
	return (
		<NcFullLeaveNoticeScreen
			spec={activeRenderableScreenSpecs["nc-full-leave-notice"]}
		/>
	);
}
