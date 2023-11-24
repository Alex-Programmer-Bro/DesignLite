import { Button, Popover, PopoverContent, PopoverTrigger, Spinner, Switch } from '@nextui-org/react';

import { useAtom } from 'jotai';
import { Suspense } from 'react';
import { appStore } from '../store';
import { designerAtom } from '../store/designer';
import { setDrawingSchemaAtom } from '../store/schema';
import { ChromePicker } from './colorPicker';
import { ComplicatedSizer, SimpleSizer } from './sizer';

export const Layout = () => {
  const [state, setState] = useAtom(designerAtom);

  const stateAdaptor = (key: keyof typeof state) => {
    return (v: string) => {
      const style = { ...state, [key]: v };
      appStore.set(setDrawingSchemaAtom, { style });
      setState(style);
    };
  };

  const onChangeSingleLine = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      stateAdaptor('display')('block');
    } else {
      stateAdaptor('display')('inline-block');
    }
  };

  return (
    <>
      <div className='grid grid-cols-2 gap-10 mb-10'>
        <label className='flex items-center'>
          <span className='text-[12px] font-medium mr-4'>singleLine</span>
          <Switch
            aria-label='single-line'
            size='sm'
            color='secondary'
            isSelected={state.display === 'block'}
            onChange={onChangeSingleLine}
          />
        </label>
        <label className='flex items-center'>
          <span className='text-[12px] font-medium mr-4'>background</span>
          <Popover placement='left-end' className='p-0'>
            <PopoverTrigger>
              <Button size='sm' variant='bordered' style={{ backgroundColor: state.backgroundColor }}></Button>
            </PopoverTrigger>
            <PopoverContent>
              <Suspense fallback={<Spinner />}>
                <ChromePicker color={state.backgroundColor} onChange={(v) => stateAdaptor('backgroundColor')(v.hex)} />
              </Suspense>
            </PopoverContent>
          </Popover>
        </label>
      </div>
      <div className='grid grid-cols-2 gap-10 mb-10'>
        <SimpleSizer labelPlacement='outside' label={'width'} value={state.width!} onChange={stateAdaptor('width')} />
        <SimpleSizer
          labelPlacement='outside'
          label={'height'}
          value={state.height!}
          onChange={stateAdaptor('height')}
        />
        <ComplicatedSizer label={'margin'} value={state.margin!} onChange={stateAdaptor('margin')} />
        <ComplicatedSizer label={'padding'} value={state.padding!} onChange={stateAdaptor('padding')} />
        <ComplicatedSizer
          label={'borderRadius'}
          value={state.borderRadius!}
          onChange={(v) => {
            console.log(v);
            stateAdaptor('borderRadius')(v);
          }}
        />
      </div>
    </>
  );
};
