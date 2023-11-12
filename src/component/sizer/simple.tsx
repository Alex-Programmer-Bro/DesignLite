import { Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
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

  const disabled = unit === 'auto';

  const onUnitChange = (unit: string) => {
    if (unit === 'auto') {
      SourceOnChange(unit);
    } else {
      SourceOnChange(value + unit);
    }
    setUnit(unit);
  };

  useEffect(() => {
    setValue(resolveValue(SourceValue) as string);
    setUnit(resolveUnit(SourceValue));
  }, [SourceValue]);

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
        onChange={(e) => setValue(e.target.value)}
        onFocus={onFocus}
      />
      <span className='ml-2 text-[12px]'>
        <UnitSelector value={unit} onChange={onUnitChange} />
      </span>
    </div>
  );
};
