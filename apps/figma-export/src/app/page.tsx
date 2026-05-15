"use client";

import {
	collectFigmaBridgeRenderTree,
	createDomFigmaBuildCode,
	type FigmaBridgeRenderTree,
} from "@pxds/pxds-figma/dom-export";
import { useRef, useState } from "react";

import { screenConfig } from "../../../mobile/src/app/(cx)/CX-EXAMPLE-TEXT-SECTION-PROOF/Screen.config";
import { Screen } from "../../../mobile/src/app/(cx)/CX-EXAMPLE-TEXT-SECTION-PROOF/Screen";

type ExportMode = "tree" | "code";

export default function FigmaExportPocPage() {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const [tree, setTree] = useState<FigmaBridgeRenderTree | null>(null);
	const [buildCode, setBuildCode] = useState("");
	const [mode, setMode] = useState<ExportMode>("tree");
	const [status, setStatus] = useState("화면을 렌더했습니다. Capture를 눌러 DOM bridge tree를 수집하세요.");

	const capture = () => {
		if (!rootRef.current) {
			setStatus("캡처할 screen root를 찾지 못했습니다.");
			return;
		}
		const nextTree = collectFigmaBridgeRenderTree(rootRef.current, {
			screenId: screenConfig.id,
			screenName: screenConfig.name,
			route: screenConfig.route,
		});
		const nextCode = createDomFigmaBuildCode(nextTree);
		setTree(nextTree);
		setBuildCode(nextCode);
		setMode("tree");
		setStatus(
			`${nextTree.stats.nodeCount}개 노드를 수집했습니다. Generated JS를 Figma bridge plugin에서 실행할 수 있습니다.`,
		);
	};

	const copyTree = async () => {
		if (!tree) return;
		await navigator.clipboard.writeText(JSON.stringify(tree, null, 2));
		setStatus("Render tree JSON을 클립보드에 복사했습니다.");
	};

	const copyCode = async () => {
		if (!buildCode) return;
		await navigator.clipboard.writeText(buildCode);
		setStatus("Generated JS를 클립보드에 복사했습니다.");
	};

	const output =
		mode === "code"
			? buildCode
			: tree
				? JSON.stringify(tree, null, 2)
				: "Capture를 누르면 구조화된 render tree JSON이 표시됩니다.";

	return (
		<main className="figma-export-page">
			<section className="figma-export-preview" aria-label="Rendered mobile screen">
				<div
					ref={rootRef}
					className="figma-export-phone"
					data-figma-screen-root="true"
				>
					<Screen />
				</div>
			</section>

			<aside className="figma-export-panel">
				<section className="figma-export-card">
					<h1>{screenConfig.id}</h1>
					<p>{status}</p>
				</section>

				<section className="figma-export-card">
					<div className="figma-export-actions">
						<button type="button" onClick={capture}>
							Capture
						</button>
						<button
							type="button"
							className="secondary"
							onClick={() => setMode("tree")}
							disabled={!tree}
						>
							View JSON
						</button>
						<button
							type="button"
							className="secondary"
							onClick={() => setMode("code")}
							disabled={!buildCode}
						>
							View JS
						</button>
						<button type="button" className="secondary" onClick={copyTree} disabled={!tree}>
							Copy JSON
						</button>
						<button
							type="button"
							className="secondary"
							onClick={copyCode}
							disabled={!buildCode}
						>
							Copy JS
						</button>
					</div>
				</section>

				{tree ? (
					<section className="figma-export-card">
						<h2>Capture Stats</h2>
						<div className="figma-export-stats">
							<Stat label="nodes" value={tree.stats.nodeCount} />
							<Stat label="components" value={tree.stats.componentCount} />
							<Stat label="layouts" value={tree.stats.layoutCount} />
							<Stat label="slots" value={tree.stats.slotCount} />
							<Stat label="primitives" value={tree.stats.primitiveCount} />
						</div>
					</section>
				) : null}

				<textarea
					className="figma-export-output"
					readOnly
					value={output}
					aria-label={mode === "code" ? "Generated Figma JS" : "Render tree JSON"}
				/>
			</aside>
		</main>
	);
}

function Stat({ label, value }: { label: string; value: number }) {
	return (
		<div className="figma-export-stat">
			<strong>{value}</strong>
			<span>{label}</span>
		</div>
	);
}
