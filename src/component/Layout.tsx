import { Button, ButtonGroup, Card, Popover, PopoverContent, PopoverTrigger, Spinner, Switch } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import { Suspense } from 'react';
import { tv } from 'tailwind-variants';
import { appStore, updateStateAtom } from '../store';
import { layoutStateAtom } from '../store/designer';
import { getDrawingSchema, setDrawingSchemaAtom } from '../store/schema';
import { SchemaType } from '../types/schema';
import { ChromePicker } from './colorPicker';
import { ComplicatedSizer, SimpleSizer } from './sizer';

const activeColor = 'rgb(217, 217, 217)';

const { textController } = tv({
  slots: {
    textController: 'grid grid-cols-1 gap-10 mb-10',
  },
  variants: {
    drawingImage: {
      true: {
        textController: 'hidden',
      },
    },
  },
})();

export const Layout = () => {
  const state = useAtomValue(layoutStateAtom);
  const updateState = updateStateAtom(layoutStateAtom, (style) => {
    appStore.set(setDrawingSchemaAtom, { style });
  });
  const selectedSchema = useAtomValue(getDrawingSchema);

  const onChangeSingleLine = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      updateState.display('block');
    } else {
      updateState.display('inline-block');
    }
  };

  return (
    <div
      className='fixed top-0 right-0 m-4'
      key={selectedSchema ? selectedSchema.id : ''}
      onWheel={(e) => e.stopPropagation()}
    >
      <Card className='overflow-auto p-4 w-[400px]' style={{ maxHeight: 'calc(100vh - 32px)' }}>
        <div className={textController({ drawingImage: selectedSchema && selectedSchema.type === SchemaType.Image })}>
          <div className='flex justify-between items-end'>
            <div className='max-w-[100px]'>
              <SimpleSizer
                labelPlacement='outside'
                label='font'
                value={state.fontSize}
                onChange={updateState.fontSize}
              />
            </div>
            <ButtonGroup isIconOnly className='justify-start' variant='bordered' size='sm'>
              <Popover placement='left-end' className='p-0'>
                <PopoverTrigger>
                  <Button style={{ backgroundColor: state.color }}></Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Suspense fallback={<Spinner />}>
                    <ChromePicker color={state.color} onChange={(v) => updateState.color(v.hex)} />
                  </Suspense>
                </PopoverContent>
              </Popover>
              <Button
                style={{ backgroundColor: state.textAlign === 'left' ? activeColor : 'transparent' }}
                onClick={() => updateState.textAlign('left')}
              >
                <img className='w-4' src='/icon/alignLeft.svg' alt='alignLeft' />
              </Button>
              <Button
                style={{ backgroundColor: state.textAlign === 'center' ? activeColor : 'transparent' }}
                onClick={() => updateState.textAlign('center')}
              >
                <img className='w-4' src='/icon/alignCenter.svg' alt='alignCenter' />
              </Button>
              <Button
                style={{ backgroundColor: state.textAlign === 'right' ? activeColor : 'transparent' }}
                onClick={() => updateState.textAlign('right')}
              >
                <img className='w-4' src='/icon/alignRight.svg' alt='alignRight' />
              </Button>
              <Button
                style={{ backgroundColor: state.fontWeight === '800' ? activeColor : 'transparent' }}
                onClick={() => updateState.fontWeight(state.fontWeight === '800' ? '400' : '800')}
              >
                <img className='w-4' src='/icon/bold.svg' alt='bold' />
              </Button>
              <Button
                style={{ backgroundColor: state.textDecoration === 'underline' ? activeColor : 'transparent' }}
                onClick={() => updateState.textDecoration(state.textDecoration === 'auto' ? 'underline' : 'auto')}
              >
                <img className='w-4' src='/icon/underline.svg' alt='underline' />
              </Button>
              <Button
                style={{ backgroundColor: state.fontStyle === 'italic' ? activeColor : 'transparent' }}
                onClick={() => updateState.fontStyle(state.fontSize === 'italic' ? 'inherit' : 'italic')}
              >
                <img className='w-4' src='/icon/italic.svg' alt='italic' />
              </Button>
            </ButtonGroup>
          </div>
        </div>
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
                  <ChromePicker color={state.backgroundColor} onChange={(v) => updateState.backgroundColor(v.hex)} />
                </Suspense>
              </PopoverContent>
            </Popover>
          </label>
        </div>
        <div className='grid grid-cols-2 gap-10 mb-10'>
          <SimpleSizer labelPlacement='outside' label={'width'} value={state.width!} onChange={updateState.width} />
          <SimpleSizer labelPlacement='outside' label={'height'} value={state.height!} onChange={updateState.height} />
          <ComplicatedSizer label={'margin'} value={state.margin!} onChange={updateState.margin} />
          <ComplicatedSizer label={'padding'} value={state.padding!} onChange={updateState.padding} />
          <ComplicatedSizer
            label={'borderRadius'}
            value={state.borderRadius!}
            onChange={(v) => {
              updateState.borderRadius(v);
            }}
          />
        </div>
      </Card>
    </div>
  );
};
