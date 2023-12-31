import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import React, { useState } from 'react';
import { layoutState, layoutStateAtom } from '../store/designer';
import { metaStateAtom } from '../store/meta';
import { drawingSchemaIdAtom, schemasAtom } from '../store/schema';
import { SchemaEditor } from './schemaEditor';
import { SchemaMask } from './schemaMask';
import { SchemaRender } from './schemaRender';

export const Canvas = () => {
  const schemas = useAtomValue(schemasAtom);
  const [drawingScheamId, setDrawingScheamId] = useAtom(drawingSchemaIdAtom);
  const setState = useSetAtom(layoutStateAtom);
  const setMetaState = useSetAtom(metaStateAtom);
  const resetLayoutState = useResetAtom(layoutStateAtom);
  const resetMetaState = useResetAtom(metaStateAtom);
  const [showEditor, setShowEditor] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    setShowEditor(false);
    if (!element.id) {
      setDrawingScheamId('');
      resetLayoutState();
      resetMetaState();
      return;
    }
    const schema = schemas.find((item) => item.id === element.id)!;
    setDrawingScheamId(element.id);
    setState({ ...layoutState, ...(schema.style as typeof layoutState) });
    setMetaState(schema.meta);
  };

  const handleShowEditor = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const next = !showEditor;
    next && handleClick(e);
    setShowEditor(next);
  };

  return (
    <div
      className='overflow-auto relative w-screen min-h-screen bg-white shadow-medium'
      onClick={handleClick}
      onDoubleClick={handleShowEditor}
    >
      {schemas.map((item) => (
        <SchemaRender key={item.id} {...item} />
      ))}
      <SchemaMask id={drawingScheamId} />
      {showEditor && <SchemaEditor id={drawingScheamId} />}
    </div>
  );
};
