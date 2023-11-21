import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { useDesignerMediator } from '../hook/useMediator';
import { drawingSchemaIdAtom, schemasAtom } from '../store/schema';
import { allowSelectAtom } from '../store/toolbar';
import { SchemaMask } from './schemaMask';
import { SchemaRender } from './schemaRender';

export const Canvas = () => {
  const schemas = useAtomValue(schemasAtom);
  const setDrawingScheamId = useSetAtom(drawingSchemaIdAtom);
  const allowSelect = useAtomValue(allowSelectAtom);
  const { setState, resetState } = useDesignerMediator();

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
    setState(schema.style);
  };

  return (
    <div className='overflow-auto relative w-screen pl-[70px] h-screen' onClick={handleClick}>
      {schemas.map((item) => (
        <SchemaRender key={item.id} {...item} />
      ))}
      <SchemaMask />
    </div>
  );
};
