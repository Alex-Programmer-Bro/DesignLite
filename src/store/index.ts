import { ExtractAtomValue, WritableAtom, createStore } from 'jotai';

export const appStore = createStore();

export const updateStateAtom = <T extends WritableAtom<any, [(pre: any) => any], unknown>>(atom: T, sync?: (value: ExtractAtomValue<T>) => void) => {
  const state = appStore.get(atom);
  const api = {} as Record<keyof ExtractAtomValue<T>, (value: string) => void>
  for (const key in state) {
    api[key as keyof T] = (value) => {
      const result = {
        ...state,
        [key]: value
      }
      sync && sync(result);
      appStore.set(atom, result);
    }
  }
  return api;
}
