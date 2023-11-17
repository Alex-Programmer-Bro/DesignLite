import { atom } from 'jotai';
import { RESET, atomWithReset } from 'jotai/utils';
import { State as TextEditorState } from '../component/textEditor';
import { CSSInterface } from '../types/meta';

export const baseStyleAtom = atomWithReset<CSSInterface>({
  display: 'inline-block',
  width: '0px',
  height: '0px',
  margin: '0px',
  padding: '0px',
  borderRadius: '0px',
  backgroundColor: '#ffffff',
});
baseStyleAtom.debugLabel = '元素基础样式';

export const extraStyleAtom = atomWithReset<TextEditorState>({
  content: '',
  size: '14px',
  color: '#000000',
  align: 'left',
  bold: false,
  underline: false,
  italic: false,
});
extraStyleAtom.debugLabel = '当前元素的文本样式';

export const ImageURLAtom = atom('');
ImageURLAtom.debugLabel = 'Designer 上的图片地址';

export const resetStyleAtom = atom(null, (_, set) => {
  set(baseStyleAtom, RESET);
  set(extraStyleAtom, RESET);
});
