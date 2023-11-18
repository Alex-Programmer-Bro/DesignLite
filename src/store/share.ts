import { atomWithReset } from 'jotai/utils';
import { CSSInterface } from '../types/meta';

export const designerDefaultStyle = {
  display: 'inline-block',
  width: '0px',
  height: '0px',
  margin: '0px',
  padding: '0px',
  borderRadius: '0px',
  backgroundColor: '#ffffff',
};
export const designerStyleAtom = atomWithReset<CSSInterface>({ ...designerDefaultStyle });
designerStyleAtom.debugLabel = 'Desinger';
