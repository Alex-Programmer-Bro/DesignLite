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

class StyleMediator {
  public defaultState = {
    display: 'inline-block',
    width: '0px',
    height: '0px',
    margin: '0px',
    padding: '0px',
    borderRadius: '0px',
    backgroundColor: '#ffffff',
  };

  private state: typeof this.defaultState = {
    ...this.defaultState,
  };

  private listeners: Set<Function> = new Set();

  getState() {
    return this.state;
  }

  setState(newState: Partial<typeof this.state>): void {
    this.state = { ...this.defaultState, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  resetState() {
    this.state = { ...this.defaultState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener: Function) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const styleMediator = new StyleMediator();
