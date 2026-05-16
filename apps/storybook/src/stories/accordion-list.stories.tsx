import type { Meta, StoryObj } from "@storybook/react-vite";
import { AccordionList } from "@pxds/cx-components/components/accordion-list";

const SAMPLE_ITEMS = [
	{
		id: "payment-method",
		title: "[T우주] 결제수단을 변경할 수 있나요?",
		content: "결제수단 변경 안내를 표시합니다.",
	},
	{
		id: "membership",
		title: "[T우주] 멤버십 혜택을 확인할 수 있나요?",
		content: "멤버십 혜택 안내를 표시합니다.",
	},
	{
		id: "cancel",
		title: "[T우주] 구독을 해지할 수 있나요?",
		content: "구독 해지 절차를 안내합니다.",
	},
];

const meta = {
	title: "Components/layout/AccordionList",
	component: AccordionList,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"여러 개의 Accordion을 content divider로 구분해 렌더링하는 compound list.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/accordion-list",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		allowMultiple: { control: "boolean" },
		showTrailingDivider: { control: "boolean" },
	},
	args: {
		items: SAMPLE_ITEMS,
		defaultOpenIds: [],
		allowMultiple: true,
		showTrailingDivider: true,
	},
} satisfies Meta<typeof AccordionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithOpenItem: Story = {
	args: {
		defaultOpenIds: ["payment-method"],
	},
};

export const SingleOpenOnly: Story = {
	args: {
		allowMultiple: false,
		defaultOpenIds: ["membership"],
	},
};

export const WithLeftText: Story = {
	args: {
		items: SAMPLE_ITEMS.map((item, index) => ({
			...item,
			leftText: String(index + 1).padStart(2, "0"),
		})),
		defaultOpenIds: ["payment-method"],
	},
};
