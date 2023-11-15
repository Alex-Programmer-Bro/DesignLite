import { Switch } from '@nextui-org/react';
import { useState } from 'react';
import { isComplicatedValue, resolveLock, resolveValue } from './helper';
import { SimpleSizer } from './simple';
import { SizerProps } from './type';

export type ComplicatedProps = Omit<SizerProps, 'mode'>;

export const ComplicatedSizer = (props: ComplicatedProps) => {
  const [lock, setLock] = useState(resolveLock(props.value));
  const [values, setValues] = useState(() => {
    const locked = resolveLock(props.value);
    const isComplicated = isComplicatedValue(props.value) && !locked;
    const [top, right, bottom, left] = resolveValue(props.value);
    return {
      top: isComplicated ? top : '0px',
      right: isComplicated ? right : '0px',
      bottom: isComplicated ? bottom : '0px',
      left: isComplicated ? left : '0px',
    };
  });
  const { top, right, bottom, left } = values;

  const onLock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lock = (e.target as HTMLInputElement).checked;

    if (lock === false) {
      setValues({
        top: props.value,
        right: props.value,
        bottom: props.value,
        left: props.value,
      });
      props.onChange(`${values.top} ${values.right} ${values.bottom}  ${values.left}`);
    } else {
      props.onChange(values.top);
    }

    setLock(lock);
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
        <SimpleSizer {...props} value={isComplicatedValue(props.value) ? top : props.value} labelPlacement='outside' />
      ) : (
        <div className='grid grid-cols-1 grid-rows-4 gap-2'>
          <SimpleSizer
            value={top}
            onChange={(v) => setValues((pre) => ({ ...pre, top: v }))}
            label='Top'
            labelPlacement='inside'
          />
          <SimpleSizer
            value={right}
            onChange={(v) => setValues((pre) => ({ ...pre, right: v }))}
            label='Right'
            labelPlacement='inside'
          />
          <SimpleSizer
            value={bottom}
            onChange={(v) => setValues((pre) => ({ ...pre, bottom: v }))}
            label='Bottom'
            labelPlacement='inside'
          />
          <SimpleSizer
            value={left}
            onChange={(v) => setValues((pre) => ({ ...pre, left: v }))}
            label='Left'
            labelPlacement='inside'
          />
        </div>
      )}
    </div>
  );
};
