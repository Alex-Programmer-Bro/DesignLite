import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { useMemo, useState, useEffect } from "react";
import { selectedDrawTypeAtom } from "../store/toolbar";
import { SchemaType } from "../types/schema";
import { ComplicatedSizer, SimpleSizer } from './sizer';
import { TextEditor } from "./textEditor";
import { useSetAtom } from 'jotai'
import { setDrawingSchemaAtom } from "../store/schema";

export const Designer = () => {
  const drawType = useAtomValue(selectedDrawTypeAtom);
  const setDrawingSchema = useSetAtom(setDrawingSchemaAtom);

  const [textState, setTextState] = useState({
    content: '',
    size: '14px',
    color: '#000000'
  });

  const [state, setState] = useState({
    width: '0px',
    height: '0px',
    margin: '0px',
    padding: '0px',
    backgroundColor: 'transparent',
  });

  const stateAdaptor = (key: string) => {
    return (v: string) => setState(pre => ({ ...pre, [key]: v }))
  }

  const render = useMemo(() => {
    switch (drawType) {
      case SchemaType.Text:
        return <TextEditor state={textState} onChange={setTextState} />
      default:
        return <>
          <div className="grid grid-cols-2 gap-10 mb-10">
            <SimpleSizer
              labelPlacement="outside"
              label={'width'}
              value={state.width}
              onChange={stateAdaptor('width')}
            />
            <SimpleSizer
              labelPlacement="outside"
              label={'height'}
              value={state.height}
              onChange={stateAdaptor('height')}
            />
            <ComplicatedSizer
              label={'margin'}
              value={state.margin}
              onChange={stateAdaptor('margin')}
            />
            <ComplicatedSizer
              label={'padding'}
              value={state.padding}
              onChange={stateAdaptor('padding')}
            />
          </div>
          <label className="flex items-center">
            <span className="text-[12px] font-bold mr-4">background</span>
            <input type="color" value={state.backgroundColor} onChange={e => {
              stateAdaptor('backgroundColor')(e.target.value);
            }} />
          </label>
        </>
    }
  }, [drawType, textState]);

  useEffect(() => {
    setDrawingSchema({
      content: textState.content,
      style: {
        fontSize: textState.size,
        color: textState.color,
      }
    })
  }, [textState]);

  return <Card className="w-[400px] m-4">
    <CardHeader className="flex gap-3">
      Designer
    </CardHeader>
    <Divider />
    <CardBody className="my-4">
      {render}
    </CardBody>
  </Card>
};
