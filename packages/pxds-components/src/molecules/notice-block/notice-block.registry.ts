export const noticeBlockRegistryEntry = {
	id: "notice-block",
	name: "NoticeBlock",
	layer: "molecule",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/molecules/notice-block",
	group: "feedback",
	status: "active",
	createdAt: "2026-04-30",
	composedOf: [
		"wds-card",
		"wds-content-badge",
		"wds-button",
		"text-block",
		"layout-primitives",
	],
} as const;
