import { Input } from "@nextui-org/react";
import { useRef, useState } from "react";
import { SizerProps, Value } from "./type";
import { resolveUnit, resolveValue } from "./helper";

export type SimpleProps = Omit<SizerProps, 'mode'>;

export const SimpleSizer = ({ label, value: SourceValue, onChange: SourceOnChange }: SimpleProps) => {
  const value = resolveValue(SourceValue);
  const [unit, setUnit] = useState(resolveUnit(SourceValue));
  const ref = useRef<Value>(0);
  const disabled = unit === 'auto';
  const inputValue = disabled ? '' : (ref.current ? ref.current.toString() : value);

  const onChange = (v: Value) => {
    SourceOnChange(v + unit);
  }

  const unitSelector = <select role="unit-selector" className="outline-none" defaultValue={unit} onChange={e => {
    const nextUnit = e.target.value;
    setUnit(nextUnit);

    if (inputValue) {
      if (nextUnit === 'auto') {
        SourceOnChange('auto');
        ref.current = inputValue;
      } else {
        SourceOnChange(inputValue + e.target.value);
      }
    }
  }}>
    <option value="px">px</option>
    <option value="%">%</option>
    <option value="auto">auto</option>
  </select>

  return <div className="flex items-center">
    <Input
      disabled={disabled}
      size="sm"
      labelPlacement="outside"
      variant="bordered"
      label={label}
      type="number"
      value={inputValue}
      onChange={e => onChange(e.target.value)}
    />
    <span className="ml-2 text-[12px]">
      {unitSelector}
    </span>
  </div>
};
