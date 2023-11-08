import { Button, ButtonGroup, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useRef, useState } from "react";
import { PhotoshopPicker } from 'react-color';
import { SimpleSizer } from "../sizer";
import { alignCenter, alignLeft, alignRight, bold, italic, underline } from "./icon";

interface State {
  content: string;
  size: string;
  color: string;
  align: string;
  bold: boolean;
  underline: boolean;
  italic: boolean;
}

interface TextEditorProps {
  state: State,
  onChangeBefore?: (state: State) => void;
  onChange: (update: State | ((prevState: State) => State)) => void;
}

const activeColor = 'rgb(217, 217, 217)';

export const TextEditor = ({ state, onChangeBefore, onChange }: TextEditorProps) => {
  const [color, setColor] = useState(state.color);
  const [open, setOpen] = useState(false);
  const currentColor = useRef(state.color);

  const update = (key: keyof State) => {
    return (value: string | boolean) => {
      onChange((pre: State) => {
        const result = {
          ...pre,
          [key]: value
        }
        onChangeBefore && onChangeBefore(result);
        return result;
      })
    }
  }

  const watchColor = useCallback(debounce((color: string) => {
    update('color')(color);
  }, 30), []);

  const openColorPicker = () => {
    currentColor.current = color;
    setOpen(true);
  }

  const onCancel = () => {
    setOpen(false);
    setColor(currentColor.current);
  }

  useEffect(() => {
    watchColor(color);
  }, [color]);

  return <div className="grid grid-cols-1 gap-10">
    <Textarea
      size="sm"
      labelPlacement="outside"
      label='content'
      value={state.content}
      onChange={e => update('content')(e.target.value)}
    />
    <div className="flex">
      <div className="max-w-[100px]">
        <SimpleSizer
          labelPlacement="outside"
          label="font"
          value={state.size}
          onChange={update('size')}
        />
      </div>
      <ButtonGroup isIconOnly className="justify-start" variant="bordered" size="sm">
        <Popover placement="left-end" className="p-0" isOpen={open}>
          <PopoverTrigger>
            <Button onClick={openColorPicker} style={{ backgroundColor: color }}>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PhotoshopPicker color={color} onChange={v => setColor(v.hex)} onAccept={() => setOpen(false)} onCancel={onCancel} />
          </PopoverContent>
        </Popover>
        <Button
          style={{ backgroundColor: state.align === 'left' ? activeColor : 'transparent' }}
          onClick={() => update('align')('left')}
        >
          {alignLeft}
        </Button>
        <Button
          style={{ backgroundColor: state.align === 'center' ? activeColor : 'transparent' }}
          onClick={() => update('align')('center')}
        >
          {alignCenter}
        </Button>
        <Button
          style={{ backgroundColor: state.align === 'right' ? activeColor : 'transparent' }}
          onClick={() => update('align')('right')}
        >
          {alignRight}
        </Button>
        <Button
          style={{ backgroundColor: state.bold ? activeColor : 'transparent' }}
          onClick={() => update('bold')(!state.bold)}
        >
          {bold}
        </Button>
        <Button
          style={{ backgroundColor: state.underline ? activeColor : 'transparent' }}
          onClick={() => update('underline')(!state.underline)}
        >
          {underline}
        </Button>
        <Button
          style={{ backgroundColor: state.italic ? activeColor : 'transparent' }}
          onClick={() => update('italic')(!state.italic)}
        >
          {italic}
        </Button>
      </ButtonGroup>
    </div>
  </div>;
};
