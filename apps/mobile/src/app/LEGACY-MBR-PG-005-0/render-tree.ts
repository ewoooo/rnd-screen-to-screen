import {
	createRenderTree,
	type ScreenRenderTreeDefinition,
} from "../../scripts/compile/render-tree";
import { RENDER_TREE as formSectionTree } from "../../organisms/membership/form-section/render-tree";
import { RENDER_TREE as heroSectionTree } from "../../organisms/membership/hero-section/render-tree";
import { RENDER_TREE as selectableSectionTree } from "../../organisms/membership/selectable-section/render-tree";
import meta from "./meta.json";

const definition = {
	slots: {
		systemHeader: true,
		header: {
			component: "progress-top-bar",
			props: {
				title: "탈퇴 사유",
				leading: "back",
				progress: {
					label: "회원 탈퇴 2/6",
					percent: 33.33,
					showLabel: true,
				},
			},
		},
		content: [
			{
				component: "ogn-membership-hero-section",
				render: heroSectionTree,
				props: {
					titleLines: ["탈퇴하시는 이유가", "무엇인가요?"],
					description: "더 나은 서비스를 위해 알려주세요. (1개 이상 선택)",
				},
			},
			{
				component: "ogn-membership-selectable-section",
				render: selectableSectionTree,
				props: {
					name: "leave-reason",
					selectionMode: "multi",
					items: [
						{ id: "price", title: "가격이 부담돼요" },
						{ id: "rare-use", title: "이용 빈도가 낮아요" },
						{ id: "alt-service", title: "다른 서비스로 옮겨요" },
						{ id: "ux", title: "사용이 불편해요" },
						{ id: "error", title: "오류·결제 문제가 있었어요" },
						{ id: "etc", title: "기타 (직접 입력)" },
					],
				},
			},
			{
				component: "ogn-membership-form-section",
				render: formSectionTree,
				props: {
					fields: [
						{
							id: "free-text",
							label: "자유 의견 (선택)",
							placeholder: "더 자세한 의견이 있다면 알려주세요. (최대 500자)",
							helperText: "0/500자",
						},
					],
				},
			},
		],
		bottom: [
			{
				component: "primary-cta-bar",
				props: {
					primaryLabel: "다음",
					disabled: true,
				},
			},
		],
	},
} as const satisfies ScreenRenderTreeDefinition;

export const RENDER_TREE = createRenderTree(meta, definition);
