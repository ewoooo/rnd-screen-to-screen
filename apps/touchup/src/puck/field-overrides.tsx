"use client";

/**
 * Puck field type overrides — shadcn 다크 스타일
 * fieldTypes.text / select / radio 각자 레이블 포함해서 렌더링
 */

import type {
  FieldProps,
  RadioField as RadioFieldDef,
  SelectField as SelectFieldDef,
  TextField as TextFieldDef,
} from "@puckeditor/core";

// ── 공통 label 스타일 ─────────────────────────────────────────────

function FieldLabel({ label }: { label?: string }) {
  if (!label) return null;
  return (
    <span className="block text-[10px] font-medium text-white/40 uppercase tracking-widest mb-1.5 select-none">
      {label}
    </span>
  );
}

// ── text ─────────────────────────────────────────────────────────

export function PuckTextField({
  field,
  value,
  onChange,
  readOnly,
}: FieldProps<TextFieldDef>) {
  return (
    <div className="mb-3">
      <FieldLabel label={field.label} />
      <input
        type="text"
        value={value ?? ""}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "w-full rounded-md border bg-white/5 px-2.5 py-1.5",
          "text-sm text-white placeholder:text-white/20",
          "border-white/10 focus:border-white/30 focus:outline-none focus:ring-0",
          "transition-colors",
          readOnly ? "opacity-40 cursor-not-allowed" : "",
        ].join(" ")}
      />
    </div>
  );
}

// ── select ───────────────────────────────────────────────────────

export function PuckSelectField({
  field,
  value,
  onChange,
  readOnly,
}: FieldProps<SelectFieldDef>) {
  const options = field.options ?? [];
  return (
    <div className="mb-3">
      <FieldLabel label={field.label} />
      <select
        value={value ?? ""}
        disabled={readOnly}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "w-full rounded-md border bg-white/5 px-2.5 py-1.5",
          "text-sm text-white",
          "border-white/10 focus:border-white/30 focus:outline-none focus:ring-0",
          "transition-colors appearance-none cursor-pointer",
          "[&>option]:bg-neutral-900 [&>option]:text-white",
          readOnly ? "opacity-40 cursor-not-allowed" : "",
        ].join(" ")}
      >
        {options.map((opt) => (
          <option key={String(opt.value)} value={String(opt.value)}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ── radio (segmented control) ────────────────────────────────────

export function PuckRadioField({
  field,
  value,
  onChange,
  readOnly,
}: FieldProps<RadioFieldDef>) {
  const options = field.options ?? [];
  return (
    <div className="mb-3">
      <FieldLabel label={field.label} />
      <div className="flex items-center gap-0.5 rounded-md bg-white/6 p-0.5">
        {options.map((opt) => {
          const isActive = String(value) === String(opt.value);
          return (
            <button
              key={String(opt.value)}
              type="button"
              disabled={readOnly}
              onClick={() => !readOnly && onChange(opt.value)}
              className={[
                "flex-1 text-center py-1 text-[11px] font-medium rounded transition-colors",
                isActive
                  ? "bg-white/15 text-white cursor-default"
                  : "text-white/40 hover:text-white/65 cursor-pointer",
                readOnly ? "opacity-40 cursor-not-allowed" : "",
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
