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
  const drawingSchemaId = appStore.get(drawingSchemaIdAtom);
  if (!allowSelect) {
    document.getElementById(drawingSchemaId)?.classList.remove("schema-active");
    appStore.set(drawingSchemaIdAtom, "");
  }
});
