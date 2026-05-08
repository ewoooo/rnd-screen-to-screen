import type { ScreenGroup, ScreenRoute } from "@screen/registry";

export const PAGE_GROUP_ORDER = [
	"home",
	"membership",
	"product",
	"search",
	"tu",
	"nc-full",
	"nc-simple",
	"billing",
	"billing-html",
] as const satisfies readonly ScreenGroup[];

export type PageGroups = Partial<Record<ScreenGroup, ScreenRoute[]>>;

export function getPageGroups(routes: readonly ScreenRoute[]) {
	const orderedGroups = PAGE_GROUP_ORDER.filter((group) =>
		routes.some((route) => route.group === group),
	);
	const additionalGroups = routes
		.map((route) => route.group)
		.filter(
			(group, index, groups) =>
				!PAGE_GROUP_ORDER.includes(group) && groups.indexOf(group) === index,
		);

	return [...orderedGroups, ...additionalGroups];
}

export function groupPagesByGroup(routes: readonly ScreenRoute[]) {
	return routes.reduce<PageGroups>((acc, route) => {
		(acc[route.group] ??= []).push(route);
		return acc;
	}, {});
}
