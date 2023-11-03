import { atomWithStorage } from 'jotai/utils'
import { DrawingSchemaKey, SchemaCacheKey } from '../constant'
import { Schema, SchemaType } from '../types/schema'
import { atom } from 'jotai';
import { selectedDrawTypeAtom } from './toolbar';
import { v1 } from 'uuid'

export const schemasAtom = atomWithStorage<Schema[]>(SchemaCacheKey, []);

export const drawingSchemaIdAtom = atomWithStorage<string>(DrawingSchemaKey, '');

export const getDrawingSchema = atom(get => {
  const id = get(drawingSchemaIdAtom);
  if (id) {
    const schemas = get(schemasAtom);
    const target = schemas.find(item => item.id === id);

    if (!target) {
      console.warn(`loss drawing schema about drawingSchema'id ${id} and ${schemas}`);
    }

    return target;
  } else {
    return undefined;
  }
})

export const createSchemaAtom = atom(null, (get, set) => {
  const drawType = get(selectedDrawTypeAtom);

  const newSchema: Schema = {
    id: v1(),
    type: drawType,
    style: {
      display: 'inline-block'
    }
  }

  if (drawType === SchemaType.Text) {
    newSchema.style = {
      ...newSchema.style,
      lineHeight: 1,
      outline: '2px solid transparent',
      minWidth: '30px',
      padding: '0.25rem'
    }
  }

  set(drawingSchemaIdAtom, newSchema.id);
  set(schemasAtom, pre => [...pre, newSchema]);
});
