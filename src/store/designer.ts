import { atom } from "jotai";
import { appStore } from ".";
import { drawingSchemaIdAtom, updateSchema } from "./schema";

export const baseStyleAtom = atom({
  width: '0px',
  height: '0px',
  margin: '0px',
  padding: '0px',
  backgroundColor: '#ffffff',
});
baseStyleAtom.debugLabel = '元素基础样式'

export const textStyleAtom = atom({
  content: '',
  size: '14px',
  color: '#000000'
});

export const syncDrawingSchema = () => {
  return appStore.sub(textStyleAtom, () => {
    const value = appStore.get(textStyleAtom);
    const id = appStore.get(drawingSchemaIdAtom);
    updateSchema(appStore.set, {
      id,
      schema: {
        content: value.content,
        style: {
          fontSize: value.size,
          color: value.color
        }
      }
    });
  });
}


textStyleAtom.debugLabel = '当前元素的文本样式';
