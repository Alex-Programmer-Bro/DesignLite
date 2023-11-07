import { atom, Setter } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { v1 } from 'uuid';
import { DrawingSchemaKey, SchemaCacheKey } from '../constant';
import { Schema, SchemaType } from '../types/schema';
import { selectedDrawTypeAtom } from './toolbar';

export const schemasAtom = atomWithStorage<Schema[]>(SchemaCacheKey, []);
schemasAtom.debugLabel = '画布上所有的 Schema';

export const drawingSchemaIdAtom = atomWithStorage<string>(DrawingSchemaKey, '');
drawingSchemaIdAtom.debugLabel = '选中了哪个 Schema Id'

export const getDrawingSchema = atom(get => {
  const id = get(drawingSchemaIdAtom);
  if (id) {
    const schemas = get(schemasAtom);
    const target = schemas.find(item => item.id === id);

    if (!target && schemas.length) {
      console.warn(`loss drawing schema about drawingSchema'id ${id} and ${schemas}`);
    }

    return target;
  } else {
    return undefined;
  }
});

const updateSchema = (set: Setter, { id, schema }: { id: string; schema: Partial<Schema> }) => {
  set(schemasAtom, pre => {
    return pre.map(item => {
      if (item.id === id) {
        const result = {
          ...item,
          ...schema
        }

        console.log(result);

        return result;
      }
      return item;
    })
  });
}

export const setDrawingSchemaAtom = atom(null, (get, set, schema: Partial<Schema> = {}) => {
  const id = get(drawingSchemaIdAtom);
  updateSchema(set, { id, schema });
});

export const setSchemaAtom = atom(null, (_, set, { id, schema }: { id: string; schema: Partial<Schema> }) => {
  updateSchema(set, { id, schema });
});

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

export const resetAtom = atom(null, (_, set) => {
  set(schemasAtom, []);
  set(drawingSchemaIdAtom, '');
})
