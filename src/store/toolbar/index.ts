import { atom } from 'jotai';
import { DrawType } from './type';

export const selectedDrawTypeAtom = atom<DrawType>(DrawType.rect);
