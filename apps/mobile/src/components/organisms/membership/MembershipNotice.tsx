import { NoticeBlock } from "@/components/molecules";
import { ContentSection } from "@/components/templates/app-screen";

type Props = {
	badge: string;
	text: string;
	action: string;
	tone?: "info" | "warning" | "critical";
};

export function MembershipNotice({ badge, text, action, tone = "info" }: Props) {
	return (
		<ContentSection>
			<NoticeBlock badge={badge} text={text} action={action} tone={tone} />
		</ContentSection>
	);
}
