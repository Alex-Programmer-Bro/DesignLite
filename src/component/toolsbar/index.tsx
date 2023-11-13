import React, { Key, ReactElement, useMemo, useState } from 'react';
import { SelectIcon } from '../../assets/icons/SelectIcon';
import { styles } from './index.tv';
// import { HandIcon } from "../../assets/icons/HandIcon";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { DownIcon } from '../../assets/icons/DownIcon';
import { FrameIcon } from '../../assets/icons/FrameIcon';
import { UpIcon } from '../../assets/icons/UpIcon';
import {
  createSchemaAtom,
  deleteSchameAtom,
  drawingSchemaIdAtom,
  exportAssetsAtom,
  importConfigAtom,
  resetAtom,
  useTemplateAtom,
} from '../../store/schema';
import { allowSelectAtom, selectedDrawTypeAtom } from '../../store/toolbar';
import { SchemaType } from '../../types/schema';
import { SelectDrawType } from './selectDrawType';

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
                color={activeKey === key ? 'secondary' : 'default'}
                variant={activeKey === key ? undefined : 'light'}
                radius='none'
              >
                {element}
                {activeKey === key ? (
                  <UpIcon className='ml-1' fill='white' />
                ) : (
                  <DownIcon className='ml-1' fill='white' />
                )}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='Static Actions' onAction={onAction}>
              {dropMenu.map(({ value, label }) => (
                <DropdownItem key={value.toString()}>{label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button
            isIconOnly
            key={key}
            color={activeKey === key ? 'secondary' : 'default'}
            variant={activeKey === key ? undefined : 'light'}
            radius='none'
            onClick={() => handleClick(key, onActive, onInactive)}
          >
            {element}
          </Button>
        ),
      )}
    </>
  );
};

export const Toolsbar: React.FC = () => {
  const options: string[] = Object.values(SchemaType);
  const [selectedDrawType, setSelectedDrawType] = useAtom(selectedDrawTypeAtom);
  const setAllowSelect = useSetAtom(allowSelectAtom);
  const createSchema = useSetAtom(createSchemaAtom);
  const resetSchema = useSetAtom(resetAtom);
  const useTemplate = useSetAtom(useTemplateAtom);
  const exportAssets = useSetAtom(exportAssetsAtom);
  const importConfig = useSetAtom(importConfigAtom);
  const deleteSchema = useSetAtom(deleteSchameAtom);
  const drawingSchemaId = useAtomValue(drawingSchemaIdAtom);

  const slots = useMemo<Slot[]>(() => {
    return [
      {
        name: 'Frame',
        key: 'frame',
        element: <FrameIcon fill='#fff' />,
        dropMenu: options.map((type) => ({ value: type, label: type })),
        onAction: (key) => setSelectedDrawType(key as SchemaType),
      },
      {
        name: 'Select',
        key: 'select',
        element: <SelectIcon fill='#fff' />,
        onActive: () => setAllowSelect(true),
        onInactive: () => setAllowSelect(false),
      },
      // { name: "hanld Tools", key: "hand", element: <HandIcon fill="#fff" /> }
    ];
  }, [selectedDrawType]);

  const onPreview = async () => {
    if (isWeb) {
      window.open('/preview', 'blank');
    } else {
      const { invoke } = await import('@tauri-apps/api/tauri');
      const preview = new URL('/preview', location.origin);
      await invoke('preview', { url: preview.toString() });
    }
  };

  return (
    <Navbar>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <SelectDrawType />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <span>help</span>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
