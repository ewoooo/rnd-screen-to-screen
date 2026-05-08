import type { ReactNode } from "react";
import { Divider, Placeholder } from "@pxds/pxds-components/feedback";
import {
	FilterTabs,
	FormField,
	MediaBadge,
	MediaBlock,
	QueryBar,
	SelectField,
} from "@pxds/pxds-components/patterns";
import { TextBlock } from "@pxds/pxds-components/typography";

export type ComponentPreviewExample = {
	componentId: string;
	description: string;
	render: () => ReactNode;
};

export const componentPreviewExamples = [
	{
		componentId: "text-block",
		description: "Typography primitive with PXDS text role mapping.",
		render: () => (
			<div className="grid gap-2">
				<TextBlock variant="sectionLabel" text="PXDS TYPOGRAPHY" />
				<TextBlock variant="headline" text="멤버십 혜택을 한눈에 확인하세요" />
				<TextBlock
					variant="bodySubtle"
					text="모바일 화면에서 사용하는 줄바꿈과 강조 규칙을 함께 확인합니다."
					color="semantic.label.alternative"
				/>
			</div>
		),
	},
	{
		componentId: "divider",
		description: "Inset-aware feedback line.",
		render: () => (
			<div className="grid w-64 gap-4">
				<TextBlock variant="caption" text="상단 콘텐츠" />
				<Divider />
				<TextBlock variant="caption" text="하단 콘텐츠" />
			</div>
		),
	},
	{
		componentId: "placeholder",
		description: "WDS Thumbnail based empty media surface.",
		render: () => <Placeholder w={104} h={104} label="IMG" />,
	},
	{
		componentId: "media-block",
		description: "Reusable media surface with optional badge slot.",
		render: () => (
			<div className="w-56">
				<MediaBlock
					alt="preview media"
					ratio="4:3"
					badge={<MediaBadge text="NEW" />}
					border
				/>
			</div>
		),
	},
	{
		componentId: "query-bar",
		description: "Read-only search/query input pattern.",
		render: () => (
			<div className="w-80 max-w-full">
				<QueryBar value="디자인 시스템" />
			</div>
		),
	},
	{
		componentId: "filter-tabs",
		description: "Selection tabs for filtering a result set.",
		render: () => (
			<FilterTabs
				activeId="all"
				tabs={[
					{ id: "all", label: "전체" },
					{ id: "popular", label: "인기" },
					{ id: "recent", label: "최신" },
				]}
			/>
		),
	},
	{
		componentId: "form-field",
		description: "Label, helper, and field composition boundary.",
		render: () => (
			<div className="w-80 max-w-full">
				<FormField label="옵션" helperText="선택 가능한 값을 확인합니다.">
					<SelectField
						value="basic"
						options={[
							{ id: "basic", label: "기본 옵션" },
							{ id: "premium", label: "프리미엄 옵션" },
						]}
					/>
				</FormField>
			</div>
		),
	},
	{
		componentId: "select-field",
		description: "Select control pattern with normalized options.",
		render: () => (
			<div className="w-80 max-w-full">
				<SelectField
					value="standard"
					options={[
						{ id: "standard", label: "스탠다드" },
						{ id: "express", label: "빠른 처리" },
					]}
				/>
			</div>
		),
	},
] as const satisfies readonly ComponentPreviewExample[];

export function getComponentPreviewExample(componentId: string) {
	return componentPreviewExamples.find(
		(example) => example.componentId === componentId,
	);
}
