import { useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { appStore } from '../store';
import { drawingSchemaIdAtom, schemasAtom, setDrawingSchemaAtom } from '../store/schema';
import { styleMediator } from '../store/share';
import { allowSelectAtom } from '../store/toolbar';
import { SchemaMask } from './schemaMask';
import { SchemaRender } from './schemaRender';

export const Canvas = () => {
  const [baseState, setBaseState] = useState(styleMediator.getState());
  const schemas = useAtomValue(schemasAtom);
  const setDrawingScheamId = useSetAtom(drawingSchemaIdAtom);
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
    styleMediator.setState(schema.style);
  };

  useEffect(() => {
    if (!setDrawingScheamId) return;
    const updateState = (newState: typeof baseState) => {
      setBaseState(newState);
      appStore.set(setDrawingSchemaAtom, { style: newState });
    };
    return styleMediator.subscribe(updateState);
  }, [setDrawingScheamId]);

  return (
    <div className='overflow-auto relative w-screen pl-[70px] h-screen' onClick={handleClick}>
      {schemas.map((item) => (
        <SchemaRender key={item.id} {...item} />
      ))}
      <SchemaMask />
    </div>
  );
};
