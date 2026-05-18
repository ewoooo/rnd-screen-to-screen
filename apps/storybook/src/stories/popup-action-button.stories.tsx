import type { Meta, StoryObj } from "@storybook/react-vite";
import { PopupActionButton } from "@pxds/cx-components/components/popup-action-button";

const meta = {
	title: "Components/action/PopupActionButton",
	component: PopupActionButton,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"Popup 내부에서만 쓰는 action area. Figma `Options=2Buttons` / `Options=1Button` 축을 `options` prop으로 정규화합니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/popup-action-button",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		options: {
			control: { type: "radio" },
			options: ["2Buttons", "1Button"],
			description: "Action layout variant.",
		},
		className: {
			control: { type: "text" },
		},
	},
	args: {
		options: "2Buttons",
		primaryAction: { label: "확인" },
		secondaryAction: { label: "취소" },
	},
} satisfies Meta<typeof PopupActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OneButton: Story = {
	args: {
		options: "1Button",
		primaryAction: undefined,
		secondaryAction: { label: "확인" },
	},
};

export const Disabled: Story = {
	args: {
		primaryAction: { label: "확인", disabled: true },
		secondaryAction: { label: "취소" },
	},
};
