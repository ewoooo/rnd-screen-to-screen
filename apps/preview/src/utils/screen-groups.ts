import type { ScreenGroup, ScreenRoute } from "@screen/mobile/screens";

export const SCREEN_GROUP_ORDER = [
	"membership",
	"cx-example",
] as const satisfies readonly ScreenGroup[];

export type ScreenGroups = Partial<Record<ScreenGroup, ScreenRoute[]>>;

export function getScreenGroups(routes: readonly ScreenRoute[]) {
	const orderedGroups = SCREEN_GROUP_ORDER.filter((group) =>
		routes.some((route) => route.group === group),
	);
	const additionalGroups = routes
		.map((route) => route.group)
		.filter(
			(group, index, groups) =>
				!SCREEN_GROUP_ORDER.includes(group) && groups.indexOf(group) === index,
		);

	return [...orderedGroups, ...additionalGroups];
}

export function groupScreensByGroup(routes: readonly ScreenRoute[]) {
	return routes.reduce<ScreenGroups>((acc, route) => {
		const groupRoutes = acc[route.group] ?? [];
		acc[route.group] = groupRoutes;
		groupRoutes.push(route);
		return acc;
	}, {});
}
