import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popup } from "@pxds/cx-components/components/popup";

const meta = {
	title: "Components/feedback/Popup",
	component: Popup,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"타이틀, 선택적 sub text, 선택적 contents 슬롯, popup 전용 action을 가진 다이얼로그 surface. overlay/portal/focus trap은 런타임 wrapper의 책임입니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/popup",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		title: {
			control: { type: "text" },
			description: "Popup title.",
		},
		subText: {
			control: { type: "text" },
			description: "Optional sub text below the title.",
		},
		showSubText: {
			control: { type: "boolean" },
			description: "Force sub text visibility.",
		},
		showContents: {
			control: { type: "boolean" },
			description: "Force contents slot visibility.",
		},
		actionOptions: {
			control: { type: "radio" },
			options: ["2Buttons", "1Button"],
			description: "Action layout.",
		},
		className: {
			control: { type: "text" },
		},
	},
	args: {
		title: "타이틀",
		subText: "팝업 sub text 영역입니다.",
		actionOptions: "2Buttons",
		primaryAction: { label: "확인" },
		secondaryAction: { label: "취소" },
	},
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OneButton: Story = {
	args: {
		actionOptions: "1Button",
		primaryAction: undefined,
		secondaryAction: { label: "확인" },
	},
};

export const WithoutSubText: Story = {
	args: {
		subText: undefined,
		showSubText: false,
	},
};

export const WithContents: Story = {
	args: {
		children: "추가 콘텐츠 슬롯에 들어가는 본문입니다.",
	},
};
