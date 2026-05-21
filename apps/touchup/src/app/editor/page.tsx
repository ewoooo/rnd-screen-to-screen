"use client";

import { Puck, createUsePuck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { EditorLayout } from "@/components/EditorLayout";
import { TouchUpHeader } from "@/components/TouchUpHeader";
import type { EditingOrganism } from "@/components/organism-editor-types";
import { puckConfig } from "@/puck/config";
import {
  PuckRadioField,
  PuckSelectField,
  PuckTextField,
} from "@/puck/field-overrides";
import { clearData, loadData, saveData } from "@/puck/storage";
import type { Data } from "@puckeditor/core";

const usePuck = createUsePuck();

export default function EditorPage() {
  const [initialData, setInitialData] = useState<Data | null>(null);
  const [editingOrganism, setEditingOrganism] = useState<EditingOrganism | null>(null);

  const handleReset = () => { clearData(); window.location.reload(); };

  useEffect(() => {
    setInitialData(loadData());
  }, []);

  if (!initialData) {
    return (
      <div style={loadingStyle}>Loading…</div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <TouchUpHeader onReset={handleReset} />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Puck
          config={puckConfig}
          data={initialData}
          onPublish={saveData}
          overrides={{
            header: () => <></>,
            fieldTypes: {
              text: PuckTextField,
              select: PuckSelectField,
              radio: PuckRadioField,
            },
            drawerItem: ({ name }) => {
              const label = name.replace(/^OGN\//, "");
              return (
                <div className="w-full rounded-md px-1.5 py-1 text-left text-sm font-medium text-white/70 transition-colors cursor-grab active:cursor-grabbing hover:bg-white/8 hover:text-white">
                  {label}
                </div>
              );
            },
            actionBar: ({ label, children, parentAction }) => (
              <OrganismActionBar
                label={label}
                editingOrganism={editingOrganism}
                onEditingOrganismChange={setEditingOrganism}
                parentAction={parentAction}
              >
                {children}
              </OrganismActionBar>
            ),
            componentOverlay: ({ children, componentId }) => (
              <OrganismEditOverlay
                componentId={componentId}
                editingOrganism={editingOrganism}
              >
                {children}
              </OrganismEditOverlay>
            ),
          }}
        >
          <EditorLayout
            editingOrganism={editingOrganism}
            onCloseOrganismEditor={() => setEditingOrganism(null)}
          />
        </Puck>
      </div>
    </div>
  );
}

function OrganismActionBar({
  label,
  children,
  parentAction,
  editingOrganism,
  onEditingOrganismChange,
}: {
  label?: string;
  children: React.ReactNode;
  parentAction: React.ReactNode;
  editingOrganism: EditingOrganism | null;
  onEditingOrganismChange: (target: EditingOrganism | null) => void;
}) {
  const selectedItem = usePuck((s) => s.selectedItem);
  const selectedId = selectedItem?.props.id ?? null;
  const selectedType = selectedItem?.type ?? label ?? "";
  const isOrganism = selectedType.startsWith("OGN/");
  const isEditing = Boolean(selectedId && editingOrganism?.id === selectedId);

  return (
    <div className="flex items-center overflow-hidden rounded-md border border-black/10 bg-white text-neutral-950 shadow-lg">
      <div className="flex items-center border-r border-black/10">
        {parentAction}
        {label && (
          <div className="px-2 text-xs font-medium leading-7 text-neutral-700">
            {label}
          </div>
        )}
      </div>
      <div className="flex items-center">
        {isOrganism && selectedId && (
          <button
            type="button"
            title={isEditing ? "Exit organism edit" : "Edit organism"}
            aria-label={isEditing ? "Exit organism edit" : "Edit organism"}
            aria-pressed={isEditing}
            className={[
              "flex h-7 w-7 items-center justify-center transition-colors",
              isEditing
                ? "bg-neutral-950 text-white hover:bg-neutral-800"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950",
            ].join(" ")}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onEditingOrganismChange(
                isEditing || !selectedId
                  ? null
                  : { id: selectedId, type: selectedType },
              );
            }}
          >
            <Pencil size={14} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

function OrganismEditOverlay({
  children,
  componentId,
  editingOrganism,
}: {
  children: React.ReactNode;
  componentId: string;
  editingOrganism: EditingOrganism | null;
}) {
  const disabled = Boolean(editingOrganism && componentId !== editingOrganism.id);

  return (
    <div
      className={[
        "relative transition-opacity duration-150",
        disabled ? "pointer-events-none opacity-45" : "",
      ].join(" ")}
      aria-hidden={disabled || undefined}
    >
      {children}
      {disabled && (
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/35" />
      )}
    </div>
  );
}

const loadingStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100dvh",
  fontFamily: "system-ui, sans-serif",
  color: "#666",
} as const;
