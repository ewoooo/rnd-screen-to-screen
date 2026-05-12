import {
	Checkbox,
	Chip,
	List,
	ListCell,
	ListCellContent,
	RadioGroup,
	RadioGroupItem,
	Typography,
} from "@pxds/pxds-components/core";
import type { ReactNode } from "react";

import { HStack } from "@pxds/pxds-layout/primitives";
import {
	renderString,
	renderStringArray,
	type ComponentRenderReact,
	type RenderReactPropValue,
} from "../../render-react";

export type SelectableDensity = "comfortable" | "compact";
export type SelectionMode = "single" | "multi";

export type SelectableItem = {
	id: string;
	title: string;
	sub?: string;
	trailingLabel?: string;
	leading?: ReactNode;
	disabled?: boolean;
	disabledReason?: string;
};

type SingleProps = {
	selectionMode?: "single";
	value?: string;
	onChange?: (id: string) => void;
};

type MultiProps = {
	selectionMode: "multi";
	selectedIds?: readonly string[];
	onSelectionChange?: (ids: readonly string[]) => void;
};

type Props = {
	items: readonly SelectableItem[];
	name: string;
	density?: SelectableDensity;
} & (SingleProps | MultiProps);

export function SelectableList(props: Props) {
	const { items, name, density = "comfortable" } = props;
	const compact = density === "compact";

	if (props.selectionMode === "multi") {
		const selectedSet = new Set(props.selectedIds ?? []);
		return (
			<List
				flexDirection="column"
				gap={compact ? "var(--spacing-4)" : "var(--spacing-8)"}
			>
				{items.map((item) => {
					const selected = selectedSet.has(item.id);
					const showCaption = !compact && (item.sub || item.disabled);
					return (
						<ListCell
							as="label"
							key={item.id}
							alignItems={showCaption ? "flex-start" : "center"}
							selected={selected}
							disabled={item.disabled}
							verticalPadding={compact ? "small" : "medium"}
							fillWidth
							ellipsis
							textProps={{
								variant: "body1",
								weight: "bold",
								caption: showCaption ? (
									<>
										{item.sub}
										{item.disabled && item.disabledReason ? (
											<Typography
												as="span"
												variant="caption1"
												color="semantic.status.negative"
												style={{ display: "block" }}
											>
												{item.disabledReason}
											</Typography>
										) : null}
									</>
								) : undefined,
								captionProps: showCaption
									? {
											variant: "caption1",
											color: "semantic.label.alternative",
										}
									: undefined,
							}}
							leadingContent={
								item.leading ? (
									<ListCellContent variant="large-icon">
										{item.leading}
									</ListCellContent>
								) : undefined
							}
							trailingContent={
								<ListCellContent variant="custom">
									<HStack align="center" gap="inline">
										{item.trailingLabel ? (
											<Chip
												size="small"
												variant={selected ? "solid" : "outlined"}
												active={selected}
											>
												{item.trailingLabel}
											</Chip>
										) : null}
										<Checkbox
											id={`${name}-${item.id}`}
											name={name}
											checked={selected}
											disabled={item.disabled}
										/>
									</HStack>
								</ListCellContent>
							}
							{...{ htmlFor: `${name}-${item.id}` }}
						>
							{item.title}
						</ListCell>
					);
				})}
			</List>
		);
	}

	const value = props.value;
	const onChange = props.onChange;
	return (
		<RadioGroup
			name={name}
			value={value}
			onValueChange={onChange}
			orientation="vertical"
		>
			<List
				flexDirection="column"
				gap={compact ? "var(--spacing-4)" : "var(--spacing-8)"}
			>
				{items.map((item) => {
					const selected = value === item.id;
					const showCaption = !compact && (item.sub || item.disabled);
					return (
						<ListCell
							as="label"
							key={item.id}
							alignItems={showCaption ? "flex-start" : "center"}
							selected={selected}
							disabled={item.disabled}
							verticalPadding={compact ? "small" : "medium"}
							fillWidth
							ellipsis
							textProps={{
								variant: "body1",
								weight: "bold",
								caption: showCaption ? (
									<>
										{item.sub}
										{item.disabled && item.disabledReason ? (
											<Typography
												as="span"
												variant="caption1"
												color="semantic.status.negative"
												style={{ display: "block" }}
											>
												{item.disabledReason}
											</Typography>
										) : null}
									</>
								) : undefined,
								captionProps: showCaption
									? {
											variant: "caption1",
											color: "semantic.label.alternative",
										}
									: undefined,
							}}
							leadingContent={
								item.leading ? (
									<ListCellContent variant="large-icon">
										{item.leading}
									</ListCellContent>
								) : undefined
							}
							trailingContent={
								<ListCellContent variant="custom">
									<HStack align="center" gap="inline">
										{item.trailingLabel ? (
											<Chip
												size="small"
												variant={selected ? "solid" : "outlined"}
												active={selected}
											>
												{item.trailingLabel}
											</Chip>
										) : null}
										<RadioGroupItem
											id={`${name}-${item.id}`}
											value={item.id}
											disabled={item.disabled}
										/>
									</HStack>
								</ListCellContent>
							}
							{...{ htmlFor: `${name}-${item.id}` }}
						>
							{item.title}
						</ListCell>
					);
				})}
			</List>
		</RadioGroup>
	);
}

const DEFAULT_ITEMS: readonly SelectableItem[] = [
	{ id: "phone", title: "휴대폰 인증" },
	{ id: "pass", title: "PASS 인증" },
	{ id: "cert", title: "공동인증서" },
];

export const selectableListRenderReact: ComponentRenderReact = ({ node }) => {
	const common = {
		name: renderString(node.props?.name) ?? "selectable-list",
		items: renderSelectableItems(node.props?.items),
		density: node.props?.density === "compact" ? "compact" : "comfortable",
	} as const;

	if (node.props?.selectionMode === "multi") {
		return (
			<SelectableList
				{...common}
				selectionMode="multi"
				selectedIds={renderStringArray(node.props?.selectedIds) ?? []}
				onSelectionChange={() => undefined}
			/>
		);
	}

	return (
		<SelectableList
			{...common}
			value={renderString(node.props?.value) ?? "phone"}
			onChange={() => undefined}
		/>
	);
};

function renderSelectableItems(
	value: RenderReactPropValue | undefined,
): readonly SelectableItem[] {
	if (!Array.isArray(value)) return DEFAULT_ITEMS;
	const items = value.flatMap((item) => {
		if (!item || typeof item !== "object" || Array.isArray(item)) return [];
		return [
			{
				id: renderString(item.id) ?? "",
				title: renderString(item.title) ?? "",
				sub: renderString(item.sub),
				trailingLabel: renderString(item.trailingLabel),
			},
		];
	});
	return items.length > 0 ? items : DEFAULT_ITEMS;
}
