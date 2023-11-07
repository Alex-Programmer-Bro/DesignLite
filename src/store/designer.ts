import { atom } from "jotai";

export const baseStyleAtom = atom({
  width: '0px',
  height: '0px',
  margin: '0px',
  padding: '0px',
  backgroundColor: 'transparent',
});
baseStyleAtom.debugLabel = '元素基础样式'

export const textStyleAtom = atom({
  content: '',
  size: '14px',
  color: '#000000'
});
textStyleAtom.debugLabel = '当前元素的文本样式';
