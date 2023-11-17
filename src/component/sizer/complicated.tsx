import { Switch } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { isComplicatedValue, resolveLock, resolveValue } from './helper';
import { SimpleSizer } from './simple';
import { SizerProps } from './type';

export type ComplicatedProps = Omit<SizerProps, 'mode'>;

export const ComplicatedSizer = (props: ComplicatedProps) => {
  const resolvedValue = useRef(resolveValue(props.value));
  const singleValue = useRef(isComplicatedValue(props.value) ? '0px' : props.value);
  const batchValue = useRef(
    isComplicatedValue(props.value)
      ? {
          top: resolvedValue.current[0],
          right: resolvedValue.current[1],
          bottom: resolvedValue.current[2],
          left: resolvedValue.current[3],
        }
      : {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
  );

  const [lock, setLock] = useState(resolveLock(props.value));
  const [single, setSingle] = useState(singleValue.current);
  const [batch, setBatch] = useState(batchValue.current);

  const onLock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lock = (e.target as HTMLInputElement).checked;

    if (lock === false) {
      setBatch(batchValue.current);
      const values = batchValue.current;
      props.onChange(`${values.top} ${values.right} ${values.bottom} ${values.left}`);
    } else {
      setSingle(singleValue.current);
      props.onChange(singleValue.current);
    }

    setLock(lock);
  };

  const onSingleChange = (value: string) => {
    singleValue.current = value;
    setSingle(value);
  };

  const onValueChange = (key: keyof typeof batch, value: string) => {
    const newValues = { ...batch, [key]: value };
    batchValue.current = { ...newValues };
    props.onChange(`${newValues.top} ${newValues.right} ${newValues.bottom}  ${newValues.left}`);
    setBatch(newValues);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full flex justify-between'>
        <span className='text-[12px] font-medium'>{lock ? '' : props.label}</span>
        <Switch
          aria-label='complicated-lock'
          className='mb-1'
          isSelected={lock}
          onChange={onLock}
          size='sm'
          color='secondary'
        ></Switch>
      </div>
      {lock ? (
        <SimpleSizer {...props} value={single} onChange={onSingleChange} labelPlacement='outside' />
      ) : (
        <div className='grid grid-cols-1 grid-rows-4 gap-2'>
          <SimpleSizer
            value={batch.top}
            onChange={(v) => onValueChange('top', v)}
            label='Top'
            labelPlacement='inside'
          />
          <SimpleSizer
            value={batch.right}
            onChange={(v) => onValueChange('right', v)}
            label='Right'
            labelPlacement='inside'
          />
          <SimpleSizer
            value={batch.bottom}
            onChange={(v) => onValueChange('bottom', v)}
            label='Bottom'
            labelPlacement='inside'
          />
          <SimpleSizer
            value={batch.left}
            onChange={(v) => onValueChange('left', v)}
            label='Left'
            labelPlacement='inside'
          />
        </div>
      )}
    </div>
  );
};
