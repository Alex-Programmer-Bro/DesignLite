import { Card, Input, Textarea } from '@nextui-org/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { updateStateAtom } from '../store';
import { metaStateAtom } from '../store/meta';
import { getDrawingSchema, setDrawingSchemaAtom } from '../store/schema';
import { SchemaType } from '../types/schema';

export const Meta = () => {
  const { type } = useAtomValue(getDrawingSchema)!;
  const state = useAtomValue(metaStateAtom);
  const updateDrawingSchema = useSetAtom(setDrawingSchemaAtom);
  const updateMeta = updateStateAtom(metaStateAtom, (meta) => {
    updateDrawingSchema({ meta });
  });

  return (
    <>
      <div className='fixed left-0 right-0 m-4 w-[300px]' onWheel={(e) => e.stopPropagation()}>
        <Card className='overflow-auto p-4 w-[300px]' style={{ maxHeight: 'calc(100vh - 32px)' }}>
          {type === SchemaType.Image ? (
            <Input
              type='url'
              label='Image URL'
              value={state.imageURL}
              onChange={(e) => updateMeta.imageURL(e.target.value)}
            />
          ) : (
            <Textarea
              size='sm'
              labelPlacement='outside'
              label='content'
              value={state.content}
              onChange={(e) => updateMeta.content(e.target.value)}
            />
          )}
        </Card>
      </div>
    </>
  );
};
