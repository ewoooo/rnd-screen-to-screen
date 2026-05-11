export const PAGE_GENERATOR_RUNTIME_SOURCE = String.raw`
const PXDS_VARIABLE_MAP_PLUGIN_DATA_KEY = "skt-vars";

let _varMapCache = null;
let _varObjCache = null;

function getVariableMap_p() {
  if (_varMapCache) return _varMapCache;
  try {
    const raw = figma.root.getPluginData(PXDS_VARIABLE_MAP_PLUGIN_DATA_KEY);
    _varMapCache = raw ? JSON.parse(raw) : {};
  } catch (error) {
    _varMapCache = {};
  }
  return _varMapCache;
}

async function ensureVariableObjects_p() {
  if (_varObjCache !== null) return;
  _varObjCache = {};
  try {
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    for (let i = 0; i < collections.length; i++) {
      const collection = collections[i];
      for (let j = 0; j < collection.variableIds.length; j++) {
        const id = collection.variableIds[j];
        try {
          const variable = await figma.variables.getVariableByIdAsync(id);
          if (variable) _varObjCache[id] = variable;
        } catch (error) {}
      }
    }
  } catch (error) {
    console.warn("PXDS page export variable load failed:", error && error.message ? error.message : error);
  }
}

function tokenPathOf_p(ref) {
  const match = typeof ref === "string" ? ref.match(/^\{(.+)\}$/) : null;
  return match ? match[1] : null;
}

function findVariable_p(ref) {
  if (!_varObjCache) return null;
  const path = tokenPathOf_p(ref);
  if (!path) return null;
  const variableMap = getVariableMap_p();
  const id = variableMap[path] || variableMap[toColorTokenPath_p(path)];
  return id ? _varObjCache[id] || null : null;
}

function getTokenNode_p(tokens, path) {
  return getTokenNodeByParts_p(tokens, String(path || "").split(".")) || getTokenNodeByParts_p(tokens, toColorTokenPath_p(path).split("."));
}

function getTokenNodeByParts_p(tokens, parts) {
  let current = tokens;
  for (let i = 0; i < parts.length; i++) {
    if (!current || typeof current !== "object") return null;
    current = current[parts[i]];
  }
  return current || null;
}

function toColorTokenPath_p(path) {
  const normalized = String(path || "");
  if (normalized.indexOf("semantic.") === 0) return "color." + normalized;
  if (normalized.indexOf("atomic.") === 0) return "color." + normalized;
  return normalized;
}

function resolveToken_p(tokens, ref) {
  const path = tokenPathOf_p(ref);
  if (!path) return ref;
  const node = getTokenNode_p(tokens, path);
  if (!node || typeof node !== "object" || !("value" in node)) return ref;
  const value = node.value;
  if (typeof value === "string" && /^\{.+\}$/.test(value)) {
    return resolveToken_p(tokens, value);
  }
  return value;
}

function parsePx_p(tokens, ref, fallback) {
  const resolved = resolveToken_p(tokens, ref);
  if (typeof resolved === "number") return resolved;
  if (typeof resolved === "string") {
    const match = resolved.match(/^-?\d+(\.\d+)?/);
    if (match) return Number(match[0]);
  }
  return fallback;
}

function hexToPaint_p(value) {
  if (typeof value !== "string" || !/^#[0-9a-f]{6,8}$/i.test(value)) return null;
  let hex = value.slice(1);
  let opacity = 1;
  if (hex.length === 8) {
    opacity = parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }
  const int = parseInt(hex, 16);
  return {
    type: "SOLID",
    color: {
      r: ((int >> 16) & 255) / 255,
      g: ((int >> 8) & 255) / 255,
      b: (int & 255) / 255,
    },
    opacity,
  };
}

function rgbToPaint_p(value) {
  if (typeof value !== "string") return null;
  const match = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)$/);
  if (!match) return null;
  const opacity = match[4] === undefined ? 1 : Number(match[4]);
  if (opacity === 0) return null;
  return {
    type: "SOLID",
    color: {
      r: Number(match[1]) / 255,
      g: Number(match[2]) / 255,
      b: Number(match[3]) / 255,
    },
    opacity,
  };
}

function applyFillRef_p(node, ref, tokens) {
  const variable = findVariable_p(ref);
  const resolved = resolveToken_p(tokens, ref);
  const paint = hexToPaint_p(resolved) || { type: "SOLID", color: { r: 1, g: 1, b: 1 } };
  if (variable) {
    paint.boundVariables = { color: { type: "VARIABLE_ALIAS", id: variable.id } };
  }
  node.fills = [paint];
}

async function createLabel_p(text, parent, options) {
  const node = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: options && options.bold ? "Bold" : "Regular" });
  node.fontName = { family: "Inter", style: options && options.bold ? "Bold" : "Regular" };
  node.characters = text;
  node.fontSize = options && options.size ? options.size : 12;
  if (options && options.lineHeight) node.lineHeight = { unit: "PIXELS", value: options.lineHeight };
  if (options && options.width) {
    node.textAutoResize = "HEIGHT";
    node.resizeWithoutConstraints(options.width, 1);
  }
  node.fills = [{ type: "SOLID", color: options && options.color ? options.color : { r: 0.16, g: 0.16, b: 0.16 } }];
  parent.appendChild(node);
  return node;
}

function createAutoFrame_p(name, direction) {
  const frame = figma.createFrame();
  frame.name = name;
  frame.layoutMode = direction || "VERTICAL";
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "FIXED";
  frame.itemSpacing = 8;
  frame.paddingTop = 12;
  frame.paddingRight = 12;
  frame.paddingBottom = 12;
  frame.paddingLeft = 12;
  frame.cornerRadius = 8;
  frame.strokes = [{ type: "SOLID", color: { r: 0.86, g: 0.86, b: 0.86 } }];
  frame.strokeWeight = 1;
  return frame;
}

function dataByBind_p(ctx, bind) {
  if (!bind || typeof bind !== "string") return null;
  const parts = bind.split(".");
  let current = ctx.data;
  for (let i = 0; i < parts.length; i++) {
    if (!current || typeof current !== "object") return null;
    current = current[parts[i]];
  }
  return current || null;
}

function createRawText_p(parent, text, x, y, options) {
  return createLabel_p(text, parent, {
    bold: options && options.bold,
    size: options && options.size,
    lineHeight: options && options.lineHeight,
    color: options && options.color,
    width: options && options.width,
  }).then(function (node) {
    node.x = x;
    node.y = y;
    return node;
  });
}

function createAbsoluteFrame_p(name, parent, x, y, width, height) {
  const frame = figma.createFrame();
  frame.name = name;
  frame.resizeWithoutConstraints(width, height);
  frame.x = x;
  frame.y = y;
  frame.fills = [];
  parent.appendChild(frame);
  return frame;
}

async function renderNcTopBar_p(spec, parent, ctx) {
  const props = spec.props || {};
  const frame = createAbsoluteFrame_p("NcTopBar · " + spec.id, parent, 0, 0, 375, 128);
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  frame.setPluginData("pxds-component-type", spec.type);

  await createRawText_p(frame, "7:28", 24, 20, { bold: true, size: 16, lineHeight: 20, color: { r: 0.08, g: 0.08, b: 0.09 } });
  await createRawText_p(frame, "▮▮▮  ◥  ▰", 282, 20, { bold: true, size: 13, lineHeight: 16, color: { r: 0.08, g: 0.08, b: 0.09 } });
  await createRawText_p(frame, props.leadingIcon === "back" ? "‹" : "×", 26, 72, { size: 34, lineHeight: 34, color: { r: 0.08, g: 0.08, b: 0.09 } });
  await createRawText_p(frame, String(props.title || ""), 160, 78, { bold: true, size: 17, lineHeight: 22, color: { r: 0.02, g: 0.02, b: 0.03 } });

  if (props.progressStep && props.progressTotal) {
    const progress = figma.createRectangle();
    progress.name = "progress";
    progress.resizeWithoutConstraints(375 * (Number(props.progressStep) / Number(props.progressTotal)), 2);
    progress.x = 0;
    progress.y = 126;
    progress.fills = [{ type: "SOLID", color: { r: 0.02, g: 0.42, b: 1 } }];
    frame.appendChild(progress);
  }
  return frame;
}

async function renderNcHero_p(spec, parent, ctx, y) {
  const data = dataByBind_p(ctx, spec.props && spec.props.bind) || {};
  const frame = createAbsoluteFrame_p("NcHero · " + spec.id, parent, 0, y, 375, 176);
  const title = Array.isArray(data.titleLines) ? data.titleLines.join("\\n") : String(data.title || "");
  await createRawText_p(frame, title, 24, 24, { bold: true, size: 28, lineHeight: 38, width: 327, color: { r: 0.08, g: 0.08, b: 0.09 } });
  if (data.description) {
    await createRawText_p(frame, String(data.description), 24, 116, { bold: true, size: 15, lineHeight: 26, width: 327, color: { r: 0.53, g: 0.53, b: 0.55 } });
  }
  return frame;
}

function drawCheckbox_p(parent, x, y) {
  const box = figma.createRectangle();
  box.name = "checkbox";
  box.resizeWithoutConstraints(18, 18);
  box.x = x;
  box.y = y;
  box.cornerRadius = 4;
  box.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  box.strokes = [{ type: "SOLID", color: { r: 0.86, g: 0.87, b: 0.88 } }];
  box.strokeWeight = 1.5;
  parent.appendChild(box);
  return box;
}

async function renderTermsAgreementGroup_p(spec, parent, ctx, y) {
  const data = dataByBind_p(ctx, spec.props && spec.props.bind) || {};
  const items = Array.isArray(data.items) ? data.items : [];
  const height = 76 + 68 + items.length * 64 + 72;
  const frame = createAbsoluteFrame_p("TermsAgreementGroup · " + spec.id, parent, 0, y, 375, height);
  await createRawText_p(frame, String(data.title || "약관 동의"), 24, 20, { bold: true, size: 18, lineHeight: 24, color: { r: 0.08, g: 0.08, b: 0.09 } });

  let rowY = 78;
  drawCheckbox_p(frame, 28, rowY + 7);
  await createRawText_p(frame, String(data.allLabel || "전체 동의"), 60, rowY, { bold: true, size: 17, lineHeight: 24, color: { r: 0.08, g: 0.08, b: 0.09 } });
  if (data.allCaption) await createRawText_p(frame, String(data.allCaption), 60, rowY + 28, { bold: true, size: 12, lineHeight: 18, color: { r: 0.55, g: 0.55, b: 0.57 } });
  rowY += 64;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const line = figma.createRectangle();
    line.name = "divider";
    line.resizeWithoutConstraints(327, 1);
    line.x = 24;
    line.y = rowY - 8;
    line.fills = [{ type: "SOLID", color: { r: 0.88, g: 0.88, b: 0.88 } }];
    frame.appendChild(line);
    drawCheckbox_p(frame, 28, rowY + 8);
    await createRawText_p(frame, String(item.title || ""), 60, rowY, { bold: true, size: 16, lineHeight: 23, width: 260, color: { r: 0.08, g: 0.08, b: 0.09 } });
    const caption = item.required ? "필수 · " + (item.caption || "") : "선택 · " + (item.caption || "");
    await createRawText_p(frame, caption, 60, rowY + 27, { bold: true, size: 12, lineHeight: 18, width: 260, color: item.required ? { r: 1, g: 0.2, b: 0.2 } : { r: 0.55, g: 0.55, b: 0.57 } });
    rowY += 64;
  }

  await createRawText_p(frame, "3개의 필수 약관 동의가 필요합니다.", 24, rowY + 8, { bold: true, size: 13, lineHeight: 20, color: { r: 1, g: 0.2, b: 0.2 } });
  return frame;
}

async function renderNcNotice_p(spec, parent, ctx, y) {
  const props = spec.props || {};
  if (props.visibleWhen === "user.isMinor") return null;
  const data = dataByBind_p(ctx, props.bind) || {};
  const frame = createAbsoluteFrame_p("NcNotice · " + spec.id, parent, 24, y, 327, 72);
  frame.cornerRadius = 8;
  frame.fills = [{ type: "SOLID", color: { r: 0.97, g: 0.97, b: 0.98 } }];
  await createRawText_p(frame, String(data.text || ""), 14, 14, { size: 13, lineHeight: 20, width: 299, color: { r: 0.35, g: 0.35, b: 0.37 } });
  return frame;
}

async function renderNcContinueBar_p(spec, parent, ctx) {
  const data = dataByBind_p(ctx, spec.props && spec.props.bind) || {};
  const frame = createAbsoluteFrame_p("NcContinueBar · " + spec.id, parent, 0, 704, 375, 108);
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  await createRawText_p(frame, "필수 약관 3개 동의가 남았어요", 24, 10, { bold: true, size: 13, lineHeight: 20, color: { r: 1, g: 0.2, b: 0.2 } });
  const button = figma.createFrame();
  button.name = "disabled CTA";
  button.resizeWithoutConstraints(327, 48);
  button.x = 24;
  button.y = 48;
  button.cornerRadius = 12;
  button.fills = [{ type: "SOLID", color: { r: 0.95, g: 0.95, b: 0.96 } }];
  frame.appendChild(button);
  await createRawText_p(button, String(data.primaryAction || "계속하기"), 104, 14, { bold: true, size: 15, lineHeight: 20, color: { r: 0.72, g: 0.72, b: 0.74 } });
  return frame;
}

async function renderAppScreen_p(spec, parent, ctx) {
  const children = spec.children || [];
  const top = children.find(function (child) { return child.slot === "top"; });
  const bottom = children.find(function (child) { return child.slot === "bottom"; });
  const content = children.filter(function (child) { return child.slot === "content"; });
  if (top) await renderPageNode_p(top, parent, ctx, 0);
  let y = 128;
  for (let i = 0; i < content.length; i++) {
    const node = await renderPageNode_p(content[i], parent, ctx, y);
    if (node) y += node.height + 4;
  }
  if (bottom) await renderPageNode_p(bottom, parent, ctx, 704);
  return parent;
}

async function renderPageNode_p(spec, parent, ctx, y) {
  if (spec.props && spec.props.exportSource === "screen-tree") return renderScreenTreeNode_p(spec, parent, ctx);
  if (spec.type === "AppScreen") return renderAppScreen_p(spec, parent, ctx);
  if (spec.type === "NcTopBar") return renderNcTopBar_p(spec, parent, ctx);
  if (spec.type === "NcHero") return renderNcHero_p(spec, parent, ctx, y || 0);
  if (spec.type === "TermsAgreementGroup") return renderTermsAgreementGroup_p(spec, parent, ctx, y || 0);
  if (spec.type === "NcNotice") return renderNcNotice_p(spec, parent, ctx, y || 0);
  if (spec.type === "NcContinueBar") return renderNcContinueBar_p(spec, parent, ctx);
  return createPageNode_p(spec, parent, 0);
}

async function renderScreenTreeNode_p(spec, parent, ctx) {
  const props = spec.props || {};
  const local = props.localBounds || props.bounds || {};
  const width = Math.max(1, Number(local.width) || 1);
  const height = Math.max(1, Number(local.height) || 1);
  const frame = figma.createFrame();
  frame.name = spec.type + " · " + spec.id;
  frame.resizeWithoutConstraints(width, height);
  frame.x = Number(local.x) || 0;
  frame.y = Number(local.y) || 0;
  frame.layoutMode = "NONE";
  frame.clipsContent = false;
  frame.setPluginData("pxds-node-id", spec.id);
  frame.setPluginData("pxds-component-type", spec.type);
  frame.setPluginData("pxds-component-id", spec.componentId);
  frame.setPluginData("pxds-export-source", "screen-tree");

  const style = props.style || {};
  const backgroundPaint = rgbToPaint_p(style.backgroundColor);
  if (backgroundPaint) {
    frame.fills = [backgroundPaint];
  } else if (spec.type === "AppScreenRoot" || spec.type === "AppScreenContent") {
    applyFillRef_p(frame, "{color.semantic.surface.page.normal}", ctx.tokens);
  } else {
    frame.fills = [];
  }

  if (style.borderRadius) {
    const radiusMatch = String(style.borderRadius).match(/\d+(\.\d+)?/);
    if (radiusMatch) frame.cornerRadius = Number(radiusMatch[0]);
  }

  if (spec.type !== "AppScreenRoot" && spec.type !== "AppScreenContent") {
    frame.strokes = [{ type: "SOLID", color: { r: 0.84, g: 0.84, b: 0.86 }, opacity: 0.45 }];
    frame.strokeWeight = 1;
  }

  parent.appendChild(frame);

  if (props.text) {
    await createRawText_p(frame, String(props.text).slice(0, 500), 0, 0, {
      size: 12,
      lineHeight: 18,
      width: Math.max(1, width),
      color: { r: 0.08, g: 0.08, b: 0.09 },
    });
  }

  const children = spec.children || [];
  for (let i = 0; i < children.length; i++) {
    await renderScreenTreeNode_p(children[i], frame, ctx);
  }
  return frame;
}

async function createPageNode_p(spec, parent, depth) {
  const isRegistered = Boolean(spec.registered);
  const name = (isRegistered ? "registered/" : "missing/") + spec.type + " · " + spec.id;
  const frame = createAutoFrame_p(name, "VERTICAL");
  frame.resizeWithoutConstraints(Math.max(120, 327 - depth * 16), 80);
  frame.setPluginData("pxds-node-id", spec.id);
  frame.setPluginData("pxds-component-type", spec.type);
  frame.setPluginData("pxds-component-id", spec.componentId);
  frame.setPluginData("pxds-registered", String(isRegistered));
  frame.fills = [{ type: "SOLID", color: isRegistered ? { r: 0.96, g: 0.98, b: 1 } : { r: 0.98, g: 0.98, b: 0.98 } }];
  parent.appendChild(frame);

  await createLabel_p(spec.type, frame, { bold: true, size: 13, color: isRegistered ? { r: 0.02, g: 0.28, b: 0.65 } : { r: 0.45, g: 0.45, b: 0.45 } });
  await createLabel_p(spec.componentId + (isRegistered ? " · registered" : " · missing spec"), frame, { size: 10, color: { r: 0.45, g: 0.45, b: 0.45 } });
  if (spec.slot) await createLabel_p("slot: " + spec.slot, frame, { size: 10, color: { r: 0.48, g: 0.28, b: 0.78 } });
  if (spec.props) {
    const propsText = JSON.stringify(spec.props);
    await createLabel_p(propsText.length > 180 ? propsText.slice(0, 180) + "…" : propsText, frame, { size: 9, color: { r: 0.35, g: 0.35, b: 0.35 } });
  }

  const children = spec.children || [];
  for (let i = 0; i < children.length; i++) {
    await createPageNode_p(children[i], frame, depth + 1);
  }
  return frame;
}

async function generatePageFrame(PAGE_SPEC, DS_TOKENS) {
  await ensureVariableObjects_p();
  const root = figma.createFrame();
  root.name = "page/" + PAGE_SPEC.id + " · " + PAGE_SPEC.name;
  root.resizeWithoutConstraints(PAGE_SPEC.frame.width, PAGE_SPEC.frame.height);
  root.layoutMode = "NONE";
  root.primaryAxisSizingMode = "FIXED";
  root.counterAxisSizingMode = "FIXED";
  root.clipsContent = false;
  root.setPluginData("pxds-page-id", PAGE_SPEC.id);
  root.setPluginData("pxds-page-route", PAGE_SPEC.route);
  applyFillRef_p(root, PAGE_SPEC.frame.background, DS_TOKENS);
  figma.currentPage.appendChild(root);
  await renderPageNode_p(PAGE_SPEC.root, root, { data: PAGE_SPEC.data || {}, tokens: DS_TOKENS }, 0);
  figma.viewport.scrollAndZoomIntoView([root]);
  figma.notify("PXDS page export: " + PAGE_SPEC.name);
  return root;
}
`;
