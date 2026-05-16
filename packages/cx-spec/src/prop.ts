export type PropConfig = {
	type: "string" | "number" | "boolean" | "enum" | "slot" | "object";
	editable?: boolean;
	options?: readonly unknown[];
	defaultValue?: unknown;
	figmaProperty?: string;
};
