export const FIGMA_VARIABLES_SYNC_RUNTIME_SOURCE = String.raw`
const PXDS_VARIABLE_MAP_PLUGIN_DATA_KEY = "skt-vars";

function isRecord_s(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hexToRgba_s(value) {
  let hex = value.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((char) => char + char).join("");
  let alpha = 1;
  if (hex.length === 8) {
    alpha = parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }
  const int = parseInt(hex.slice(0, 6), 16);
  return {
    r: ((int >> 16) & 255) / 255,
    g: ((int >> 8) & 255) / 255,
    b: (int & 255) / 255,
    a: alpha,
  };
}

function parseFloatValue_s(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return null;
  if (/^-?\d+(\.\d+)?(px|ms|%)?$/.test(value)) return parseFloat(value);
  return null;
}

function inferVariable_s(value) {
  if (typeof value === "string" && /^#[0-9a-f]{3,8}$/i.test(value)) {
    return { type: "COLOR", value: hexToRgba_s(value) };
  }
  const floatValue = parseFloatValue_s(value);
  if (floatValue !== null) return { type: "FLOAT", value: floatValue };
  if (typeof value === "string" && !/^\{.+\}$/.test(value)) {
    return { type: "STRING", value };
  }
  return null;
}

function isAlias_s(value) {
  return typeof value === "string" && /^\{.+\}$/.test(value);
}

function aliasPath_s(value) {
  const match = typeof value === "string" ? value.match(/^\{(.+)\}$/) : null;
  return match ? match[1] : null;
}

function walkTokenLeaves_s(node, visitor, path) {
  const currentPath = path || [];
  if (!isRecord_s(node)) return;
  if ("value" in node) visitor(tokenPathFromSegments_s(currentPath), node.value);
  for (const key in node) {
    if (key === "value") continue;
    walkTokenLeaves_s(node[key], visitor, currentPath.concat(key));
  }
}

function tokenPathFromSegments_s(segments) {
  return segments
    .map(function (segment, index) {
      if (/^[A-Za-z0-9_$-]+$/.test(segment)) {
        return (index === 0 ? "" : ".") + segment;
      }
      return "[\"" + String(segment).replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + "\"]";
    })
    .join("");
}

function parseTokenPath_s(path) {
  const parts = [];
  let current = "";
  for (let i = 0; i < path.length; i++) {
    const char = path[i];
    if (char === ".") {
      if (current) parts.push(current);
      current = "";
      continue;
    }
    if (char === "[") {
      if (current) {
        parts.push(current);
        current = "";
      }
      const quote = path[i + 1];
      if (quote !== "\"" && quote !== "'") {
        let bareValue = "";
        i++;
        for (; i < path.length; i++) {
          if (path[i] === "]") break;
          bareValue += path[i];
        }
        parts.push(bareValue);
        continue;
      }
      i += 2;
      let bracketValue = "";
      for (; i < path.length; i++) {
        const bracketChar = path[i];
        if (bracketChar === "\\" && i + 1 < path.length) {
          bracketValue += path[i + 1];
          i++;
          continue;
        }
        if (bracketChar === quote && path[i + 1] === "]") {
          i++;
          break;
        }
        bracketValue += bracketChar;
      }
      parts.push(bracketValue);
      continue;
    }
    current += char;
  }
  if (current) parts.push(current);
  return parts;
}

function variableSegmentName_s(segment) {
  return String(segment).trim().replace(/[^A-Za-z0-9_$ -]/g, "_").replace(/_+/g, "_") || "_";
}

function variableNameForPath_s(path) {
  return parseTokenPath_s(path).map(variableSegmentName_s).join("/");
}

function tokenNodeAtPath_s(path) {
  const segments = parseTokenPath_s(path);
  let node = DS_TOKENS;
  for (let i = 0; i < segments.length; i++) {
    if (!isRecord_s(node) || !(segments[i] in node)) return null;
    node = node[segments[i]];
  }
  return node;
}

function rawTokenValueAtPath_s(path) {
  const node = tokenNodeAtPath_s(path);
  if (isRecord_s(node) && "value" in node) return node.value;
  return node;
}

function resolveTokenValue_s(value, seen) {
  const visited = seen || {};
  const path = isAlias_s(value) ? aliasPath_s(value) : null;
  if (path) {
    if (visited[path]) return null;
    visited[path] = true;
    return resolveTokenValue_s(rawTokenValueAtPath_s(path), visited);
  }
  if (Array.isArray(value)) {
    return value.map(function (item) {
      return resolveTokenValue_s(item, visited);
    });
  }
  if (isRecord_s(value)) {
    const result = {};
    for (const key in value) result[key] = resolveTokenValue_s(value[key], visited);
    return result;
  }
  return value;
}

function parseNumber_s(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return null;
  const match = value.match(/^-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

function normalizeStyleName_s(family, styleName) {
  if (family === "Inter" && styleName === "SemiBold") return "Semi Bold";
  return styleName;
}

function fallbackFontStyleName_s(weight) {
  if (weight >= 700) return "Bold";
  if (weight >= 600) return "SemiBold";
  if (weight >= 500) return "Medium";
  return "Regular";
}

async function loadFirstAvailableFont_s(style) {
  const primaryFamily = resolveTokenValue_s("{typography.fontFamily.primary}") || "Pretendard";
  const fallbackFamily = resolveTokenValue_s("{typography.fontFamily.fallback}") || "Inter";
  const styleName = typeof style.fontWeightName === "string"
    ? style.fontWeightName
    : fallbackFontStyleName_s(parseNumber_s(style.fontWeight) || 400);
  const families = [primaryFamily, fallbackFamily, "Inter"];
  const tried = {};
  for (let i = 0; i < families.length; i++) {
    const family = String(families[i]);
    const names = [normalizeStyleName_s(family, styleName), styleName, "Regular"];
    for (let j = 0; j < names.length; j++) {
      const fontName = { family, style: names[j] };
      const key = fontName.family + "/" + fontName.style;
      if (tried[key]) continue;
      tried[key] = true;
      try {
        await figma.loadFontAsync(fontName);
        return fontName;
      } catch (error) {}
    }
  }
  return null;
}

function textStyleNameForToken_s(path) {
  const segments = parseTokenPath_s(path);
  const variantName = segments[1] || "style";
  const weightName = segments[2] || "regular";
  const prefix = typeof PXDS_FIGMA_VARIABLES_SYNC_OPTIONS.textStylePrefix === "string"
    ? PXDS_FIGMA_VARIABLES_SYNC_OPTIONS.textStylePrefix.trim()
    : "PXDS";
  const suffix = "Typography/" + variantName + "/" + weightName;
  return prefix ? prefix + "/" + suffix : suffix;
}

function collectTypographyTextStyleTokens_s() {
  const typography = isRecord_s(DS_TOKENS.typography) ? DS_TOKENS.typography : {};
  const reserved = {
    fontFamily: true,
    fontSize: true,
    fontWeight: true,
    fontWeightName: true,
    letterSpacing: true,
    lineHeight: true,
  };
  const result = [];
  for (const variantName in typography) {
    if (reserved[variantName] || !isRecord_s(typography[variantName])) continue;
    const variantNode = typography[variantName];
    for (const weightName in variantNode) {
      const styleNode = variantNode[weightName];
      if (!isRecord_s(styleNode) || !("value" in styleNode)) continue;
      const path = "typography." + variantName + "." + weightName;
      const styleValue = resolveTokenValue_s(styleNode.value);
      if (isRecord_s(styleValue)) result.push({ path, styleValue });
    }
  }
  return result;
}

async function syncPxdsFigmaTextStyles_s() {
  if (PXDS_FIGMA_VARIABLES_SYNC_OPTIONS.includeTextStyles === false) {
    return { created: 0, updated: 0, skipped: 0 };
  }

  const textStyles = await figma.getLocalTextStylesAsync();
  const existingByName = {};
  for (let i = 0; i < textStyles.length; i++) existingByName[textStyles[i].name] = textStyles[i];

  const stats = { created: 0, updated: 0, skipped: 0 };
  const tokens = collectTypographyTextStyleTokens_s();
  for (let i = 0; i < tokens.length; i++) {
    const entry = tokens[i];
    const fontSize = parseNumber_s(entry.styleValue.fontSize);
    const lineHeight = parseNumber_s(entry.styleValue.lineHeight);
    const letterSpacing = parseNumber_s(entry.styleValue.letterSpacing);
    if (fontSize == null || lineHeight == null) {
      stats.skipped++;
      continue;
    }

    const fontName = await loadFirstAvailableFont_s(entry.styleValue);
    if (!fontName) {
      stats.skipped++;
      continue;
    }

    const styleName = textStyleNameForToken_s(entry.path);
    let textStyle = existingByName[styleName];
    if (!textStyle) {
      textStyle = figma.createTextStyle();
      textStyle.name = styleName;
      existingByName[styleName] = textStyle;
      stats.created++;
    } else {
      stats.updated++;
    }

    textStyle.fontName = fontName;
    textStyle.fontSize = fontSize;
    textStyle.lineHeight = { value: lineHeight, unit: "PIXELS" };
    textStyle.letterSpacing = { value: letterSpacing == null ? 0 : letterSpacing, unit: "PIXELS" };
    textStyle.description = "PXDS typography token: " + entry.path;
  }

  console.log("PXDS Figma Text Styles synced", stats);
  return stats;
}

function colorEquals_s(a, b) {
  if (!a || typeof a !== "object") return false;
  return (
    Math.abs((a.r || 0) - b.r) < 0.001 &&
    Math.abs((a.g || 0) - b.g) < 0.001 &&
    Math.abs((a.b || 0) - b.b) < 0.001 &&
    Math.abs((a.a == null ? 1 : a.a) - (b.a == null ? 1 : b.a)) < 0.001
  );
}

function valueEquals_s(type, currentValue, nextValue) {
  if (type === "COLOR") return colorEquals_s(currentValue, nextValue);
  return currentValue === nextValue;
}

async function getExistingVariablesByName_s(collection) {
  const result = {};
  for (let i = 0; i < collection.variableIds.length; i++) {
    try {
      const variable = await figma.variables.getVariableByIdAsync(collection.variableIds[i]);
      if (variable) result[variable.name] = variable;
    } catch (error) {}
  }
  return result;
}

async function findOrCreateCollection_s(name) {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  let collection = collections.find((item) => item.name === name);
  if (!collection) collection = figma.variables.createVariableCollection(name);
  return collection;
}

function createVariable_s(variableName, collection, type) {
  try {
    return figma.variables.createVariable(variableName, collection, type);
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    throw new Error("createVariable failed for \"" + variableName + "\": " + message);
  }
}

async function syncPxdsFigmaVariables() {
  if (figma.loadAllPagesAsync) await figma.loadAllPagesAsync();

  const collection = await findOrCreateCollection_s(PXDS_FIGMA_VARIABLES_SYNC_OPTIONS.collectionName);
  const modeId = collection.modes[0].modeId;
  const existingByName = await getExistingVariablesByName_s(collection);
  const idMap = {};
  const pathToVar = {};
  const stats = { created: 0, updated: 0, unchanged: 0, skipped: 0, typeRecreated: 0 };
  const allTokens = [];

  walkTokenLeaves_s(DS_TOKENS, function (path, rawValue) {
    allTokens.push({ path, rawValue });
  });

  function upsertLiteral(path, rawValue) {
    const inferred = inferVariable_s(rawValue);
    if (!path || !inferred) {
      stats.skipped++;
      return null;
    }

    const variableName = variableNameForPath_s(path);
    let variable = existingByName[variableName];
    let recreatedForType = false;

    if (variable && variable.resolvedType !== inferred.type) {
      try { variable.remove(); } catch (error) {}
      delete existingByName[variableName];
      variable = null;
      recreatedForType = true;
      stats.typeRecreated++;
    }

    const didExist = Boolean(variable);
    if (!variable) {
      variable = createVariable_s(variableName, collection, inferred.type);
      existingByName[variableName] = variable;
      if (!recreatedForType) stats.created++;
    }

    const currentValue = variable.valuesByMode[modeId];
    if (!valueEquals_s(inferred.type, currentValue, inferred.value)) {
      variable.setValueForMode(modeId, inferred.value);
      if (didExist) stats.updated++;
    } else if (didExist) {
      stats.unchanged++;
    }

    idMap[path] = variable.id;
    pathToVar[path] = variable;
    return variable;
  }

  function upsertAlias(path, rawValue) {
    const targetPath = aliasPath_s(rawValue);
    const targetVariable = targetPath ? pathToVar[targetPath] : null;
    if (!targetVariable) return "defer";

    const variableName = variableNameForPath_s(path);
    let variable = existingByName[variableName];
    let recreatedForType = false;

    if (variable && variable.resolvedType !== targetVariable.resolvedType) {
      try { variable.remove(); } catch (error) {}
      delete existingByName[variableName];
      variable = null;
      recreatedForType = true;
      stats.typeRecreated++;
    }

    const didExist = Boolean(variable);
    if (!variable) {
      variable = createVariable_s(variableName, collection, targetVariable.resolvedType);
      existingByName[variableName] = variable;
      if (!recreatedForType) stats.created++;
    }

    const currentValue = variable.valuesByMode[modeId];
    const nextValue = { type: "VARIABLE_ALIAS", id: targetVariable.id };
    if (!currentValue || currentValue.type !== "VARIABLE_ALIAS" || currentValue.id !== targetVariable.id) {
      variable.setValueForMode(modeId, nextValue);
      if (didExist) stats.updated++;
    } else if (didExist) {
      stats.unchanged++;
    }

    idMap[path] = variable.id;
    pathToVar[path] = variable;
    return variable;
  }

  for (let i = 0; i < allTokens.length; i++) {
    const entry = allTokens[i];
    if (isAlias_s(entry.rawValue)) continue;
    upsertLiteral(entry.path, entry.rawValue);
  }

  let remaining = allTokens.filter(function (entry) {
    return isAlias_s(entry.rawValue);
  });
  let iteration = 0;
  while (remaining.length > 0 && iteration < 20) {
    iteration++;
    const next = [];
    let progressed = false;
    for (let i = 0; i < remaining.length; i++) {
      const result = upsertAlias(remaining[i].path, remaining[i].rawValue);
      if (result === "defer") next.push(remaining[i]);
      else if (result) progressed = true;
    }
    remaining = next;
    if (!progressed) break;
  }

  if (remaining.length > 0) {
    stats.skipped += remaining.length;
    console.warn("Unresolved PXDS figma variable aliases: " + remaining.length);
  }

  figma.root.setPluginData(PXDS_VARIABLE_MAP_PLUGIN_DATA_KEY, JSON.stringify(idMap));
  const textStyleStats = await syncPxdsFigmaTextStyles_s();
  const total = Object.keys(idMap).length;
  const changed = stats.created + stats.updated + stats.typeRecreated;
  console.log("PXDS Figma Variables synced", { total, changed, stats, textStyleStats });
  figma.notify(
    "PXDS variables synced: " + changed + " changed / " + total + " mapped" +
    " · text styles " + (textStyleStats.created + textStyleStats.updated) + " changed"
  );
}
`;
