import { Input } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { resolveUnit, resolveValue } from './helper';
import { SizerProps } from './type';
import { UnitSelector } from './unit';

export type SimpleProps = Omit<SizerProps, 'mode'> & {
  labelPlacement: 'outside' | 'inside';
};

export const SimpleSizer = ({
  label,
  value: SourceValue,
  labelPlacement = 'outside',
  onChange: SourceOnChange,
  onFocus,
}: SimpleProps) => {
  const [value, setValue] = useState(resolveValue(SourceValue) as string);
  const [unit, setUnit] = useState(resolveUnit(SourceValue));
  const cacheValue = useRef<typeof value | null>(null);

  const disabled = unit === 'auto';

  const onUnitChange = (unit: string) => {
    if (unit === 'auto') {
      cacheValue.current = value;
      SourceOnChange(unit);
    } else {
      onValueChange(value);
    }
    setUnit(unit);
  };

  const onValueChange = (inputValue: string) => {
    if (cacheValue.current) {
      SourceOnChange(cacheValue.current + unit);
      cacheValue.current = null;
    } else {
      SourceOnChange(inputValue + unit);
    }
    value !== inputValue && setValue(inputValue);
  };

  return (
    <div className='flex items-center'>
      <Input
        disabled={disabled}
        size='sm'
        labelPlacement={labelPlacement}
        variant='bordered'
        label={label}
        type='number'
        value={disabled ? '' : value}
        onChange={(e) => onValueChange(e.target.value)}
        onFocus={onFocus}
      />
      <span className={`ml-2 text-[12px]${labelPlacement === 'outside' ? ' mt-[22px]' : ''}`}>
        <UnitSelector value={unit} onChange={onUnitChange} />
      </span>
    </div>
  );
};
