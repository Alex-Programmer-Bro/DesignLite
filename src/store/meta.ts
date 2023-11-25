import { atomWithReset } from 'jotai/utils';
import { Schema } from '../types/schema';

export const metaStateAtom = atomWithReset<Schema['meta']>({
  content: '',
  imageURL: '',
});
