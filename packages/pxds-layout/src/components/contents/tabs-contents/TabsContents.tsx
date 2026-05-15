import type { CSSProperties, ElementType, ReactNode } from "react";

import { ContentSection } from "../../chrome/ContentLayout";

type Props = {
	as?: ElementType;
	children: ReactNode;
	style?: CSSProperties;
};

export function TabsContents({ as = "section", children, style }: Props) {
	return (
		<ContentSection as={as} inset="bleed" style={style}>
			{children}
		</ContentSection>
	);
}
