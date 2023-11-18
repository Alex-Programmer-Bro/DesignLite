import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { drawingSchemaIdAtom, schemasAtom } from '../store/schema';
import { designerDefaultStyle, designerStyleAtom } from '../store/share';
import { allowSelectAtom } from '../store/toolbar';
import { SchemaMask } from './schemaMask';
import { SchemaRender } from './schemaRender';

export const Canvas = () => {
  const schemas = useAtomValue(schemasAtom);
  const setDrawingScheamId = useSetAtom(drawingSchemaIdAtom);
  const setDesignerStyle = useSetAtom(designerStyleAtom);
  const allowSelect = useAtomValue(allowSelectAtom);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!allowSelect) return;
    const element = event.target as HTMLDivElement;
    if (!element.id) {
      setDrawingScheamId('');
      return;
    }
    const schema = schemas.find((item) => item.id === element.id)!;
    setDrawingScheamId(element.id);
    setDesignerStyle({ ...designerDefaultStyle, ...schema.style });
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
