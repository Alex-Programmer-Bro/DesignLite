import { Input, Switch } from "@nextui-org/react";
import { useState } from "react";
import { Value } from "./type";
import { isComplicatedValue, resolveLock, resolveUnit, resolveValue } from "./helper";

export interface SizerProps {
  label: string;
  mode: 'simple' | 'complicated';
  value: Value;
  onChange: (value: Value) => void;
}

export const Sizer = ({ label, mode, value: SourceValue, onChange: SourceOnChange }: SizerProps) => {
  const value = resolveValue(SourceValue);
  const [unit, setUnit] = useState(resolveUnit(SourceValue));
  const [lock, setLock] = useState(resolveLock(value));

  const disabled = unit === 'auto';
  const inputValue = disabled ? '' : value.toString();
  const isComplicated = isComplicatedValue(inputValue)
  const [top, right, bottom, left] = inputValue.split(' ').map(resolveValue);
  const [complicatedValue, setComplicatedValue] = useState<Record<string, string>>({
    top: isComplicated ? top : inputValue,
    right: isComplicated ? right : inputValue,
    bottom: isComplicated ? bottom : inputValue,
    left: isComplicated ? left : inputValue
  });

  const onChange = (v: Value) => {
    SourceOnChange(v + unit);
  }

  const unitSelector = <select role="unit-selector" className="outline-none" defaultValue={unit} onChange={e => {
    const nextUnit = e.target.value;
    setUnit(nextUnit);

    if (inputValue) {
      if (nextUnit !== 'auto') {
        SourceOnChange(inputValue + e.target.value);
      }
    }
  }}>
    <option value="px">px</option>
    <option value="%">%</option>
    <option value="auto">auto</option>
  </select>

  const complicatedInput = (label: string) => {
    return <div className="flex items-center">
      <Input
        disabled={disabled}
        size="sm"
        labelPlacement="inside"
        variant="bordered"
        label={label}
        type="number"
        value={complicatedValue[label]}
        onChange={e => {
          setComplicatedValue(pre => {
            return {
              ...pre,
              [label]: e.target.value
            }
          })
        }}
      />
      <span className="ml-2 text-[12px]">
        {unitSelector}
      </span>
    </div>
  }

  if (mode === 'simple') {
    return <div className="flex items-center">
      <Input
        disabled={disabled}
        size="sm"
        labelPlacement="outside"
        variant="bordered"
        label={label}
        type="number"
        value={disabled ? '' : value.toString()}
        onChange={e => onChange(e.target.value)}
      />
      <span className="ml-2 text-[12px]">
        {unitSelector}
      </span>
    </div>
  } else if (mode === 'complicated') {
    return <div className='flex flex-col items-center'>
      <div className="w-full flex justify-between">
        <span className="text-[12px] font-medium">{lock ? '' : label}</span>
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
          <Input
            disabled={disabled}
            size="sm"
            labelPlacement="outside"
            variant="bordered"
            label={label}
            type="number"
            value={disabled ? '' : value.toString()}
            onChange={e => onChange(e.target.value)}
          />
          <span className="ml-2 text-[12px]">
            {unitSelector}
          </span>
        </div> : <div className="grid grid-cols-1 grid-rows-4 gap-2">
          {complicatedInput('top')}
          {complicatedInput('right')}
          {complicatedInput('bottom')}
          {complicatedInput('left')}
        </div>
      }
    </div>
  } else {
    return null;
  }
};
