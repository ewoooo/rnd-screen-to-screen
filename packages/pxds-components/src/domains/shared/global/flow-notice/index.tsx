import { NoticeBlock } from "../../../../molecules/notice-block";
import { ContentSection } from "@pxds/pxds-layout/app-screen";
import {
	renderString,
	type ComponentRenderReact,
} from "../../../../render-react";

type Props = {
	badge: string;
	text: string;
	action?: string;
	tone?: "info" | "warning" | "critical";
};

export function FlowNotice({ badge, text, action, tone = "info" }: Props) {
	return (
		<ContentSection>
			<NoticeBlock badge={badge} text={text} action={action} tone={tone} />
		</ContentSection>
	);
}

export const flowNoticeRenderReact: ComponentRenderReact = ({ node }) => (
	<FlowNotice
		badge={renderString(node.props?.badge) ?? ""}
		text={renderString(node.props?.text) ?? ""}
		action={renderString(node.props?.action)}
		tone={
			node.props?.tone === "critical" || node.props?.tone === "warning"
				? node.props.tone
				: "info"
		}
	/>
);
