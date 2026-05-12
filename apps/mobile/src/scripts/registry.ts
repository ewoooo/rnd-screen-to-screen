export type ScreenRouteLike = {
	id: string;
	route: `/${string}`;
};

export type ScreenRouteRegistry<T extends ScreenRouteLike = ScreenRouteLike> =
	readonly T[];

export type ScreenRoutePatch<T extends ScreenRouteLike = ScreenRouteLike> =
	Partial<Omit<T, "id">>;

function assertUniqueScreenRoute<T extends ScreenRouteLike>(
	registry: ScreenRouteRegistry<T>,
	entry: T,
	ignoreId?: string,
) {
	const duplicateId = registry.find(
		(screen) => screen.id === entry.id && screen.id !== ignoreId,
	);
	if (duplicateId) throw new Error(`Screen route id already exists: ${entry.id}`);
	const duplicateRoute = registry.find(
		(screen) => screen.route === entry.route && screen.id !== ignoreId,
	);
	if (duplicateRoute) {
		throw new Error(`Screen route path already exists: ${entry.route}`);
	}
}

export function findScreenRouteById<T extends ScreenRouteLike>(
	registry: ScreenRouteRegistry<T>,
	id: string,
) {
	return registry.find((screen) => screen.id === id);
}

export function findScreenRouteByRoute<T extends ScreenRouteLike>(
	registry: ScreenRouteRegistry<T>,
	route: `/${string}`,
) {
	return registry.find((screen) => screen.route === route);
}

export function createScreenRoute<T extends ScreenRouteLike>(
	registry: ScreenRouteRegistry<T>,
	entry: T,
) {
	assertUniqueScreenRoute(registry, entry);
	return [...registry, entry];
}

export function updateScreenRoute<T extends ScreenRouteLike>(
	registry: ScreenRouteRegistry<T>,
	id: string,
	patch: ScreenRoutePatch<T>,
) {
	let didUpdate = false;
	const next = registry.map((screen) => {
		if (screen.id !== id) return screen;
		didUpdate = true;
		const updated = { ...screen, ...patch };
		assertUniqueScreenRoute(registry, updated, screen.id);
		return updated;
	});
	if (!didUpdate) throw new Error(`Screen route not found: ${id}`);
	return next;
}

export function deleteScreenRoute<T extends ScreenRouteLike>(
	registry: ScreenRouteRegistry<T>,
	id: string,
) {
	const next = registry.filter((screen) => screen.id !== id);
	if (next.length === registry.length) throw new Error(`Screen route not found: ${id}`);
	return next;
}

export function upsertScreenRoute<T extends ScreenRouteLike>(
	registry: ScreenRouteRegistry<T>,
	entry: T,
) {
	return findScreenRouteById(registry, entry.id)
		? updateScreenRoute(registry, entry.id, entry)
		: createScreenRoute(registry, entry);
}
