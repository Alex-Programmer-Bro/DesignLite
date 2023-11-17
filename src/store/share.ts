import { atomWithReset } from 'jotai/utils';
import { CSSInterface } from '../types/meta';

export const designerStyleAtom = atomWithReset<CSSInterface>({
  display: 'inline-block',
  width: '0px',
  height: '0px',
  margin: '0px',
  padding: '0px',
  borderRadius: '0px',
  backgroundColor: '#ffffff',
});
designerStyleAtom.debugLabel = 'Desinger';

// Designer 变了之后，怎么去更新正在绘制的元素状态呢？
