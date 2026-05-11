export type FigmaMcpExportKind = "component" | "page";

export type FigmaMcpExportRequestInput = {
	kind: FigmaMcpExportKind;
	id: string;
	name: string;
	sourcePath: string;
	previewUrl: string;
};

export type FigmaMcpExportRequest = FigmaMcpExportRequestInput & {
	createdAt: string;
	requestId: string;
	status: "requested";
	instructions: string;
	workflow: FigmaMcpExportWorkflow;
};

export type FigmaMcpExportWorkflow = {
	artifactDir: string;
	codexPromptPath: string;
	figmaPluginCodePath: string | null;
	hasExecutableFigmaCode: boolean;
	nextAction: string;
};

export type FigmaMcpExportResponse = {
	request: FigmaMcpExportRequest;
	codexPrompt: string;
	path: string;
};
