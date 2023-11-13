import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from '@nextui-org/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Suspense } from 'react';
import { ImageURLAtom, baseStyleAtom, textStyleAtom } from '../store/designer';
import { getActionSchemaTypeAtom, setDrawingSchemaAtom } from '../store/schema';
import { SchemaType } from '../types/schema';
import { ChromePicker } from './colorPicker';
import { ComplicatedSizer, SimpleSizer } from './sizer';
import { TextEditor } from './textEditor';

export const Designer = () => {
  const [baseState, setBaseState] = useAtom(baseStyleAtom);
  const [textState, setTextState] = useAtom(textStyleAtom);
  const setDrawingSchema = useSetAtom(setDrawingSchemaAtom);
  const type = useAtomValue(getActionSchemaTypeAtom);
  const [imageURL, setImageURL] = useAtom(ImageURLAtom);

  const stateAdaptor = (key: string) => {
    return (v: string) =>
      setBaseState((pre) => {
        const result = { ...pre, [key]: v };
        setDrawingSchema({
          style: {
            width: result.width,
            height: result.height,
            margin: result.margin,
            padding: result.padding,
            backgroundColor: result.backgroundColor,
          },
        });
        return result;
      });
  };

  return (
    <div className='w-[400px] fixed top-0 right-0 m-4'>
      <Card className='w-full max-h-[90vh] overflow-auto'>
        <CardHeader className='flex gap-3'>Designer</CardHeader>
        <Divider />
        <CardBody className='my-4'>
          <div className='grid grid-cols-2 gap-10 mb-10'>
            <SimpleSizer
              labelPlacement='outside'
              label={'width'}
              value={baseState.width}
              onChange={stateAdaptor('width')}
            />
            <SimpleSizer
              labelPlacement='outside'
              label={'height'}
              value={baseState.height}
              onChange={stateAdaptor('height')}
            />
            <ComplicatedSizer label={'margin'} value={baseState.margin} onChange={stateAdaptor('margin')} />
            <ComplicatedSizer label={'padding'} value={baseState.padding} onChange={stateAdaptor('padding')} />
          </div>
          <label className='flex items-center'>
            <span className='text-[12px] font-medium mr-4'>background</span>
            <Popover placement='left-end' className='p-0'>
              <PopoverTrigger>
                <Button size='sm' variant='bordered' style={{ backgroundColor: baseState.backgroundColor }}></Button>
              </PopoverTrigger>
              <PopoverContent>
                <Suspense fallback={<Spinner />}>
                  <ChromePicker
                    color={baseState.backgroundColor}
                    onChange={(v) => stateAdaptor('backgroundColor')(v.hex)}
                  />
                </Suspense>
              </PopoverContent>
            </Popover>
          </label>
          <Divider className='my-10' />
          {type === SchemaType.Image ? (
            <Input type='url' label='Image URL' value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
          ) : (
            <TextEditor
              state={textState}
              onChangeBefore={(state) => {
                setDrawingSchema({
                  content: state.content,
                  style: {
                    fontSize: state.size,
                    color: state.color,
                    fontWeight: state.bold ? 800 : 400,
                    textDecoration: state.underline ? 'underline' : 'auto',
                    fontStyle: state.italic ? 'italic' : 'inherit',
                    textAlign: state.align,
                  },
                });
              }}
              onChange={setTextState}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};
