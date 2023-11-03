import { atomWithStorage } from 'jotai/utils'
import { SchemaCacheKey } from '../constant'
import { Schema } from '../types/schema'

export const schemasAtom = atomWithStorage<Schema[]>(SchemaCacheKey, []);
