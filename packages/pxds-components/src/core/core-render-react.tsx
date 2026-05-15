import {
	type ComponentRenderReact,
	renderBoolean,
	renderString,
} from "../render-react";
import { Button } from "./button";
import { SectionMessage } from "./section-message";

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
