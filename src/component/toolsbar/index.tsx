import React, { Key, ReactElement, useMemo, useState } from "react";
import { styles } from "./index.tv";
import { SelectIcon } from "../../assets/icons/SelectIcon";
import { HandIcon } from "../../assets/icons/HandIcon";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { FrameIcon } from "../../assets/icons/FrameIcon";
import { DownIcon } from "../../assets/icons/DownIcon";
import { UpIcon } from "../../assets/icons/UpIcon";
import { useAtom, useSetAtom } from "jotai";
import { createSchemaAtom } from "../../store/schema";
import { selectedDrawTypeAtom } from "../../store/toolbar";
import { SchemaType } from "../../types/schema";

const { wrap } = styles();

interface Slot {
  name: string;
  element: ReactElement;
  key: string;
  onActive?: Function;
  onInactive?: Function;
  dropMenu?: { label: string; value: string | number | bigint }[];
  onAction?: (key: Key) => void;
}

const Buttons = ({ slots }: { slots: Slot[] }) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleClick = (key: string, onActive?: Function, onInactive?: Function) => {
    if (activeKey !== key) {
      onActive && onActive();
      setActiveKey(key);
    } else {
      onInactive && onInactive();
      setActiveKey(null);
    }
  };

  return (
    <>
      {slots.map(({ key, element, dropMenu, onActive, onInactive, onAction }) =>
        dropMenu ? (
          <Dropdown onOpenChange={(value: boolean) => setActiveKey(value ? key : null)} key={key}>
            <DropdownTrigger>
              <Button
                key={key}
                color={activeKey === key ? "primary" : "default"}
                variant={activeKey === key ? undefined : "light"}
                radius="none"
              >
                {element}
                {activeKey === key ? (
                  <UpIcon className="ml-1" fill="white" />
                ) : (
                  <DownIcon className="ml-1" fill="white" />
                )}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" onAction={onAction}>
              {dropMenu.map(({ value, label }) => (
                <DropdownItem key={value}>{label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button
            isIconOnly
            key={key}
            color={activeKey === key ? "primary" : "default"}
            variant={activeKey === key ? undefined : "light"}
            radius="none"
            onClick={() => handleClick(key, onActive, onInactive)}
          >
            {element}
          </Button>
        )
      )}
    </>
  );
};

export const Toolsbar: React.FC = () => {
  const options: string[] = Object.values(SchemaType);
  const [selectedDrawType, setSelectedDrawType] = useAtom(selectedDrawTypeAtom);
  const createSchema = useSetAtom(createSchemaAtom);

  const slots = useMemo<Slot[]>(() => {
    return [
      {
        name: "Frame",
        key: "frame",
        element: <FrameIcon fill="#fff" />,
        dropMenu: options.map((type) => ({ value: type, label: type })),
        onAction: (key) => setSelectedDrawType(key as SchemaType)
      },
      {
        name: "Select",
        key: "select",
        element: <SelectIcon fill="#fff" />
      },
      { name: "hanld Tools", key: "hand", element: <HandIcon fill="#fff" /> }
    ];
  }, [selectedDrawType]);

  return (
    <div className={wrap()}>
      <Buttons slots={slots} />
      <Button onClick={createSchema} variant="shadow" color="primary" size="sm" className="ml-auto">
        添加
      </Button>
    </div>
  );
};
