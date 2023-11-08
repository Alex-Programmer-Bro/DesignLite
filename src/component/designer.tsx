import { Button, Card, CardBody, CardHeader, Divider, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useAtom, useSetAtom } from "jotai";
import { useRef, useState } from 'react';
import { PhotoshopPicker } from 'react-color';
import { baseStyleAtom, textStyleAtom } from "../store/designer";
import { setDrawingSchemaAtom } from "../store/schema";
import { ComplicatedSizer, SimpleSizer } from './sizer';
import { TextEditor } from "./textEditor";

export const Designer = () => {
  const [baseState, setBaseState] = useAtom(baseStyleAtom);
  const [textState, setTextState] = useAtom(textStyleAtom);
  const setDrawingSchema = useSetAtom(setDrawingSchemaAtom);
  const [open, setOpen] = useState(false);
  const currentColor = useRef(baseState.backgroundColor);

  const stateAdaptor = (key: string) => {
    return (v: string) => setBaseState(pre => {
      const result = { ...pre, [key]: v };
      setDrawingSchema({
        style: {
          width: result.width,
          height: result.height,
          margin: result.margin,
          padding: result.padding,
          backgroundColor: result.backgroundColor
        }
      })
      return result;
    });
  }


  const openColorPicker = () => {
    currentColor.current = baseState.backgroundColor;
    setOpen(true);
  }

  const onCancel = () => {
    setOpen(false);
    stateAdaptor('backgroundColor')(currentColor.current);
  }

  return <Card className="w-[400px] m-4">
    <CardHeader className="flex gap-3">
      Designer
    </CardHeader>
    <Divider />
    <CardBody className="my-4">
      <div className="grid grid-cols-2 gap-10 mb-10">
        <SimpleSizer
          labelPlacement="outside"
          label={'width'}
          value={baseState.width}
          onChange={stateAdaptor('width')}
        />
        <SimpleSizer
          labelPlacement="outside"
          label={'height'}
          value={baseState.height}
          onChange={stateAdaptor('height')}
        />
        <ComplicatedSizer
          label={'margin'}
          value={baseState.margin}
          onChange={stateAdaptor('margin')}
        />
        <ComplicatedSizer
          label={'padding'}
          value={baseState.padding}
          onChange={stateAdaptor('padding')}
        />
      </div>
      <label className="flex items-center">
        <span className="text-[12px] font-medium mr-4">background</span>
        <Popover placement="left-end" className="p-0" isOpen={open}>
          <PopoverTrigger>
            <Button size="sm" variant="bordered" onClick={openColorPicker} style={{ backgroundColor: baseState.backgroundColor }}>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PhotoshopPicker color={baseState.backgroundColor} onChange={v => stateAdaptor('backgroundColor')(v.hex)} onAccept={() => setOpen(false)} onCancel={onCancel} />
          </PopoverContent>
        </Popover>
      </label>
      <Divider className="my-10" />
      <TextEditor
        state={textState}
        onChangeBefore={state => {
          setDrawingSchema({
            content: state.content,
            style: {
              fontSize: state.size,
              color: state.color
            }
          })
        }}
        onChange={setTextState} />
    </CardBody>
  </Card>
};
