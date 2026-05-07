"use client";

import { AlertTriangleIcon, CheckCircle2Icon, ExternalLinkIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { MobilePreviewFrame } from "@pxds/pxds-preview";
import {
	activeScreenSpecs,
	benchmarkCriteria,
	getScreenSpecIssues,
	screens,
	type ScreenGroup,
	type ScreenPath,
	type ScreenSpecIssue,
	type ScreenSpecV2,
} from "@screen/screens";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const MOBILE_ORIGIN =
	process.env.NEXT_PUBLIC_MOBILE_ORIGIN ?? "http://localhost:3001";

const GROUP_ORDER = [
	"home",
	"membership",
	"product",
	"search",
	"tu",
	"nc-full",
	"nc-simple",
	"billing",
	"billing-html",
] as const satisfies readonly ScreenGroup[];
type RegistryScreen = (typeof screens)[number];

function getScreenGroups() {
	const orderedGroups = GROUP_ORDER.filter((group) =>
		screens.some((screen) => screen.group === group),
	);
	const additionalGroups = screens
		.map((screen) => screen.group)
		.filter((group, index, groups) => !GROUP_ORDER.includes(group) && groups.indexOf(group) === index);

	return [...orderedGroups, ...additionalGroups];
}

const GROUPS = getScreenGroups();

type BenchmarkFinding = {
	id: string;
	severity: "warning" | "info";
	message: string;
};

type ComponentTreeNode = {
	id: string;
	label: string;
	kind: "shell" | "slot" | "area" | "api";
	meta?: readonly string[];
	children?: readonly ComponentTreeNode[];
};

const SLOT_ORDER = ["top", "content", "bottom", "background", "backdrop", "sheet"] as const;

function getBenchmarkFindings(spec: ScreenSpecV2): BenchmarkFinding[] {
	const findings: BenchmarkFinding[] = [];
	const contract = spec.design_system_contract;

	if (spec.screen.type === "page") {
		if (spec.layout_contract.content_outlet_inline_inset !== "spacing-12") {
			findings.push({
				id: "design.horizontalInsetFit",
				severity: "warning",
				message: "Page screens should use spacing-12 as the ContentOutlet inset.",
			});
		}

		for (const area of spec.areas.filter((item) => item.slot === "content")) {
			const isBleed = spec.layout_contract.bleed_sections.includes(area.id);
			if (!isBleed && !area.uses.includes("ContentSection")) {
				findings.push({
					id: "design.horizontalInsetFit",
					severity: "warning",
					message: `${area.id} does not declare ContentSection usage.`,
				});
			}
		}
	}

	if (contract.allowed_escape_hatches.length > 0) {
		findings.push({
			id: "design.escapeHatchHonesty",
			severity: "info",
			message: `${contract.allowed_escape_hatches.length} design exception(s) are explicitly documented.`,
		});
	}

	if (contract.new_vocabulary_required.length > 0) {
		findings.push({
			id: "design.componentConsistency",
			severity: "info",
			message: `${contract.new_vocabulary_required.length} vocabulary gap(s) are declared as design intent.`,
		});
	}

	return findings;
}

function getIssueTone(issue: ScreenSpecIssue) {
	return issue.severity === "error"
		? "border-destructive/40 bg-destructive/10 text-destructive"
		: "border-amber-300 bg-amber-50 text-amber-900";
}

function getComponentTree(spec: ScreenSpecV2): ComponentTreeNode {
	const slots = spec.screen_contract.slots;
	const bleedSections = new Set(spec.layout_contract.bleed_sections);

	return {
		id: "shell",
		label: spec.screen_contract.shell,
		kind: "shell",
		meta: [spec.screen.type, spec.screen.domain],
		children: SLOT_ORDER.flatMap((slot) => {
			const contract = slots[slot];
			if (!contract) return [];

			return [
				{
					id: `slot-${slot}`,
					label: contract.owner,
					kind: "slot",
					meta: [
						slot,
						...(contract.flow ? [contract.flow] : []),
						...(contract.patterns ?? []),
					],
					children: spec.areas
						.filter((area) => area.slot === slot)
						.map<ComponentTreeNode>((area) => ({
							id: `${slot}-${area.id}`,
							label: area.id,
							kind: "area",
							meta: [
								area.content_role,
								area.pattern,
								...(bleedSections.has(area.id) ? ["bleed"] : []),
							],
							children: area.uses.map<ComponentTreeNode>((api) => ({
								id: `${slot}-${area.id}-${api}`,
								label: api,
								kind: "api",
							})),
						})),
				},
			];
		}),
	};
}

function getTreeBadgeVariant(kind: ComponentTreeNode["kind"]) {
	return kind === "shell" || kind === "slot" ? "default" : "outline";
}

function joinItems(items: readonly string[]) {
	return items.length > 0 ? items.join(", ") : "None";
}

function getDesignExceptionId(
	exception: ScreenSpecV2["design_system_contract"]["allowed_escape_hatches"][number],
	index: number,
) {
	return exception.id ?? `${exception.owner}:${exception.location ?? "unknown"}:${exception.kind ?? "exception"}:${index}`;
}

function getDesignExceptionLabel(
	exception: ScreenSpecV2["design_system_contract"]["allowed_escape_hatches"][number],
) {
	return exception.id ?? exception.kind ?? exception.location ?? "Design exception";
}

export default function PreviewPage() {
	const [selectedPath, setSelectedPath] = useState<ScreenPath>(
		screens[0].path,
	);
	const selected = screens.find((screen) => screen.path === selectedPath) ?? screens[0];
	const selectedSpec = activeScreenSpecs[selected.id];
	const specIssues = getScreenSpecIssues(selectedSpec);
	const benchmarkFindings = getBenchmarkFindings(selectedSpec);
	const componentTree = getComponentTree(selectedSpec);
	const grouped = screens.reduce<Partial<Record<ScreenGroup, RegistryScreen[]>>>(
		(acc, screen) => {
			(acc[screen.group] ??= []).push(screen);
			return acc;
		},
		{},
	);
	const iframeSrc = useMemo(
		() => `${MOBILE_ORIGIN}${selected.path}`,
		[selected.path],
	);

	return (
		<main className="grid min-h-dvh grid-cols-1 bg-transparent sm:grid-cols-[260px_minmax(390px,1fr)_340px] xl:grid-cols-[300px_minmax(420px,1fr)_380px]">
			<aside className="flex flex-col border-r bg-card sm:sticky sm:top-0 sm:h-dvh sm:max-h-dvh sm:overflow-hidden">
				<div className="flex items-center gap-3 p-5">
					<div className="min-w-0">
						<h1 className="truncate text-xl font-semibold">Screen Preview</h1>
						<p className="truncate text-xs text-muted-foreground">
							Spec v2 contracts
						</p>
					</div>
				</div>

				<Separator />

				<nav className="flex flex-1 flex-col gap-5 overflow-auto p-3">
					{GROUPS.map((group) => (
						<section key={group} className="flex flex-col gap-1">
							<h2 className="px-3 py-1 text-xs font-semibold uppercase text-muted-foreground">
								{group}
							</h2>
							<div className="flex flex-col gap-1">
								{(grouped[group] ?? []).map((screen) => {
									const active = screen.path === selected.path;

									return (
										<Button
											key={screen.path}
											type="button"
											variant={active ? "secondary" : "ghost"}
											className="h-auto justify-start gap-3 px-5 py-2 text-left"
											onClick={() => setSelectedPath(screen.path)}
										>
											<span className="truncate">{screen.label}</span>
											<Badge variant="outline" className="ml-auto font-normal">
												{screen.createdAt}
											</Badge>
										</Button>
									);
								})}
							</div>
						</section>
					))}
				</nav>
			</aside>

			<section className="flex min-w-0 flex-col">
				<header className="flex h-21  items-center justify-between border-b bg-background/80 px-6 backdrop-blur">
					<div>
						<p className="text-xs text-muted-foreground">{selected.group}</p>
						<h2 className="text-sm font-semibold">{selected.label}</h2>
					</div>
					<Button asChild variant="outline" size="sm">
						<a href={iframeSrc} target="_blank" rel="noreferrer">
							<ExternalLinkIcon data-icon="inline-start" />
							Open mobile
						</a>
					</Button>
				</header>

				<div className="grid flex-1 place-items-center overflow-auto p-6 xl:p-8">
					<Card className="border-0 bg-transparent p-0 shadow-none">
						<CardHeader className="sr-only">
							<CardTitle>{selected.label}</CardTitle>
							<CardDescription>{iframeSrc}</CardDescription>
						</CardHeader>
						<CardContent className="p-0">
							<MobilePreviewFrame src={iframeSrc} title={selected.label} />
						</CardContent>
					</Card>
				</div>
			</section>

			<aside className="flex flex-col border-l bg-card sm:sticky sm:top-0 sm:h-dvh sm:max-h-dvh sm:overflow-hidden">
				<div className="shrink-0 border-b p-5">
					<div className="flex items-start justify-between gap-3">
						<div className="min-w-0">
							<p className="text-xs font-medium uppercase text-muted-foreground">
								Design Contract
							</p>
							<h2 className="mt-1 truncate text-lg font-semibold">
								{selectedSpec.screen.name}
							</h2>
						</div>
						<Badge variant="outline">v{selectedSpec.meta.schema_version}</Badge>
					</div>
					<div className="mt-3 flex flex-wrap gap-2">
						<Badge>{selectedSpec.screen.type}</Badge>
						<Badge variant="outline">{selectedSpec.screen.domain}</Badge>
						<Badge variant="outline">{selectedSpec.screen_contract.shell}</Badge>
					</div>
					<div
						className={`mt-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${
							specIssues.length === 0
								? "bg-muted/40"
								: getIssueTone(specIssues[0])
						}`}
					>
						{specIssues.length === 0 ? (
							<CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
						) : (
							<AlertTriangleIcon className="mt-0.5 size-4 shrink-0" />
						)}
						<span>
							{specIssues.length === 0
								? "Spec v2 contract is structurally valid."
								: `${specIssues.length} spec issue(s) detected.`}
						</span>
					</div>
				</div>

				<div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-sm">Component Tree</CardTitle>
							<CardDescription>
								Spec contract tree, not runtime DOM output.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ComponentTree node={componentTree} />
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-sm">Layout Rules</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-2 gap-2 text-sm">
							<Metric label="Inset" value={selectedSpec.layout_contract.content_outlet_inline_inset ?? "N/A"} />
							<Metric label="Section" value={selectedSpec.layout_contract.section_inset} />
							<Metric label="Gap" value={selectedSpec.layout_contract.content_gap} />
							<Metric label="Flow" value={selectedSpec.layout_contract.top_bottom_flow} />
							<div className="col-span-2 rounded-md border p-3">
								<p className="text-xs font-medium text-muted-foreground">Bleed sections</p>
								<p className="mt-1 text-sm">
									{joinItems(selectedSpec.layout_contract.bleed_sections)}
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-sm">Design Exceptions</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 text-sm">
							{selectedSpec.design_system_contract.allowed_escape_hatches.length === 0 &&
							selectedSpec.design_system_contract.new_vocabulary_required.length === 0 ? (
								<div className="rounded-md border bg-muted/40 px-3 py-2">
									No declared exceptions.
								</div>
							) : null}
							{selectedSpec.design_system_contract.allowed_escape_hatches.map(
								(exception, index) => (
									<div
										key={getDesignExceptionId(exception, index)}
										className="rounded-md border p-3"
									>
										<div className="flex items-center justify-between gap-2">
											<p className="font-medium">
												{getDesignExceptionLabel(exception)}
											</p>
											<Badge variant="outline">{exception.owner}</Badge>
										</div>
										{"location" in exception && exception.location ? (
											<p className="mt-1 text-xs text-muted-foreground">
												{exception.location}
											</p>
										) : null}
										<p className="mt-1 text-muted-foreground">{exception.reason}</p>
									</div>
								),
							)}
							{selectedSpec.design_system_contract.new_vocabulary_required.length > 0 ? (
								<div className="rounded-md border p-3">
									<p className="font-medium">New vocabulary required</p>
									<div className="mt-2 flex flex-wrap gap-2">
										{selectedSpec.design_system_contract.new_vocabulary_required.map(
											(item) => (
												<Badge key={item} variant="outline">
													{item}
												</Badge>
											),
										)}
									</div>
								</div>
							) : null}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-sm">Computed Signals</CardTitle>
							<CardDescription>
								Computed findings stay outside the spec.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							{benchmarkFindings.length === 0 ? (
								<div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
									No spec-level findings.
								</div>
							) : (
								benchmarkFindings.map((finding) => (
									<div key={`${finding.id}-${finding.message}`} className="rounded-md border p-3">
										<div className="flex items-center justify-between gap-2">
											<p className="text-xs font-semibold">{finding.id}</p>
											<Badge variant="outline">{finding.severity}</Badge>
										</div>
										<p className="mt-1 text-sm text-muted-foreground">
											{finding.message}
										</p>
									</div>
								))
							)}
							<Separator />
							<div className="space-y-1">
								<p className="text-xs font-medium text-muted-foreground">
									Criteria available
								</p>
								<p className="text-sm">{benchmarkCriteria.length} checks</p>
							</div>
						</CardContent>
					</Card>

				</div>
			</aside>
		</main>
	);
}

function ComponentTree({ node, depth = 0 }: { node: ComponentTreeNode; depth?: number }) {
	const children = node.children ?? [];

	return (
		<div className={depth === 0 ? "space-y-2" : "ml-3 border-l pl-3"}>
			<div className="rounded-md border bg-background p-3">
				<div className="flex items-start justify-between gap-2">
					<div className="min-w-0">
						<p className="truncate text-sm font-medium">{node.label}</p>
						{node.meta && node.meta.length > 0 ? (
							<div className="mt-2 flex flex-wrap gap-1.5">
								{node.meta.map((item) => (
									<Badge
										key={item}
										variant={item === "bleed" ? "default" : "outline"}
										className="max-w-full truncate font-normal"
									>
										{item}
									</Badge>
								))}
							</div>
						) : null}
					</div>
					<Badge variant={getTreeBadgeVariant(node.kind)}>{node.kind}</Badge>
				</div>
			</div>
			{children.length > 0 ? (
				<div className="space-y-2 pt-2">
					{children.map((child) => (
						<ComponentTree key={child.id} node={child} depth={depth + 1} />
					))}
				</div>
			) : null}
		</div>
	);
}

function Metric({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-md border p-3">
			<p className="text-xs font-medium text-muted-foreground">{label}</p>
			<p className="mt-1 truncate font-medium">{value}</p>
		</div>
	);
}
