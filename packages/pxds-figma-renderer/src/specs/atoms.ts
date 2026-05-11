import type { ComponentSpecDraft } from "../types";
import {
	dividerFigmaSpec as dividerComponentFigmaSpec,
	placeholderFigmaSpec as placeholderComponentFigmaSpec,
} from "@pxds/pxds-components/feedback";
import { textBlockFigmaSpec as textBlockComponentFigmaSpec } from "@pxds/pxds-components/typography/text-block";

export const textBlockFigmaSpec =
	textBlockComponentFigmaSpec satisfies ComponentSpecDraft;

export const dividerFigmaSpec =
	dividerComponentFigmaSpec satisfies ComponentSpecDraft;

export const placeholderFigmaSpec =
	placeholderComponentFigmaSpec satisfies ComponentSpecDraft;
