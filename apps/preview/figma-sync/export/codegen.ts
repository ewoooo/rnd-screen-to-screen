import type { ScreenFigmaSpec } from "./traverse";

export function generateFigmaPluginCode(spec: ScreenFigmaSpec): string {
	const generatedAt = new Date().toISOString();
	const banner = [
		"// =============================================",
		"// AUTO-GENERATED — DO NOT EDIT",
		`// screen: ${spec.id} · ${spec.name}`,
		`// generated at: ${generatedAt}`,
		"// Paste into PXDS Figma Bridge plugin → JSON → Figma tab → Run",
		"// =============================================",
		"",
	].join("\n");

	const specJson = JSON.stringify(spec, null, 2);

	const runtime = `
async function findOrCreateComponent(name) {
  const all = await figma.root.findAllWithCriteria({ types: ["COMPONENT"] });
  const found = all.find(function(c) { return c.name === name; });
  if (found) return found;

  const comp = figma.createComponent();
  comp.name = name;
  comp.layoutMode = "VERTICAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "FIXED";
  comp.resize(375, 1);
  comp.paddingLeft = 16; comp.paddingRight = 16;
  comp.paddingTop = 12; comp.paddingBottom = 12;
  comp.fills = [{ type: "SOLID", color: { r: 0.93, g: 0.97, b: 1 } }];
  comp.strokes = [{ type: "SOLID", color: { r: 0.55, g: 0.75, b: 1 } }];
  comp.strokeWeight = 1;
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  var label = figma.createText();
  label.fontName = { family: "Inter", style: "Semi Bold" };
  label.characters = name;
  label.fontSize = 12;
  label.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.3, b: 0.7 } }];
  label.layoutSizingHorizontal = "FILL";
  comp.appendChild(label);
  comp.x = 5000;
  comp.y = figma.currentPage.children.length * 80;
  figma.currentPage.appendChild(comp);
  return comp;
}

async function run() {
  await figma.loadAllPagesAsync();
  var frame = figma.createFrame();
  frame.name = SPEC.id + " · " + SPEC.name;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "FIXED";
  frame.resize(SPEC.width, 1);
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  figma.currentPage.appendChild(frame);

  for (var i = 0; i < SPEC.nodes.length; i++) {
    var node = SPEC.nodes[i];
    try {
      var comp = await findOrCreateComponent(node.figmaName);
      var instance = comp.createInstance();
      instance.layoutSizingHorizontal = "FILL";
      frame.appendChild(instance);
    } catch(e) {
      figma.notify("Error on " + node.figmaName + ": " + (e && e.message ? e.message : e), { error: true });
    }
  }

  figma.viewport.scrollAndZoomIntoView([frame]);
  figma.notify("✓ " + SPEC.name + " (" + SPEC.nodes.length + " components)");
}

run().catch(function(e) {
  figma.notify("Error: " + (e && e.message ? e.message : String(e)), { error: true });
});
`;

	return [
		banner,
		`const SPEC = ${specJson};`,
		"",
		runtime,
	].join("\n");
}
