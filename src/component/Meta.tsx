import {
  Button,
  ButtonGroup,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Textarea,
} from '@nextui-org/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { Suspense } from 'react';
import { ChromePicker } from 'react-color';
import { designerAtom, setDesignerStateAtom } from '../store/designer';
import { getActionSchemaTypeAtom } from '../store/schema';
import { SchemaType } from '../types/schema';
import { alignCenter, alignLeft, alignRight, bold, italic, underline } from './icon';
import { SimpleSizer } from './sizer';

const activeColor = 'rgb(217, 217, 217)';

export const Meta = () => {
  const state = useAtomValue(designerAtom);
  const type = useAtomValue(getActionSchemaTypeAtom);
  const setDesingerState = useSetAtom(setDesignerStateAtom);

  return (
    <>
      {type === SchemaType.Image ? (
        <Input
          type='url'
          label='Image URL'
          value={state.imgURL}
          onChange={(e) => setDesingerState({ key: 'imgURL', v: e.target.value })}
        />
      ) : (
        <div className='grid grid-cols-1 gap-10'>
          <Textarea
            size='sm'
            labelPlacement='outside'
            label='content'
            value={state.content}
            onChange={(e) => setDesingerState({ key: 'content', v: e.target.value })}
          />
          <div className='flex items-end'>
            <div className='max-w-[100px]'>
              <SimpleSizer
                labelPlacement='outside'
                label='font'
                value={state.fontSize}
                onChange={(v) => setDesingerState({ key: 'fontSize', v })}
              />
            </div>
            <ButtonGroup isIconOnly className='justify-start' variant='bordered' size='sm'>
              <Popover placement='left-end' className='p-0'>
                <PopoverTrigger>
                  <Button style={{ backgroundColor: state.color }}></Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Suspense fallback={<Spinner />}>
                    <ChromePicker color={state.color} onChange={(v) => setDesingerState({ key: 'color', v: v.hex })} />
                  </Suspense>
                </PopoverContent>
              </Popover>
              <Button
                style={{ backgroundColor: state.textAlign === 'left' ? activeColor : 'transparent' }}
                onClick={() => setDesingerState({ key: 'textAlign', v: 'left' })}
              >
                {alignLeft}
              </Button>
              <Button
                style={{ backgroundColor: state.textAlign === 'center' ? activeColor : 'transparent' }}
                onClick={() => setDesingerState({ key: 'textAlign', v: 'center' })}
              >
                {alignCenter}
              </Button>
              <Button
                style={{ backgroundColor: state.textAlign === 'right' ? activeColor : 'transparent' }}
                onClick={() => setDesingerState({ key: 'textAlign', v: 'right' })}
              >
                {alignRight}
              </Button>
              <Button
                style={{ backgroundColor: state.fontWeight === '800' ? activeColor : 'transparent' }}
                onClick={() => setDesingerState({ key: 'fontWeight', v: state.fontWeight === '800' ? '400' : '800' })}
              >
                {bold}
              </Button>
              <Button
                style={{ backgroundColor: state.textDecoration === 'underline' ? activeColor : 'transparent' }}
                onClick={() =>
                  setDesingerState({ key: 'textDecoration', v: state.textDecoration === 'auto' ? 'underline' : 'auto' })
                }
              >
                {underline}
              </Button>
              <Button
                style={{ backgroundColor: state.fontStyle === 'italic' ? activeColor : 'transparent' }}
                onClick={() =>
                  setDesingerState({ key: 'fontStyle', v: state.fontSize === 'italic' ? 'inherit' : 'italic' })
                }
              >
                {italic}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </>
  );
};
