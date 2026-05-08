import { screenRoutes } from "@screen/registry";

import { getPageGroups, groupPagesByGroup } from "@/utils/page-groups";

export function usePageGroups() {
	const pages = screenRoutes;

	return {
		pages,
		defaultPage: pages[0],
		groups: getPageGroups(pages),
		groupedPages: groupPagesByGroup(pages),
		getPageByRoute: (route: `/${string}`) =>
			pages.find((page) => page.route === route),
	};
}
