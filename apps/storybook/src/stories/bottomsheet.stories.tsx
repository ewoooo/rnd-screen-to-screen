import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bottomsheet } from "@pxds/cx-components/components/bottomsheet";

const meta = {
	title: "Components/layout/Bottomsheet",
	component: Bottomsheet,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"@pxds/cx-layout의 BottomSheet 런타임 위에 조립되는 cx-components wrapper. 핸들, 타이틀, 콘텐츠, action button 슬롯을 제공합니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/bottomsheet",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		open: {
			control: { type: "boolean" },
			description: "Controlled open state.",
		},
		defaultOpen: {
			control: { type: "boolean" },
			description: "Initial uncontrolled open state.",
		},
		actionButton: {
			control: { type: "radio" },
			options: ["on", "off"],
			description: "Action button visibility.",
		},
		showTitleBottomSheet: {
			control: { type: "boolean" },
			description: "Title slot visibility.",
		},
		handle: {
			control: { type: "boolean" },
			description: "Handle visibility.",
		},
		title: {
			control: { type: "text" },
			description: "Title content used by the default TitleBottomSheet.",
		},
		className: {
			control: { type: "text" },
		},
	},
	args: {
		defaultOpen: true,
		actionButton: "on",
		showTitleBottomSheet: true,
		handle: true,
		title: "타이틀",
		actions: [{ label: "확인" }],
		content: "바텀시트 콘텐츠 영역입니다.",
	},
} satisfies Meta<typeof Bottomsheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ActionButtonOff: Story = {
	args: {
		actionButton: "off",
	},
};

export const TitleOff: Story = {
	args: {
		showTitleBottomSheet: false,
	},
};

export const HandleOff: Story = {
	args: {
		handle: false,
	},
};
