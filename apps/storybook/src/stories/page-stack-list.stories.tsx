import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageStackList } from "@pxds/cx-components/components/page-stack-list";

const meta = {
	title: "Components/layout/PageStackList",
	component: PageStackList,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"List page의 title/content slot을 감싸는 layout wrapper. 시각 표현은 children에 위임한다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/page-stack-list",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		showTitle: { control: "boolean" },
		title: { control: "text" },
	},
	args: {
		title: "타이틀",
		children: "콘텐츠 영역",
	},
} satisfies Meta<typeof PageStackList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutTitle: Story = {
	args: {
		title: undefined,
		showTitle: false,
		children: "타이틀 없이 콘텐츠만 표시",
	},
};

export const ExplicitShowTitle: Story = {
	args: {
		title: "공지사항",
		showTitle: true,
		children: "공지사항 리스트가 여기에 들어갑니다.",
	},
};
