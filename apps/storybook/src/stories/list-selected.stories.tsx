import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListSelected } from "@pxds/cx-components/components/list-selected";

const meta = {
	title: "Components/selection/ListSelected",
	component: ListSelected,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Selected list row. 선행 RadioButton 또는 Checkbox, 주 라벨, 선택적 sub text, 선택적 ListSelectedRightItem을 합성합니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/list-selected",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["radio", "checkbox"],
			description: "Figma variant axis.",
		},
		label: {
			control: { type: "text" },
			description: "Main row label.",
		},
		subText: {
			control: { type: "text" },
			description: "Optional secondary trailing text.",
		},
		showSubText: {
			control: { type: "boolean" },
			description: "Controls the sub-text slot.",
		},
		checked: {
			control: { type: "boolean" },
			description: "Passed to the leading control.",
		},
		disabled: {
			control: { type: "boolean" },
			description: "Passed to the control and default right item.",
		},
		showListSelectedRightItem: {
			control: { type: "boolean" },
			description: "Controls the right-item slot.",
		},
		onChange: {
			action: "change",
			description: "Control checked-state callback.",
		},
		className: {
			control: { type: "text" },
		},
	},
	args: {
		type: "radio",
		label: "텍스트",
		subText: "-9,900원",
		showSubText: true,
		checked: true,
		disabled: false,
		showListSelectedRightItem: true,
		rightItem: { type: "buttonXsmallSolid", label: "받기" },
	},
} satisfies Meta<typeof ListSelected>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checkbox: Story = {
	args: {
		type: "checkbox",
	},
};

export const WithoutRightItem: Story = {
	args: {
		showListSelectedRightItem: false,
		rightItem: null,
	},
};

export const WithoutSubText: Story = {
	args: {
		showSubText: false,
		subText: undefined,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
