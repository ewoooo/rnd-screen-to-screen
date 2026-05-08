import {
  Children,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";

import { AppScreenContent } from "./AppScreenContent";
import { AppScreenRoot } from "./AppScreenRoot";
import { StatusBar } from "./StatusBar";

type Props = ComponentProps<typeof AppScreenContent>;
type SlotProps = {
  children: ReactNode;
};
type SystemHeaderSlotProps = {
  children?: never;
};
type AppScreenComponent = ((props: Props) => ReactElement) & {
  SystemHeader: (props: SystemHeaderSlotProps) => ReactElement;
  Header: (props: SlotProps) => ReactElement;
  Content: (props: SlotProps) => ReactElement;
  Bottom: (props: SlotProps) => ReactElement;
};

const SLOT_KIND = Symbol("AppScreenSlot");
type SlotKind = "systemHeader" | "header" | "content" | "bottom";
type SlotComponent = ((props: SlotProps) => ReactElement) & {
  [SLOT_KIND]: SlotKind;
};
type SystemHeaderSlotComponent = ((
  props: SystemHeaderSlotProps,
) => ReactElement) & {
  [SLOT_KIND]: "systemHeader";
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
    Bottom: createSlot("bottom"),
  },
) satisfies AppScreenComponent;

function createSlot(kind: SlotKind): SlotComponent {
  const Slot = ({ children }: SlotProps) => <>{children}</>;
  Slot[SLOT_KIND] = kind;
  return Slot;
}

function createSystemHeaderSlot(): SystemHeaderSlotComponent {
  const Slot: SystemHeaderSlotComponent = () => <StatusBar />;
  Slot[SLOT_KIND] = "systemHeader";
  return Slot;
}

function readCompoundSlots(children: ReactNode) {
  const slots: Partial<Record<SlotKind, ReactNode>> = {};
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
