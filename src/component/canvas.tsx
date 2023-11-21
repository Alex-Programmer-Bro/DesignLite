import { useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useDesignerMediator } from '../hook/useMediator';
import { appStore } from '../store';
import { drawingSchemaIdAtom, schemasAtom, setDrawingSchemaAtom } from '../store/schema';
import { allowSelectAtom } from '../store/toolbar';
import { SchemaMask } from './schemaMask';
import { SchemaRender } from './schemaRender';

export const Canvas = () => {
  const schemas = useAtomValue(schemasAtom);
  const setDrawingScheamId = useSetAtom(drawingSchemaIdAtom);
  const allowSelect = useAtomValue(allowSelectAtom);
  const { state, setState } = useDesignerMediator();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!allowSelect) return;
    const element = event.target as HTMLDivElement;
    if (!element.id) {
      setDrawingScheamId('');
      return;
    }
    const schema = schemas.find((item) => item.id === element.id)!;
    setDrawingScheamId(element.id);
    setState(schema.style);
  };

  useEffect(() => {
    if (!setDrawingScheamId) return;
    appStore.set(setDrawingSchemaAtom, { style: state });
  }, [state]);

  return (
    <div className='overflow-auto relative w-screen pl-[70px] h-screen' onClick={handleClick}>
      {schemas.map((item) => (
        <SchemaRender key={item.id} {...item} />
      ))}
      <SchemaMask />
    </div>
  );
};
