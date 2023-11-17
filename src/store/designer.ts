import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { State as TextEditorState } from '../component/textEditor';

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
