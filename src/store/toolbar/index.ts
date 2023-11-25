import { atom } from 'jotai';
import { SchemaType } from '../../types/schema';

export const selectedDrawTypeAtom = atom<SchemaType>(SchemaType.Block);
selectedDrawTypeAtom.debugLabel = '准备添加的 Schema 类型';
