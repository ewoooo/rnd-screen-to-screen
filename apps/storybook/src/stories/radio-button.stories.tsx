import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioButton } from "@pxds/cx-components/components/radio-button";

const meta = {
	title: "Components/selection/RadioButton",
	component: RadioButton,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"단일 radio control. checked, disabled, label 슬롯을 가집니다. RadioGroup composition은 별도 레이어에서 다룹니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/radio-button",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		checked: {
			control: { type: "boolean" },
			description: "Checked state.",
		},
		disabled: {
			control: { type: "boolean" },
			description: "Disabled state.",
		},
		label: {
			control: { type: "text" },
			description: "Optional visible label.",
		},
		name: {
			control: { type: "text" },
			description: "Input name.",
		},
		value: {
			control: { type: "text" },
			description: "Input value.",
		},
		onCheckedChange: {
			action: "checkedChange",
			description: "Change callback.",
		},
		className: {
			control: { type: "text" },
		},
	},
	args: {
		checked: false,
		disabled: false,
		label: "휴대폰 인증",
		name: "auth",
		value: "phone",
	},
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
	args: {
		checked: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const IconOnly: Story = {
	args: {
		label: undefined,
	},
};
