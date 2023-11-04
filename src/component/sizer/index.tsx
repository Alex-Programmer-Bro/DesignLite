import { Input, Switch } from "@nextui-org/react";
import { useState } from "react";
import { Value } from "./type";
import { resolveLock } from "./helper";

type InputProps = {
  value: Value;
  onChange: (value: Value) => void;
}

export interface SizerProps extends InputProps {
  label: string;
  mode: 'simple' | 'complicated';
}

const UnitSelector = () => <select className="outline-none">
  <option value="px">px</option>
  <option value="%">%</option>
</select>

const SimpleInput = ({ label, value, onChange }: { label: string } & InputProps) => {
  return <Input
    size="sm"
    labelPlacement="outside"
    variant="bordered"
    label={label}
    type="number"
    value={value ? value.toString() : ''}
    onChange={e => {
      onChange(e.target.value)
    }}
  />
}

const ComplicatedInput = ({ label }: { label: string }) => {
  return <div className="flex items-center">
    <Input size="sm" labelPlacement="inside" variant="bordered" label={label} type="number" />
    <span className="ml-2 text-[12px]">
      <UnitSelector />
    </span>
  </div>
}

export const Sizer = ({ label, mode, value, onChange }: SizerProps) => {
  const [lock, setLock] = useState(resolveLock(value));

  if (mode === 'simple') {
    return <div className="flex items-center">
      <SimpleInput label={label} value={value} onChange={onChange} />
      <span className="ml-2 text-[12px]">
        <UnitSelector />
      </span>
    </div>
  } else if (mode === 'complicated') {
    return <div className='flex flex-col items-center'>
      <div className="w-full flex justify-between">
        <span>{lock ? '' : label}</span>
        <Switch
          className="mb-1"
          isSelected={lock}
          onChange={e => {
            setLock((e.target as HTMLInputElement).checked)
          }}
          size="sm"
          color="secondary"
        >
        </Switch>
      </div>
      {
        lock ? <div className="flex items-center">
          <SimpleInput label={label} value={value} onChange={onChange} />
          <span className="ml-2 text-[12px]">
            <UnitSelector />
          </span>
        </div> : <div className="grid grid-cols-1 grid-rows-4 gap-2">
          <ComplicatedInput label="Top" />
          <ComplicatedInput label="Right" />
          <ComplicatedInput label="Bottom" />
          <ComplicatedInput label="Left" />
        </div>
      }
    </div>
  } else {
    return null;
  }
};
