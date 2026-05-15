import type { FigmaBridgeRenderTree } from "./types";

export function createDomFigmaBuildCode(tree: FigmaBridgeRenderTree): string {
	const generatedAt = new Date().toISOString();
	const banner = [
		"// =============================================",
		"// AUTO-GENERATED — PXDS DOM bridge PoC",
		`// source: ${tree.screen.id}`,
		`// generated at: ${generatedAt}`,
		"// Paste into Figma bridge plugin JSON → Figma tab → Run",
		"// Creates raw fallback frames from data-figma-* DOM render tree.",
		"// =============================================",
		"",
	].join("\n");

	return [
		banner,
		`const FIGMA_BRIDGE_TREE = ${JSON.stringify(tree, null, 2)};`,
		"",
		DOM_FIGMA_RUNTIME,
		"",
		"runDomBridgeExport(FIGMA_BRIDGE_TREE).catch(function (error) {",
		"  console.error('PXDS DOM bridge export error:', error);",
		"  figma.notify('PXDS DOM bridge export error: ' + (error && error.message ? error.message : error), { error: true });",
		"});",
		"",
	].join("\n");
}

const DOM_FIGMA_RUNTIME = String.raw`
function px(value, fallback) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return fallback || 0;
  const match = value.match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : (fallback || 0);
}

function rgbaToPaint(value) {
  if (typeof value !== "string") return null;
  const match = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)$/);
  if (!match) return null;
  const alpha = match[4] === undefined ? 1 : Number(match[4]);
  if (alpha === 0) return null;
  return {
    type: "SOLID",
    color: {
      r: Number(match[1]) / 255,
      g: Number(match[2]) / 255,
      b: Number(match[3]) / 255
    },
    opacity: alpha
  };
}

function hasVisibleFill(style) {
  if (!style || !style.backgroundColor) return false;
  return Boolean(rgbaToPaint(style.backgroundColor));
}

function safeName(node) {
  const prefix = node.render || "node";
  const id = node.componentId || node.slot || node.id || "unknown";
  return prefix + "/" + id;
}

async function createText(parent, content, bounds, style) {
  const text = figma.createText();
  const hasKorean = /[\uAC00-\uD7A3]/.test(content);
  const fontWeight = Number(style && style.fontWeight ? style.fontWeight : 400);
  const font = {
    family: hasKorean ? "Pretendard" : "Inter",
    style: fontWeight >= 700 ? "Bold" : fontWeight >= 600 ? "SemiBold" : fontWeight >= 500 ? "Medium" : "Regular"
  };
  try {
    await figma.loadFontAsync(font);
    text.fontName = font;
  } catch (error) {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    text.fontName = { family: "Inter", style: "Regular" };
  }
  text.characters = content.slice(0, 1000);
  text.fontSize = px(style && style.fontSize, 12);
  const lineHeight = px(style && style.lineHeight, 0);
  if (lineHeight > 0) text.lineHeight = { unit: "PIXELS", value: lineHeight };
  const color = rgbaToPaint(style && style.color);
  if (color) text.fills = [color];
  text.textAutoResize = "HEIGHT";
  text.resizeWithoutConstraints(Math.max(1, bounds.width || 1), 1);
  text.x = 0;
  text.y = 0;
  parent.appendChild(text);
  return text;
}

async function createNode(node, parent, isRoot) {
  const frame = figma.createFrame();
  frame.name = isRoot ? ("screen/" + FIGMA_BRIDGE_TREE.screen.id) : safeName(node);
  frame.resizeWithoutConstraints(Math.max(1, node.localBounds.width), Math.max(1, node.localBounds.height));
  frame.x = isRoot ? 80 : node.localBounds.x;
  frame.y = isRoot ? 80 : node.localBounds.y;
  frame.layoutMode = "NONE";
  frame.clipsContent = false;
  frame.setPluginData("pxds-export-source", "dom-bridge-poc");
  frame.setPluginData("pxds-node-id", node.id || "");
  if (node.componentId) frame.setPluginData("pxds-component-id", node.componentId);
  if (node.slot) frame.setPluginData("pxds-slot", node.slot);

  const fill = rgbaToPaint(node.style && node.style.backgroundColor);
  frame.fills = fill ? [fill] : [];
  if (!isRoot && !hasVisibleFill(node.style)) {
    frame.strokes = [{ type: "SOLID", color: { r: 0.84, g: 0.86, b: 0.9 }, opacity: 0.35 }];
    frame.strokeWeight = 1;
  }
  const radius = px(node.style && node.style.borderRadius, 0);
  if (radius > 0) frame.cornerRadius = radius;

  parent.appendChild(frame);

  const children = node.children || [];
  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      await createNode(children[i], frame, false);
    }
  } else if (node.text) {
    await createText(frame, node.text, node.localBounds, node.style || {});
  }
  return frame;
}

async function runDomBridgeExport(tree) {
  const pageName = "DOM Bridge PoC";
  let page = figma.root.children.find(function (child) { return child.type === "PAGE" && child.name === pageName; });
  if (!page) {
    page = figma.createPage();
    page.name = pageName;
  }
  await figma.setCurrentPageAsync(page);
  const frame = await createNode(tree.root, page, true);
  figma.viewport.scrollAndZoomIntoView([frame]);
  figma.notify("PXDS DOM bridge PoC: " + tree.stats.nodeCount + " nodes");
}
`;
