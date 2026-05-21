/**
 * Organism field schemas — OrganismEditorShell 전용
 * puckConfig의 fields와 분리되어 있음. 캔버스 직접 편집 불가, shell에서만 사용.
 */

export type OgnFieldDef =
  | { type: "text"; label: string }
  | { type: "select"; label: string; options: { label: string; value: string }[] }
  | { type: "radio"; label: string; options: { label: string; value: unknown }[] };

export type OgnSchema = {
  fields: Record<string, OgnFieldDef>;
};

const sel = (options: string[]) => options.map((value) => ({ label: value, value }));

const boolRadio = (label: string): OgnFieldDef => ({
  type: "radio",
  label,
  options: [
    { label: "true", value: true },
    { label: "false", value: false },
  ],
});

const authSelectSchema: OgnSchema = {
  fields: {
    selected: {
      type: "select",
      label: "Selected method",
      options: [
        { label: "(none)", value: "" },
        { label: "phone", value: "phone" },
        { label: "pass", value: "pass" },
        { label: "cert", value: "cert" },
      ],
    },
    loading: boolRadio("Loading"),
    loadErrorText: { type: "text", label: "Load error text" },
  },
};

const authRequestSchema: OgnSchema = {
  fields: {
    errorState: {
      type: "select",
      label: "Error state",
      options: sel(["none", "expired", "mismatch", "blocked", "resendCooldown", "resendLimit", "system"]),
    },
    fieldError: boolRadio("Field error"),
    blocked: boolRadio("Blocked"),
    resendDisabled: boolRadio("Resend disabled"),
    confirmDisabled: boolRadio("Confirm disabled"),
    confirming: boolRadio("Confirming"),
  },
};

export const ORGANISM_SCHEMAS: Record<string, OgnSchema> = {
  "OGN/AuthSelect": authSelectSchema,
  "OGN/AuthRequest": authRequestSchema,
  "OGN/AuthSelectCopy": authSelectSchema,
  "OGN/AuthRequestCopy": authRequestSchema,
};
