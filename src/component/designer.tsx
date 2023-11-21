import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Switch,
  Textarea,
} from '@nextui-org/react';
import { useAtom, useAtomValue } from 'jotai';
import { Suspense } from 'react';
import { appStore } from '../store';
import { designerAtom } from '../store/designer';
import { drawingSchemaIdAtom, getActionSchemaTypeAtom, setDrawingSchemaAtom } from '../store/schema';
import { SchemaType } from '../types/schema';
import { ChromePicker } from './colorPicker';
import { alignCenter, alignLeft, alignRight, bold, italic, underline } from './icon';
import { ComplicatedSizer, SimpleSizer } from './sizer';

const activeColor = 'rgb(217, 217, 217)';

export const Designer = () => {
  const [state, setState] = useAtom(designerAtom);
  const type = useAtomValue(getActionSchemaTypeAtom);
  const selectedSchemaId = useAtomValue(drawingSchemaIdAtom);

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
    <div className='w-[400px] fixed top-0 right-0 m-4' key={selectedSchemaId} onWheel={(e) => e.stopPropagation()}>
      <Card className='w-full max-h-[90vh] overflow-auto'>
        <CardHeader className='flex gap-3'>Designer</CardHeader>
        <Divider />
        <CardBody className='my-4'>
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
                    <ChromePicker
                      color={state.backgroundColor}
                      onChange={(v) => stateAdaptor('backgroundColor')(v.hex)}
                    />
                  </Suspense>
                </PopoverContent>
              </Popover>
            </label>
          </div>
          <div className='grid grid-cols-2 gap-10 mb-10'>
            <SimpleSizer
              labelPlacement='outside'
              label={'width'}
              value={state.width!}
              onChange={stateAdaptor('width')}
            />
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
          <Divider className='my-10' />
          {type === SchemaType.Image ? (
            <Input
              type='url'
              label='Image URL'
              value={state.imgURL}
              onChange={(e) => stateAdaptor('imgURL')(e.target.value)}
            />
          ) : (
            <div className='grid grid-cols-1 gap-10'>
              <Textarea
                size='sm'
                labelPlacement='outside'
                label='content'
                value={state.content}
                onChange={(e) => stateAdaptor('content')(e.target.value)}
              />
              <div className='flex items-end'>
                <div className='max-w-[100px]'>
                  <SimpleSizer
                    labelPlacement='outside'
                    label='font'
                    value={state.fontSize}
                    onChange={stateAdaptor('fontSize')}
                  />
                </div>
                <ButtonGroup isIconOnly className='justify-start' variant='bordered' size='sm'>
                  <Popover placement='left-end' className='p-0'>
                    <PopoverTrigger>
                      <Button style={{ backgroundColor: state.color }}></Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Suspense fallback={<Spinner />}>
                        <ChromePicker color={state.color} onChange={(v) => stateAdaptor('color')(v.hex)} />
                      </Suspense>
                    </PopoverContent>
                  </Popover>
                  <Button
                    style={{ backgroundColor: state.textAlign === 'left' ? activeColor : 'transparent' }}
                    onClick={() => stateAdaptor('textAlign')('left')}
                  >
                    {alignLeft}
                  </Button>
                  <Button
                    style={{ backgroundColor: state.textAlign === 'center' ? activeColor : 'transparent' }}
                    onClick={() => stateAdaptor('textAlign')('center')}
                  >
                    {alignCenter}
                  </Button>
                  <Button
                    style={{ backgroundColor: state.textAlign === 'right' ? activeColor : 'transparent' }}
                    onClick={() => stateAdaptor('textAlign')('right')}
                  >
                    {alignRight}
                  </Button>
                  <Button
                    style={{ backgroundColor: state.fontWeight === '800' ? activeColor : 'transparent' }}
                    onClick={() => stateAdaptor('fontWeight')(state.fontWeight === '800' ? '400' : '800')}
                  >
                    {bold}
                  </Button>
                  <Button
                    style={{ backgroundColor: state.textDecoration === 'underline' ? activeColor : 'transparent' }}
                    onClick={() =>
                      stateAdaptor('textDecoration')(state.textDecoration === 'auto' ? 'underline' : 'auto')
                    }
                  >
                    {underline}
                  </Button>
                  <Button
                    style={{ backgroundColor: state.fontStyle === 'italic' ? activeColor : 'transparent' }}
                    onClick={() => stateAdaptor('fontStyle')(state.fontSize === 'italic' ? 'inherit' : 'italic')}
                  >
                    {italic}
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
