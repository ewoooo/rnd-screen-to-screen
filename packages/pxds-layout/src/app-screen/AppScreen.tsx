import {
  Children,
  type ComponentProps,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import type { AppScreenActionBarPreset } from "./AppScreenContent";
import { AppScreenContent } from "./AppScreenContent";
import { AppScreenRoot } from "./AppScreenRoot";
import { StatusBar } from "./StatusBar";

type Props = ComponentProps<typeof AppScreenContent>;
type SlotProps = {
  children: ReactNode;
};
type ActionBarSlotProps = {
  children: ReactNode;
  preset?: AppScreenActionBarPreset;
};
type SystemHeaderSlotProps = {
  children?: ReactNode;
};
type AppScreenComponent = ((props: Props) => ReactElement) & {
  SystemHeader: (props: SystemHeaderSlotProps) => ReactElement;
  Header: (props: SlotProps) => ReactElement;
  Content: (props: SlotProps) => ReactElement;
  Bottom: (props: ActionBarSlotProps) => ReactElement;
  ActionBar: (props: ActionBarSlotProps) => ReactElement;
};

const SLOT_KIND = Symbol("AppScreenSlot");
type SlotKind = "systemHeader" | "header" | "content" | "bottom";
type SlotComponent = ((props: SlotProps) => ReactElement) & {
  [SLOT_KIND]: SlotKind;
};
type ActionBarSlotComponent = ((props: ActionBarSlotProps) => ReactElement) & {
  [SLOT_KIND]: "bottom";
};
type SystemHeaderSlotComponent = ((
  props: SystemHeaderSlotProps,
) => ReactElement) & {
  [SLOT_KIND]: "systemHeader";
};

type CompoundSlots = Partial<Record<SlotKind, ReactNode>> & {
  actionBarPreset?: AppScreenActionBarPreset;
};

export const AppScreen = Object.assign(
  function AppScreen({ children, ...contentProps }: Props) {
    const compoundSlots = readCompoundSlots(children);
    const hasCompoundSlots =
      compoundSlots.systemHeader !== undefined ||
      compoundSlots.header !== undefined ||
      compoundSlots.content !== undefined ||
      compoundSlots.bottom !== undefined;
    const contentChildren = hasCompoundSlots ? compoundSlots.content : children;

    return (
      <AppScreenRoot>
        <AppScreenContent
          {...contentProps}
          systemHeader={compoundSlots.systemHeader ?? contentProps.systemHeader}
          header={compoundSlots.header ?? contentProps.header}
          bottom={compoundSlots.bottom ?? contentProps.bottom}
          actionBarPreset={
            compoundSlots.actionBarPreset ?? contentProps.actionBarPreset
          }
        >
          {contentChildren}
        </AppScreenContent>
      </AppScreenRoot>
    );
  },
  {
    SystemHeader: createSystemHeaderSlot(),
    Header: createSlot("header"),
    Content: createSlot("content"),
    Bottom: createActionBarSlot(),
    ActionBar: createActionBarSlot(),
  },
) satisfies AppScreenComponent;

function createSlot(kind: SlotKind): SlotComponent {
  const Slot = ({ children }: SlotProps) => <>{children}</>;
  Slot[SLOT_KIND] = kind;
  return Slot;
}

function createSystemHeaderSlot(): SystemHeaderSlotComponent {
  const Slot: SystemHeaderSlotComponent = ({ children }) => (
    <>{children ?? <StatusBar />}</>
  );
  Slot[SLOT_KIND] = "systemHeader";
  return Slot;
}

function readCompoundSlots(children: ReactNode) {
  const slots: CompoundSlots = {};
  const content: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      if (child !== null && child !== undefined) {
        content.push(child);
      }
      return;
    }

    const kind = getSlotKind(child);
    if (!kind) {
      content.push(child);
      return;
    }

    if (kind === "content") {
      content.push(getSlotChildren(child));
      return;
    }

    slots[kind] = kind === "systemHeader" ? child : getSlotChildren(child);

    if (kind === "bottom") {
      slots.actionBarPreset = getActionBarPreset(child);
    }
  });

  if (content.length > 0) {
    slots.content = content;
  }

  return slots;
}

function getSlotKind(element: ReactElement): SlotKind | undefined {
  const type = element.type as Partial<SlotComponent>;
  return type[SLOT_KIND];
}

function getSlotChildren(element: ReactElement): ReactNode {
  return (element as ReactElement<SlotProps>).props.children;
}

function createActionBarSlot(): ActionBarSlotComponent {
  const Slot: ActionBarSlotComponent = ({ children }) => <>{children}</>;
  Slot[SLOT_KIND] = "bottom";
  return Slot;
}

function getActionBarPreset(
  element: ReactElement,
): AppScreenActionBarPreset | undefined {
  return (element as ReactElement<ActionBarSlotProps>).props.preset;
}
