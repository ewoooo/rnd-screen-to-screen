"use client";

import { FlowNotice } from "@pxds/pxds-components/shared/global";
import type { NoticeSectionProps } from "./NoticeSection.config";

export function MembershipNoticeSection({
	badge,
	text,
	action,
	tone,
}: NoticeSectionProps) {
	return <FlowNotice badge={badge} text={text} action={action} tone={tone} />;
}
