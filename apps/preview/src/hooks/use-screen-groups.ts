import { screenRoutes } from "@screen/mobile/screens";

import { getScreenGroups, groupScreensByGroup } from "@/utils/screen-groups";

export function useScreenGroups() {
	const screens = screenRoutes;

	return {
		screens,
		defaultScreen: screens[0],
		groups: getScreenGroups(screens),
		groupedScreens: groupScreensByGroup(screens),
		getScreenByRoute: (route: `/${string}`) =>
			screens.find((screen) => screen.route === route),
	};
}
