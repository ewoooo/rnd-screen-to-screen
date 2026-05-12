export const sectionMessageJoinCompleteViewFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/mbr-section-message-join-complete-view",
	category: "ogn",
	description: "MBR join completion message and follow-up usage guide.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			itemSpacing: "{spacing.24}",
		},
		children: [
			{
				kind: "group",
				id: "message",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "FIXED",
					width: "FILL",
					paddingTop: "{spacing.24}",
					paddingBottom: "{spacing.24}",
					paddingLeft: "{spacing.16}",
					paddingRight: "{spacing.16}",
					itemSpacing: "{spacing.12}",
				},
				visual: {
					fill: "{color.semantic.background.elevated.alternative}",
					cornerRadius: "{spacing.16}",
				},
				children: [
					{
						kind: "group",
						id: "status-icon",
						layout: {
							mode: "HORIZONTAL",
							primaryAxisSizingMode: "FIXED",
							counterAxisSizingMode: "FIXED",
							primaryAxisAlignItems: "CENTER",
							counterAxisAlignItems: "CENTER",
							width: "24px",
							height: "24px",
						},
						visual: {
							fill: "{color.semantic.status.positive}",
							cornerRadius: "{spacing.12}",
						},
						children: [
							{
								kind: "text",
								id: "check",
								content: "✓",
								textStyle: "{typography.label1.medium}",
								color: "{color.semantic.static.white}",
							},
						],
					},
					{
						kind: "group",
						id: "copy",
						layout: {
							mode: "VERTICAL",
							primaryAxisSizingMode: "AUTO",
							counterAxisSizingMode: "FIXED",
							width: "FILL",
							itemSpacing: "{spacing.8}",
						},
						layoutGrow: 1,
						children: [
							{
								kind: "text",
								id: "title",
								content: "가입이 완료되었습니다",
								textStyle: "{typography.body1.medium}",
								color: "{color.semantic.label.normal}",
								exposeAs: "title",
							},
							{
								kind: "text",
								id: "description",
								content:
									"가입이 정상 처리되었습니다. 일반 회원으로 자동 로그인됩니다.",
								textStyle: "{typography.body1.regular}",
								color: "{color.semantic.label.alternative}",
								autoResize: "HEIGHT",
								exposeAs: "description",
							},
						],
					},
				],
			},
			{
				kind: "group",
				id: "guide",
				layout: {
					mode: "VERTICAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "FIXED",
					width: "FILL",
					itemSpacing: "{spacing.12}",
				},
				children: [
					{
						kind: "text",
						id: "guide-title",
						content: "가입 후 이용 안내",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						exposeAs: "guideTitle",
					},
					{
						kind: "text",
						id: "guide-session",
						content: "· 세션 유효시간 24시간",
						textStyle: "{typography.body2.regular}",
						color: "{color.semantic.label.normal}",
						exposeAs: "sessionGuide",
					},
					{
						kind: "text",
						id: "guide-action",
						content: "· 가입 완료 후 홈으로 이동합니다",
						textStyle: "{typography.body2.regular}",
						color: "{color.semantic.label.normal}",
						exposeAs: "actionGuide",
					},
				],
			},
		],
	},
} as const;
