import {
	screenRoutes,
	type ScreenId,
	type ScreenRoute,
	type ScreenRoutePath,
} from "../registry/index";

export type ScreenRouteRegistry = readonly ScreenRoute[];
export type ScreenRoutePatch = Partial<Omit<ScreenRoute, "id">>;

function assertUniqueScreenRoute(
	registry: ScreenRouteRegistry,
	entry: ScreenRoute,
	ignoreId?: string,
) {
	const duplicateId = registry.find(
		(screen) => screen.id === entry.id && screen.id !== ignoreId,
	);
	if (duplicateId) {
		throw new Error(`Screen route id already exists: ${entry.id}`);
	}

	const duplicateRoute = registry.find(
		(screen) => screen.route === entry.route && screen.id !== ignoreId,
	);
	if (duplicateRoute) {
		throw new Error(`Screen route path already exists: ${entry.route}`);
	}
}

export function findScreenRouteById(
	registry: ScreenRouteRegistry,
	id: ScreenId | string,
) {
	return registry.find((screen) => screen.id === id);
}

export function findScreenRouteByRoute(
	registry: ScreenRouteRegistry,
	route: ScreenRoutePath | `/${string}`,
) {
	return registry.find((screen) => screen.route === route);
}

export function getScreenRouteById(id: ScreenId | string) {
	return findScreenRouteById(screenRoutes, id);
}

export function getScreenRouteByRoute(route: ScreenRoutePath | `/${string}`) {
	return findScreenRouteByRoute(screenRoutes, route);
}

export function createScreenRoute(
	registry: ScreenRouteRegistry,
	entry: ScreenRoute,
) {
	assertUniqueScreenRoute(registry, entry);
	return [...registry, entry];
}

export function updateScreenRoute(
	registry: ScreenRouteRegistry,
	id: ScreenId | string,
	patch: ScreenRoutePatch,
) {
	let didUpdate = false;
	const next = registry.map((screen) => {
		if (screen.id !== id) {
			return screen;
		}

		didUpdate = true;
		const updated = { ...screen, ...patch };
		assertUniqueScreenRoute(registry, updated, screen.id);
		return updated;
	});

	if (!didUpdate) {
		throw new Error(`Screen route not found: ${id}`);
	}

	return next;
}

export function deleteScreenRoute(
	registry: ScreenRouteRegistry,
	id: ScreenId | string,
) {
	const next = registry.filter((screen) => screen.id !== id);
	if (next.length === registry.length) {
		throw new Error(`Screen route not found: ${id}`);
	}

	return next;
}

export function upsertScreenRoute(
	registry: ScreenRouteRegistry,
	entry: ScreenRoute,
) {
	if (findScreenRouteById(registry, entry.id)) {
		return updateScreenRoute(registry, entry.id, entry);
	}

	return createScreenRoute(registry, entry);
}
