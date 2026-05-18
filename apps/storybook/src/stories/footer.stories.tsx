import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "@pxds/cx-components/components/footer";

const meta = {
	title: "Components/layout/Footer",
	component: Footer,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"보조 카피와 선택적 액션 버튼을 담는 모바일 content footer. type은 button 유무에 따라 자동 결정된다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/footer",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "inline-radio",
			options: ["01", "02"],
		},
		text: { control: "text" },
		buttonLabel: { control: "text" },
	},
	args: {
		text: "가입 전 안내사항을 확인해 주세요.",
	},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Type01TextOnly: Story = {
	args: {
		type: "01",
		text: "가입 전 안내사항을 확인해 주세요.",
	},
};

export const Type02WithButton: Story = {
	args: {
		type: "02",
		text: "신청 내용을 다시 확인해 주세요.",
		buttonLabel: "확인",
	},
};
