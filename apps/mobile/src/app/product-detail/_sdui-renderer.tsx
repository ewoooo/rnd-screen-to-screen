import { TopNavigation, TopNavigationButton } from "@pxds/pxds-components/core";
import { IconSearch } from "@pxds/pxds-components/core";
import type { ReactNode } from "react";

import {
	ProductBenefitList,
	ProductOptionSelector,
	ProductPromoBanner,
	ProductPurchaseBar,
	ProductSummaryCard,
} from "@/components/organisms/product";
import { GlobalNavigationBar } from "@/components/organisms/global";
import { AppScreen, StatusBar } from "@/components/templates/app-screen";

import type {
	RenderableScreenSpecV1,
	SDUIJsonValue,
	SDUINode,
} from "@screen/screens";
import type { ProductTextPolicyMap } from "@/components/organisms/product/types";

type JsonObject = Record<string, SDUIJsonValue>;

type ProductData = {
	label: string;
	name: string;
	brand: string;
	price: string;
	originalPrice: string;
	discount: string;
	rating: string;
	reviewCount: string;
	imageLabel: string;
};

type ListData = {
	label: string;
	title: string;
	selectedId?: string;
	items: readonly {
		id: string;
		title: string;
		sub: string;
		pill: string;
		disabled?: boolean;
		disabledReason?: string;
	}[];
};

type PromoData = {
	badge: string;
	text: string;
	action: string;
};

type PurchaseData = {
	title: string;
	aiText: string;
	ctaText: string;
};

export function renderProductDetailFromSpec(spec: RenderableScreenSpecV1) {
	const root = spec.children[0];

	if (!root || root.type !== "AppScreen") {
		throw new Error("product-detail SDUI spec must start with AppScreen.");
	}

	return renderNode(root, spec);
}

function renderNode(node: SDUINode, spec: RenderableScreenSpecV1): ReactNode {
	switch (node.type) {
		case "AppScreen": {
			const props = asObject(node.props);
			return (
				<AppScreen
					top={renderSlotValue(props.top, spec)}
					bottom={renderSlotValue(props.bottom, spec)}
				>
					{node.children?.map((child) => (
						<FragmentNode key={child.id}>{renderNode(child, spec)}</FragmentNode>
					))}
				</AppScreen>
			);
		}

		case "ProductSummaryCard": {
			const data = readBind<ProductData>(node, spec);
			return <ProductSummaryCard {...data} textPolicy={readTextPolicy(node)} />;
		}

		case "ProductOptionSelector": {
			const data = readBind<ListData>(node, spec);
			return (
				<ProductOptionSelector
					label={data.label}
					title={data.title}
					items={data.items}
					selectedId={data.selectedId ?? data.items[0]?.id ?? ""}
				/>
			);
		}

		case "ProductPromoBanner": {
			const data = readBind<PromoData>(node, spec);
			return <ProductPromoBanner {...data} />;
		}

		case "ProductBenefitList": {
			const data = readBind<ListData>(node, spec);
			return (
				<ProductBenefitList
					label={data.label}
					title={data.title}
					items={data.items}
				/>
			);
		}

		case "ProductPurchaseBar": {
			const data = readBind<PurchaseData>(node, spec);
			return <ProductPurchaseBar {...data} textPolicy={readTextPolicy(node)} />;
		}

		case "BottomChromeStack":
			return (
				<>
					{node.children?.map((child) => (
						<FragmentNode key={child.id}>{renderNode(child, spec)}</FragmentNode>
					))}
				</>
			);

		case "GlobalNavigationBar": {
			const active = asObject(node.props).active;
			return <GlobalNavigationBar active={active === "shop" ? "shop" : undefined} />;
		}

		case "ProductTopBar": {
			const props = asObject(node.props);
			return (
				<ProductTopBar
					title={asString(props.title, "상품 상세")}
					leading={asString(props.leading, "이전")}
				/>
			);
		}

		default:
			throw new Error(`Unsupported SDUI node type: ${node.type}`);
	}
}

function readTextPolicy(node: SDUINode): ProductTextPolicyMap | undefined {
	const textPolicy = asObject(node.props).textPolicy;

	if (!isObject(textPolicy)) {
		return undefined;
	}

	return textPolicy as ProductTextPolicyMap;
}

function renderSlotValue(value: SDUIJsonValue | undefined, spec: RenderableScreenSpecV1) {
	if (!isObject(value)) {
		return null;
	}

	return renderNode(value as unknown as SDUINode, spec);
}

function readBind<T>(node: SDUINode, spec: RenderableScreenSpecV1): T {
	const bind = asObject(node.props).bind;

	if (typeof bind !== "string") {
		throw new Error(`${node.id} must declare props.bind.`);
	}

	const data = spec.data[bind];

	if (!isObject(data)) {
		throw new Error(`${node.id} bind target not found: ${bind}`);
	}

	return data as T;
}

function ProductTopBar({ title, leading }: { title: string; leading: string }) {
	return (
		<>
			<StatusBar />
			<TopNavigation
				variant="normal"
				leadingContent={
					<TopNavigationButton variant="text" color="assistive">
						{leading}
					</TopNavigationButton>
				}
				trailingContent={
					<TopNavigationButton variant="icon" color="assistive">
						<IconSearch width={22} height={22} />
					</TopNavigationButton>
				}
			>
				{title}
			</TopNavigation>
		</>
	);
}

function FragmentNode({ children }: { children: ReactNode }) {
	return <>{children}</>;
}

function asObject(value: SDUIJsonValue | undefined): JsonObject {
	return isObject(value) ? value : {};
}

function isObject(value: SDUIJsonValue | undefined): value is JsonObject {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: SDUIJsonValue | undefined, fallback: string) {
	return typeof value === "string" ? value : fallback;
}
