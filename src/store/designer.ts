import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { setDrawingSchemaAtom } from './schema';

export const layoutState = {
  display: 'inline-block',
  width: '0px',
  height: '0px',
  margin: '0px',
  padding: '0px',
  borderRadius: '0px',
  backgroundColor: '#ffffff',
};

export const metaState = {
  fontSize: '14px',
  color: '#000000',
  fontWeight: '400',
  textDecoration: 'auto',
  fontStyle: 'inherit',
  textAlign: 'left',
  content: '',
  imgURL: '',
};

export const designerState = {
  ...layoutState,
  ...metaState,
};

export const designerAtom = atomWithReset({ ...designerState });
designerAtom.debugLabel = 'Designer';

export const setDesignerStateAtom = atom(
  null,
  (get, set, { key, v }: { key: keyof typeof designerState; v: string }) => {
    const state = get(designerAtom);
    const style = { ...state, [key]: v };
    set(setDrawingSchemaAtom, { style });
    set(designerAtom, style);
  },
);
