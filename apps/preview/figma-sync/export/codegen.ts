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
async function findOrCreateComponent(name, variant) {
  const all = await figma.root.findAllWithCriteria({ types: ["COMPONENT"] });

  if (variant) {
    const found = all.find(function(c) {
      return c.name === variant && c.parent && c.parent.name === name;
    });
    if (found) return found;
  }

  const found = all.find(function(c) { return c.name === name; });
  if (found) return found;

  const comp = figma.createComponent();
  comp.name = variant ? (name + " / " + variant) : name;
  comp.layoutMode = "VERTICAL";
  comp.primaryAxisSizingMode = "FIXED";
  comp.counterAxisSizingMode = "FIXED";
  comp.resize(375, 48);
  comp.paddingLeft = 16; comp.paddingRight = 16;
  comp.paddingTop = 12; comp.paddingBottom = 12;
  comp.fills = [{ type: "SOLID", color: { r: 0.93, g: 0.97, b: 1 } }];
  comp.strokes = [{ type: "SOLID", color: { r: 0.55, g: 0.75, b: 1 } }];
  comp.strokeWeight = 1;
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  var label = figma.createText();
  label.fontName = { family: "Inter", style: "Semi Bold" };
  label.characters = comp.name;
  label.fontSize = 12;
  label.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.3, b: 0.7 } }];
  comp.appendChild(label);
  label.layoutSizingHorizontal = "FILL";
  comp.x = 5000;
  comp.y = figma.currentPage.children.length * 80;
  figma.currentPage.appendChild(comp);
  return comp;
}

async function applyTextOverrides(instance, overrides) {
  var keys = Object.keys(overrides);
  if (keys.length === 0) return;
  var textNodes = instance.findAll(function(n) { return n.type === "TEXT"; });
  for (var i = 0; i < keys.length; i++) {
    var layerName = keys[i];
    var value = overrides[layerName];
    var target = textNodes.find(function(n) { return n.name === layerName; });
    if (!target) continue;
    try {
      await figma.loadFontAsync(target.fontName);
      target.characters = value;
    } catch(e) {
      figma.notify("textOverride failed (" + layerName + "): " + (e && e.message || e), { error: true });
    }
  }
}

async function appendInstance(parent, node) {
  var comp = await findOrCreateComponent(node.figmaName, node.figmaVariant);
  var instance = comp.createInstance();
  parent.appendChild(instance);
  try { instance.layoutSizingHorizontal = "FILL"; } catch(e) {}

  // 1. 최상위 component properties
  if (node.figmaProps && Object.keys(node.figmaProps).length > 0) {
    try { instance.setProperties(node.figmaProps); } catch(e) {
      figma.notify("setProperties failed (" + node.figmaName + "): " + (e && e.message || e), { error: true });
    }
  }

  // 2. 중첩 인스턴스 properties — 텍스트 오버라이드 전에 적용 (레이어 노출)
  if (node.nestedInstanceProps) {
    var nestedKeys = Object.keys(node.nestedInstanceProps);
    for (var ni = 0; ni < nestedKeys.length; ni++) {
      var nestedName = nestedKeys[ni];
      var nestedOverride = node.nestedInstanceProps[nestedName];
      var nestedInst = instance.findOne(function(n) { return n.type === "INSTANCE" && n.name === nestedName; });
      if (!nestedInst) continue;
      if (nestedOverride.properties && Object.keys(nestedOverride.properties).length > 0) {
        try { nestedInst.setProperties(nestedOverride.properties); } catch(e) {
          figma.notify("nested setProperties failed (" + nestedName + "): " + (e && e.message || e), { error: true });
        }
      }
    }
  }

  // 3. 텍스트 오버라이드 (최상위 + 중첩 인스턴스 포함)
  var allTextOverrides = Object.assign({}, node.textOverrides || {});
  if (node.nestedInstanceProps) {
    var nKeys = Object.keys(node.nestedInstanceProps);
    for (var nj = 0; nj < nKeys.length; nj++) {
      var no = node.nestedInstanceProps[nKeys[nj]];
      if (no.textOverrides) Object.assign(allTextOverrides, no.textOverrides);
    }
  }
  if (Object.keys(allTextOverrides).length > 0) {
    await applyTextOverrides(instance, allTextOverrides);
  }
}

async function appendFrame(parent, node) {
  var frame = figma.createFrame();
  frame.name = node.name;
  frame.layoutMode = node.direction === "HORIZONTAL" ? "HORIZONTAL" : "VERTICAL";
  frame.primaryAxisSizingMode = "AUTO";
  frame.itemSpacing = node.gap || 0;
  frame.paddingTop = node.paddingTop || 0;
  frame.paddingBottom = node.paddingBottom || 0;
  frame.paddingLeft = node.paddingLeft || 0;
  frame.paddingRight = node.paddingRight || 0;
  frame.fills = [];
  parent.appendChild(frame);
  try { frame.layoutSizingHorizontal = "FILL"; } catch(e) {}

  for (var i = 0; i < node.children.length; i++) {
    await appendNode(frame, node.children[i]);
  }
}

async function appendNode(parent, node) {
  if (node.type === "frame") {
    await appendFrame(parent, node);
  } else {
    await appendInstance(parent, node);
  }
}

async function appendSlotFrame(parent, slotName, nodes, opts) {
  if (!nodes || nodes.length === 0) return null;
  var f = figma.createFrame();
  f.name = slotName;
  f.layoutMode = "VERTICAL";
  f.primaryAxisSizingMode = opts.primarySizing || "AUTO";
  f.counterAxisSizingMode = "AUTO";
  f.itemSpacing = opts.gap || 0;
  f.paddingTop    = opts.paddingTop    || 0;
  f.paddingBottom = opts.paddingBottom || 0;
  f.paddingLeft   = opts.paddingLeft   || 0;
  f.paddingRight  = opts.paddingRight  || 0;
  f.fills = [];
  parent.appendChild(f);
  f.layoutSizingHorizontal = "FILL";
  if (opts.verticalSizing) f.layoutSizingVertical = opts.verticalSizing;
  for (var i = 0; i < nodes.length; i++) {
    try { await appendNode(f, nodes[i]); }
    catch(e) { figma.notify(slotName + ": " + (nodes[i].figmaName || nodes[i].name) + " — " + (e && e.message || e), { error: true }); }
  }
  return f;
}

async function run() {
  await figma.loadAllPagesAsync();

  // 루트: AppScreen
  var appScreen = figma.createFrame();
  appScreen.name = "AppScreen";
  appScreen.layoutMode = "VERTICAL";
  appScreen.primaryAxisSizingMode = "FIXED";
  appScreen.counterAxisSizingMode = "FIXED";
  appScreen.resize(SPEC.width, SPEC.height);
  appScreen.itemSpacing = 0;
  appScreen.paddingLeft = 0; appScreen.paddingRight = 0;
  appScreen.paddingTop = 0;  appScreen.paddingBottom = 0;
  appScreen.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  figma.currentPage.appendChild(appScreen);

  var slots = SPEC.slots;

  // AppScreen.SystemHeader
  await appendSlotFrame(appScreen, "SystemHeader", slots.systemHeader, { gap: 0 });

  // AppScreen.Header
  await appendSlotFrame(appScreen, "Header", slots.header, { gap: 0 });

  // AppScreen.Content — 좌우 12px, 하단 16px, flex-grow
  await appendSlotFrame(appScreen, "Content", slots.content, {
    gap: 0,
    paddingLeft: 12, paddingRight: 12,
    paddingTop: 0,   paddingBottom: 16,
    verticalSizing: "FILL",
  });

  // AppScreen.Bottom
  await appendSlotFrame(appScreen, "Bottom", slots.bottom, { gap: 0 });

  var total = (slots.systemHeader.length + slots.header.length + slots.content.length + slots.bottom.length);
  figma.viewport.scrollAndZoomIntoView([appScreen]);
  figma.notify("✓ " + SPEC.name + " (" + total + " components)");
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
