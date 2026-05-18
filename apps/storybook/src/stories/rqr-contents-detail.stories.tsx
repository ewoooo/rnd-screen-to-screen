import type { Meta, StoryObj } from "@storybook/react-vite";
import { RQRContentsDetail } from "@pxds/cx-components/candidate/rqr-contents-detail";

const meta = {
	title: "Candidate/feedback/RQRContentsDetail",
	component: RQRContentsDetail,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Candidate section pattern that renders a titled detail list of label/value rows via ListText. Optional sub-title precedes the heading.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/candidate/rqr-contents-detail",
		status: "candidate",
	},
	tags: ["autodocs"],
	argTypes: {
		title: { control: "text" },
		subTitle: { control: "text" },
	},
	args: {
		title: "신청 내용 확인",
		rows: [
			{ id: "plan", label: "요금제", value: "5G 시그니처" },
			{ id: "device", label: "기기", value: "갤럭시 S24" },
			{ id: "phone", label: "휴대폰 번호", value: "010-1234-5678" },
		],
	},
} satisfies Meta<typeof RQRContentsDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSubTitle: Story = {
	args: {
		subTitle: "아래 내용으로 신청합니다.",
		title: "신청 내용 확인",
		rows: [
			{ id: "plan", label: "요금제", value: "5G 시그니처" },
			{ id: "device", label: "기기", value: "갤럭시 S24" },
		],
	},
};
