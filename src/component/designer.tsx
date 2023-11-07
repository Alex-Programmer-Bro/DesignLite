import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { SimpleSizer, ComplicatedSizer } from './sizer'
import { useState } from "react";

export const Designer = () => {
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

  return <Card className="max-w-[400px] m-4">
    <CardHeader className="flex gap-3">
      Designer
    </CardHeader>
    <Divider />
    <CardBody className="my-4">
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
    </CardBody>
  </Card>
};
