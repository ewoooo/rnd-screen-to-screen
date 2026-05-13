export type RegistryEntryLike = {
	id: string;
};

export type RouteRegistryEntryLike = RegistryEntryLike & {
	route: `/${string}`;
};

export type Registry<T extends RegistryEntryLike = RegistryEntryLike> =
	readonly T[];

export type RegistryPatch<T extends RegistryEntryLike = RegistryEntryLike> =
	Partial<Omit<T, "id">>;

export function findRegistryEntryById<T extends RegistryEntryLike>(
	registry: Registry<T>,
	id: string,
) {
	return registry.find((entry) => entry.id === id);
}

export function findRegistryEntryByRoute<T extends RouteRegistryEntryLike>(
	registry: Registry<T>,
	route: `/${string}`,
) {
	return registry.find((entry) => entry.route === route);
}

export function createRegistryEntry<T extends RegistryEntryLike>(
	registry: Registry<T>,
	entry: T,
) {
	assertUniqueRegistryEntry(registry, entry);
	return [...registry, entry];
}

export function updateRegistryEntry<T extends RegistryEntryLike>(
	registry: Registry<T>,
	id: string,
	patch: RegistryPatch<T>,
) {
	let didUpdate = false;
	const next = registry.map((entry) => {
		if (entry.id !== id) return entry;
		didUpdate = true;
		const updated = { ...entry, ...patch };
		assertUniqueRegistryEntry(registry, updated, entry.id);
		return updated;
	});

	if (!didUpdate) throw new Error(`Registry entry not found: ${id}`);
	return next;
}

export function deleteRegistryEntry<T extends RegistryEntryLike>(
	registry: Registry<T>,
	id: string,
) {
	const next = registry.filter((entry) => entry.id !== id);
	if (next.length === registry.length) {
		throw new Error(`Registry entry not found: ${id}`);
	}
	return next;
}

export function upsertRegistryEntry<T extends RegistryEntryLike>(
	registry: Registry<T>,
	entry: T,
) {
	return findRegistryEntryById(registry, entry.id)
		? updateRegistryEntry(registry, entry.id, entry)
		: createRegistryEntry(registry, entry);
}

function assertUniqueRegistryEntry<T extends RegistryEntryLike>(
	registry: Registry<T>,
	entry: T,
	ignoreId?: string,
) {
	const duplicateId = registry.find(
		(item) => item.id === entry.id && item.id !== ignoreId,
	);
	if (duplicateId) throw new Error(`Registry entry id already exists: ${entry.id}`);

	if (!hasRoute(entry)) return;

	const duplicateRoute = registry.find(
		(item) =>
			hasRoute(item) &&
			item.route === entry.route &&
			item.id !== ignoreId,
	);
	if (duplicateRoute) {
		throw new Error(`Registry entry route already exists: ${entry.route}`);
	}
}

function hasRoute(entry: RegistryEntryLike): entry is RouteRegistryEntryLike {
	return "route" in entry && typeof entry.route === "string";
}
