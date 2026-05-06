"use client";

import { TopNavigation, TopNavigationButton } from "@wanteddev/wds";
import { IconArrowLeft, IconClose } from "@wanteddev/wds-icon";
import { Fragment, type ReactNode } from "react";

import { Box, VStack } from "@/components/atoms/layout";
import { TextBlock } from "@/components/atoms/typography";
import {
	ChipGroup,
	ConsentList,
	type ConsentListItem,
	FilterTabs,
	FormField,
	InfoList,
	type InfoListItem,
	MediaBlock,
	NoticeBlock,
	PrimaryCTABar,
	PromoBlock,
	SectionCard,
	SelectableList,
	type SelectableItem,
	StickyActionBar,
	SummaryCard,
	Switch,
	TextField,
} from "@/components/molecules";
import {
	AppScreen,
	ContentRail,
	ContentSection,
} from "@/components/templates/app-screen";

import type {
	RenderableScreenSpecV1,
	SDUIJsonValue,
	SDUINode,
} from "@screen/screens";

type Spec = RenderableScreenSpecV1;
type JsonObject = Record<string, SDUIJsonValue>;

const isObject = (
	value: SDUIJsonValue | undefined,
): value is JsonObject =>
	Boolean(value) && typeof value === "object" && !Array.isArray(value);

const asString = (value: SDUIJsonValue | undefined, fallback = ""): string =>
	typeof value === "string" ? value : fallback;

const asArray = (value: SDUIJsonValue | undefined): readonly JsonObject[] =>
	Array.isArray(value) ? (value.filter(isObject) as JsonObject[]) : [];

const asBool = (value: SDUIJsonValue | undefined): boolean =>
	value === true || value === "true";

function readBind(node: SDUINode, spec: Spec): JsonObject {
	const props = (node.props as JsonObject | undefined) ?? {};
	const bind = props.bind;
	if (typeof bind === "string") {
		const data = spec.data[bind];
		return isObject(data) ? data : {};
	}
	if (isObject(bind)) return bind;
	return {};
}

function renderSlot(value: SDUIJsonValue | undefined, spec: Spec): ReactNode {
	if (value == null) return null;
	if (Array.isArray(value)) {
		return value.map((entry, index) => (
			<Fragment key={index}>{renderSlot(entry, spec)}</Fragment>
		));
	}
	if (isObject(value) && typeof value.type === "string") {
		return renderNode(value as unknown as SDUINode, spec);
	}
	return null;
}

function renderChildren(node: SDUINode, spec: Spec): ReactNode {
	if (!node.children) return null;
	return node.children.map((child, index) => (
		<Fragment key={child.id ?? index}>{renderNode(child, spec)}</Fragment>
	));
}

function renderNode(node: SDUINode, spec: Spec): ReactNode {
	const props = (node.props as JsonObject | undefined) ?? {};

	switch (node.type) {
		case "AppScreen":
			return (
				<AppScreen
					top={renderSlot(props.top, spec)}
					bottom={renderSlot(props.bottom, spec)}
				>
					{renderChildren(node, spec)}
				</AppScreen>
			);

		case "ContentSection":
			return (
				<ContentSection
					inset={
						(asString(props.inset, "inherit") as "inherit" | "bleed")
					}
				>
					{renderChildren(node, spec)}
				</ContentSection>
			);

		case "ContentRail":
			return (
				<ContentRail
					rail={
						(asString(props.rail, "inset") as "inset" | "full" | "measure")
					}
					measure={
						(asString(props.measure, "body") as
							| "body"
							| "title"
							| "caption")
					}
				>
					{renderChildren(node, spec)}
				</ContentRail>
			);

		case "GlobalNavigationHeader":
			return renderTopBar(props, "back");

		case "TextBlock":
			return (
				<TextBlock
					variant={asString(props.variant, "body1") as never}
					weight={(asString(props.weight) as never) || undefined}
					color={asString(props.color) || undefined}
					text={asString(props.text)}
				/>
			);

		case "Hero": {
			const data = readBind(node, spec);
			const eyebrow = asString(data.eyebrow ?? props.eyebrow);
			const title = asString(data.title ?? props.title);
			const description = asString(data.description ?? props.description);
			return (
				<ContentSection>
					<VStack spacing="stack">
						{eyebrow ? (
							<TextBlock
								variant="label1"
								weight="bold"
								color="semantic.label.alternative"
								text={eyebrow}
							/>
						) : null}
						{title ? (
							<TextBlock variant="title3" weight="bold" text={title} />
						) : null}
						{description ? (
							<TextBlock
								variant="body1"
								color="semantic.label.alternative"
								text={description}
							/>
						) : null}
					</VStack>
				</ContentSection>
			);
		}

		case "SummaryCard": {
			const data = readBind(node, spec);
			const meta = asArray(data.meta);
			return (
				<SummaryCard
					label={asString(data.label, "")}
					title={asString(data.title, "")}
					mediaAlt={asString(data.label, "summary")}
				>
					{meta.length > 0 ? (
						<InfoList
							items={meta.map<InfoListItem>((entry, index) => ({
								id: asString(entry.id, asString(entry.label, String(index))),
								title: asString(entry.label),
								sub: "",
								trailingLabel: asString(entry.value),
							}))}
						/>
					) : null}
				</SummaryCard>
			);
		}

		case "SectionCard": {
			const data = readBind(node, spec);
			return (
				<SectionCard
					label={asString(data.label) || undefined}
					title={asString(data.title) || undefined}
					trailingText={asString(data.trailing) || undefined}
				>
					{renderChildren(node, spec)}
				</SectionCard>
			);
		}

		case "InfoList": {
			const data = readBind(node, spec);
			const rows = asArray(data.rows ?? data.items);
			return (
				<InfoList
					items={rows.map<InfoListItem>((row, index) => ({
						id: asString(row.id, String(index)),
						title: asString(row.title),
						sub: asString(row.sub),
						trailingLabel:
							asString(row.trailingLabel) ||
							asString(row.value) ||
							undefined,
						mediaLabel: asString(row.mediaLabel) || undefined,
					}))}
				/>
			);
		}

		case "SelectableList": {
			const data = readBind(node, spec);
			const items = asArray(data.items ?? data.options).map<SelectableItem>(
				(row, index) => ({
					id: asString(row.id, asString(row.value, String(index))),
					title: asString(row.title, asString(row.label)),
					sub: asString(row.sub) || undefined,
					trailingLabel: asString(row.trailingLabel) || undefined,
					disabled: asBool(row.disabled),
					disabledReason: asString(row.disabledReason) || undefined,
				}),
			);
			return (
				<SelectableList
					name={asString(node.id, "select")}
					items={items}
					value={asString(data.value) || asString(data.selectedId) || items[0]?.id}
					density={
						(asString(props.density, "comfortable") as
							| "comfortable"
							| "compact")
					}
				/>
			);
		}

		case "RadioGroup": {
			const data = readBind(node, spec);
			const items = asArray(data.options ?? data.items).map<SelectableItem>(
				(row, index) => ({
					id: asString(row.id, asString(row.value, String(index))),
					title: asString(row.title, asString(row.label)),
					sub: asString(row.sub) || undefined,
				}),
			);
			return (
				<SelectableList
					name={asString(node.id, "radio")}
					items={items}
					value={asString(data.value) || items[0]?.id}
					density="compact"
				/>
			);
		}

		case "Tab":
		case "FilterTabs": {
			const data = readBind(node, spec);
			const tabs = asArray(data.tabs ?? data.items).map((row, index) => ({
				id: asString(row.id, String(index)),
				label: asString(row.label, asString(row.title)),
			}));
			return (
				<FilterTabs
					tabs={tabs}
					activeId={asString(data.activeId) || tabs[0]?.id || ""}
				/>
			);
		}

		case "NoticeBlock": {
			const data = { ...readBind(node, spec) };
			// inline props도 허용
			for (const k of ["badge", "text", "action", "tone", "title"] as const) {
				if (data[k] === undefined && props[k] !== undefined) data[k] = props[k];
			}
			return (
				<NoticeBlock
					tone={
						(asString(data.tone, "info") as "info" | "warning" | "critical")
					}
					badge={asString(data.badge) || asString(data.title) || "안내"}
					text={asString(data.text)}
					action={asString(data.action) || undefined}
				/>
			);
		}

		case "PromoBlock": {
			const data = readBind(node, spec);
			return (
				<PromoBlock
					badge={asString(data.badge, "프로모션")}
					text={asString(data.text)}
					action={asString(data.action, "")}
				/>
			);
		}

		case "ConsentList": {
			const data = readBind(node, spec);
			const items = asArray(data.items).map<ConsentListItem>((row, index) => ({
				id: asString(row.id, String(index)),
				title: asString(row.title),
				caption: asString(row.caption),
				required: asBool(row.required),
				defaultChecked: asBool(row.defaultChecked),
			}));
			return (
				<ConsentList
					allLabel={asString(data.allLabel, "전체 동의")}
					allCaption={asString(data.allCaption, "")}
					items={items}
				/>
			);
		}

		case "FormField":
			return (
				<FormField
					label={asString(props.label)}
					required={asBool(props.required)}
					helperText={asString(props.helperText) || undefined}
					errorText={asString(props.errorText) || undefined}
				>
					{renderChildren(node, spec)}
				</FormField>
			);

		case "TextField":
			return (
				<TextField
					placeholder={asString(props.placeholder) || undefined}
					defaultValue={asString(props.defaultValue) || undefined}
					disabled
				/>
			);

		case "Switch":
			return <Switch checked={asBool(props.checked)} disabled />;

		case "Select": {
			const data = readBind(node, spec);
			return (
				<TextField
					placeholder={asString(data.placeholder ?? props.placeholder, "선택")}
					defaultValue={asString(data.value)}
					disabled
				/>
			);
		}

		case "ChipGroup": {
			const data = readBind(node, spec);
			const items = asArray(data.items).map((row) =>
				asString(row.label, asString(row.title)),
			);
			return <ChipGroup items={items} />;
		}

		case "MediaBlock": {
			const data = readBind(node, spec);
			return <MediaBlock alt={asString(data.alt, "media")} />;
		}

		case "Placeholder":
			return <MediaBlock alt={asString(props.label, "placeholder")} />;

		case "PrimaryCTABar":
		case "StickyActionBar": {
			const data = readBind(node, spec);
			const primary = isObject(data.primary) ? data.primary : undefined;
			const secondary = isObject(data.secondary) ? data.secondary : undefined;
			const eyebrow = asString(data.eyebrow);
			const title = asString(data.title);
			const primaryLabel = asString(primary?.label, "확인");
			const secondaryLabel = asString(secondary?.label);

			if (node.type === "PrimaryCTABar") {
				return (
					<PrimaryCTABar
						primaryLabel={primaryLabel}
						secondaryLabel={secondaryLabel || undefined}
						disabled={asBool(data.disabled)}
					/>
				);
			}
			return (
				<StickyActionBar
					eyebrow={eyebrow || ""}
					title={title || primaryLabel}
					secondaryAction={secondaryLabel || ""}
					primaryAction={primaryLabel}
				/>
			);
		}

		default: {
			if (typeof window !== "undefined") {
				console.warn(`SduiRenderer: unsupported type "${node.type}"`);
			}
			return null;
		}
	}
}

function renderTopBar(
	props: JsonObject,
	defaultLeading: "back" | "close",
): ReactNode {
	const title = asString(props.title);
	const leading = asString(props.leading, defaultLeading);
	const LeadingIcon = leading === "close" ? IconClose : IconArrowLeft;

	return (
		<Box>
			<TopNavigation
				variant="normal"
				leadingContent={
					<TopNavigationButton variant="icon">
						<LeadingIcon width={24} height={24} />
					</TopNavigationButton>
				}
			>
				<TopNavigationTitle>{title}</TopNavigationTitle>
			</TopNavigation>
		</Box>
	);
}

export function SduiRenderer({ spec }: { spec: Spec }) {
	const root = spec.children?.[0];
	if (!root) return null;
	return <>{renderNode(root as unknown as SDUINode, spec)}</>;
}
