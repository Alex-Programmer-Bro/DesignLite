import { atomWithStorage } from 'jotai/utils'
import { SchemaCacheKey } from '../constant'
import { Schema } from '../types/schema'
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

  set(schemasAtom, pre => [...pre, newSchema]);
});
