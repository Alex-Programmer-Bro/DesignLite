import { atom } from "jotai";
import { appStore } from "..";
import { SchemaType } from "../../types/schema";
import { drawingSchemaIdAtom } from "../schema";

export const selectedDrawTypeAtom = atom<SchemaType>(SchemaType.Text);
selectedDrawTypeAtom.debugLabel = "准备添加的 Schema 类型";

export const allowSelectAtom = atom<boolean>(false);
selectedDrawTypeAtom.debugLabel = "是否允许选择 Schema";

appStore.sub(allowSelectAtom, () => {
  const allowSelect = appStore.get(allowSelectAtom);
  if (!allowSelect) {
    appStore.set(drawingSchemaIdAtom, "");
    
    const elements = document.getElementsByClassName("schema-active");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("schema-active");
    }
  }
});
