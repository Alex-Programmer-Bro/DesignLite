import { atomWithStorage } from 'jotai/utils'
import { SchemaCacheKey } from '../constant'
import { Schema, SchemaType } from '../types/schema'
import { atom } from 'jotai';
import { selectedDrawTypeAtom } from './toolbar';
import { v1 } from 'uuid'

export const schemasAtom = atomWithStorage<Schema[]>(SchemaCacheKey, []);

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

  set(schemasAtom, pre => [...pre, newSchema]);
});
