import { type ScreenId, type ScreenRoutePath, screenRoutes } from "./routes";

const referenceScreenIdPrefix = "NOVA-MBR-PG-" as const;

export function isReferenceScreenId(id: ScreenId | string) {
	return id.startsWith(referenceScreenIdPrefix);
}

export function isLegacyScreenId(id: ScreenId | string) {
	return !isReferenceScreenId(id);
}

export function getScreenRouteById(id: ScreenId | string) {
	return screenRoutes.find((screen) => screen.id === id);
}

export function getScreenRouteByRoute(route: ScreenRoutePath | `/${string}`) {
	return screenRoutes.find((screen) => screen.route === route);
}
