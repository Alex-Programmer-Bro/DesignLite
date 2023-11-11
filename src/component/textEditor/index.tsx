import { Button, ButtonGroup, Popover, PopoverContent, PopoverTrigger, Spinner, Textarea } from '@nextui-org/react';
import { debounce } from 'lodash-es';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { ChromePicker } from '../colorPicker';
import { SimpleSizer } from '../sizer';
import { alignCenter, alignLeft, alignRight, bold, italic, underline } from './icon';

export interface State {
  content: string;
  size: string;
  color: string;
  align: Pick<React.CSSProperties, 'textAlign'>['textAlign'];
  bold: boolean;
  underline: boolean;
  italic: boolean;
}

interface TextEditorProps {
  state: State;
  onChangeBefore?: (state: State) => void;
  onChange: (update: State | ((prevState: State) => State)) => void;
}

const activeColor = 'rgb(217, 217, 217)';

export const TextEditor = ({ state, onChangeBefore, onChange }: TextEditorProps) => {
  const [color, setColor] = useState(state.color);

  const update = (key: keyof State) => {
    return (value: string | boolean) => {
      onChange((pre: State) => {
        const result = {
          ...pre,
          [key]: value,
        };
        onChangeBefore && onChangeBefore(result);
        return result;
      });
    };
  };

  const watchColor = useCallback(
    debounce((color: string) => {
      update('color')(color);
    }, 30),
    [],
  );

  useEffect(() => {
    watchColor(color);
  }, [color]);

  return (
    <div className='grid grid-cols-1 gap-10'>
      <Textarea
        size='sm'
        labelPlacement='outside'
        label='content'
        value={state.content}
        onChange={(e) => update('content')(e.target.value)}
      />
      <div className='flex'>
        <div className='max-w-[100px]'>
          <SimpleSizer labelPlacement='outside' label='font' value={state.size} onChange={update('size')} />
        </div>
        <ButtonGroup isIconOnly className='justify-start' variant='bordered' size='sm'>
          <Popover placement='left-end' className='p-0'>
            <PopoverTrigger>
              <Button style={{ backgroundColor: color }}></Button>
            </PopoverTrigger>
            <PopoverContent>
              <Suspense fallback={<Spinner />}>
                <ChromePicker color={color} onChange={(v) => setColor(v.hex)} />
              </Suspense>
            </PopoverContent>
          </Popover>
          <Button
            style={{ backgroundColor: state.align === 'left' ? activeColor : 'transparent' }}
            onClick={() => update('align')('left')}
          >
            {alignLeft}
          </Button>
          <Button
            style={{ backgroundColor: state.align === 'center' ? activeColor : 'transparent' }}
            onClick={() => update('align')('center')}
          >
            {alignCenter}
          </Button>
          <Button
            style={{ backgroundColor: state.align === 'right' ? activeColor : 'transparent' }}
            onClick={() => update('align')('right')}
          >
            {alignRight}
          </Button>
          <Button
            style={{ backgroundColor: state.bold ? activeColor : 'transparent' }}
            onClick={() => update('bold')(!state.bold)}
          >
            {bold}
          </Button>
          <Button
            style={{ backgroundColor: state.underline ? activeColor : 'transparent' }}
            onClick={() => update('underline')(!state.underline)}
          >
            {underline}
          </Button>
          <Button
            style={{ backgroundColor: state.italic ? activeColor : 'transparent' }}
            onClick={() => update('italic')(!state.italic)}
          >
            {italic}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
