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
}

interface TextEditorProps {
  state: State,
  onChangeBefore?: (state: State) => void;
  onChange: (update: State | ((prevState: State) => State)) => void;
}

export const TextEditor = ({ state, onChangeBefore, onChange }: TextEditorProps) => {
  const [color, setColor] = useState(state.color);
  const [open, setOpen] = useState(false);
  const currentColor = useRef(state.color);

  const update = (key: keyof State) => {
    return (value: string) => {
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
    <SimpleSizer
      labelPlacement="outside"
      label="size"
      value={state.size}
      onChange={update('size')}
    />
    <ButtonGroup isIconOnly className="justify-start" variant="bordered" size="sm">
      <Popover placement="bottom" className="p-0" isOpen={open}>
        <PopoverTrigger>
          <Button onClick={openColorPicker} style={{ backgroundColor: color }}>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PhotoshopPicker color={color} onChange={v => setColor(v.hex)} onAccept={() => setOpen(false)} onCancel={onCancel} />
        </PopoverContent>
      </Popover>
      <Button>{alignLeft}</Button>
      <Button>{alignCenter}</Button>
      <Button>{alignRight}</Button>
      <Button>{bold}</Button>
      <Button>{underline}</Button>
      <Button>{italic}</Button>
    </ButtonGroup>
  </div>;
};
