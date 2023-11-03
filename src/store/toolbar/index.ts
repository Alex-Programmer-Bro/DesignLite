import { atom } from 'jotai';
import { SchemaType } from '../../types/schema';

export const selectedDrawTypeAtom = atom<SchemaType>(SchemaType.Text);
