import { Button, ButtonGroup, Textarea } from "@nextui-org/react";
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useState } from "react";
import { SimpleSizer } from "../sizer";
import { alignCenter, alignLeft, alignRight, bold, italic, underline } from "./icon";

interface State {
  content: string;
  size: string;
  color: string;
}

interface TextEditorProps {
  state: State,
  onChange: (update: State | ((prevState: State) => State)) => void;
}

export const TextEditor = ({ state, onChange }: TextEditorProps) => {
  const [color, setColor] = useState(state.color);

  const update = (key: keyof State) => {
    return (value: string) => {
      onChange((pre: State) => {
        return {
          ...pre,
          [key]: value
        }
      })
    }
  }

  const watchColor = useCallback(debounce((color: string) => {
    update('color')(color);
  }, 30), []);

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
      <Button>
        <div className="w-full h-full" style={{ backgroundColor: color }}>
          <input
            className="border-none outline-none w-full h-full opacity-0"
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </div>
      </Button>
      <Button>{alignLeft}</Button>
      <Button>{alignCenter}</Button>
      <Button>{alignRight}</Button>
      <Button>{bold}</Button>
      <Button>{underline}</Button>
      <Button>{italic}</Button>
    </ButtonGroup>
  </div>;
};
