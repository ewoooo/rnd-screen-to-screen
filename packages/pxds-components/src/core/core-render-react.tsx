import { Button, SectionMessage } from "@wanteddev/wds";
import {
	renderBoolean,
	renderString,
	type ComponentRenderReact,
} from "../render-react";

export const wdsButtonRenderReact: ComponentRenderReact = ({ node }) => (
	<Button
		variant={node.props?.variant === "outlined" ? "outlined" : "solid"}
		size={node.props?.size === "medium" ? "medium" : "large"}
		disabled={renderBoolean(node.props?.disabled, false)}
	>
		{renderString(node.props?.label) ??
			renderString(node.props?.primaryLabel) ??
			""}
	</Button>
);

export const wdsSectionMessageRenderReact: ComponentRenderReact = ({ node }) => (
	<SectionMessage
		variant={sectionMessageVariant(node.props?.variant)}
		description={renderString(node.props?.description)}
	>
		{renderString(node.props?.title) ?? ""}
	</SectionMessage>
);

function sectionMessageVariant(value: unknown) {
	if (
		value === "info" ||
		value === "positive" ||
		value === "negative" ||
		value === "cautionary"
	) {
		return value;
	}
	return "info";
}
