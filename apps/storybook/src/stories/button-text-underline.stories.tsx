import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonTextUnderline } from "@pxds/cx-components/components/button-text-underline";

const meta = {
	title: "Components/action/ButtonTextUnderline",
	component: ButtonTextUnderline,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"작은 보조 텍스트 액션입니다. Figma 원본의 `ButtonTextUnderline` 노드를 독립 컴포넌트로 매핑합니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/button-text-underline",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		children: { control: "text" },
		disabled: { control: "boolean" },
		asChild: { control: "boolean" },
	},
	args: {
		children: "자세히 보기",
		disabled: false,
		asChild: false,
	},
} satisfies Meta<typeof ButtonTextUnderline>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Detail: Story = {
	args: {
		children: "자세히 보기",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
