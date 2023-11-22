import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import React from 'react';
import { designerAtom, designerState } from '../store/designer';
import { drawingSchemaIdAtom, schemasAtom } from '../store/schema';
import { allowSelectAtom } from '../store/toolbar';
import { SchemaMask } from './schemaMask';
import { SchemaRender } from './schemaRender';

export const Canvas = () => {
  const schemas = useAtomValue(schemasAtom);
  const setDrawingScheamId = useSetAtom(drawingSchemaIdAtom);
  const allowSelect = useAtomValue(allowSelectAtom);
  const setState = useSetAtom(designerAtom);
  const resetState = useResetAtom(designerAtom);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!allowSelect) return;
    const element = event.target as HTMLDivElement;
    if (!element.id) {
      setDrawingScheamId('');
      resetState();
      return;
    }
    const schema = schemas.find((item) => item.id === element.id)!;
    setDrawingScheamId(element.id);
    setState({ ...designerState, ...(schema.style as typeof designerState) });
  };

  return (
    <div className='overflow-auto relative w-screen min-h-screen bg-white shadow-medium' onClick={handleClick}>
      {schemas.map((item) => (
        <SchemaRender key={item.id} {...item} />
      ))}
      <SchemaMask />
    </div>
  );
};
