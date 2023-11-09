import { atom } from "jotai";
import { appStore } from "..";
import { SchemaType } from "../../types/schema";
import { deleteSchameAtom, drawingSchemaIdAtom } from "../schema";

export const selectedDrawTypeAtom = atom<SchemaType>(SchemaType.Text);
selectedDrawTypeAtom.debugLabel = "准备添加的 Schema 类型";

export const allowSelectAtom = atom<boolean>(false);
allowSelectAtom.debugLabel = "是否允许选择 Schema";

appStore.sub(allowSelectAtom, () => {
  const allowSelect = appStore.get(allowSelectAtom);
  if (!allowSelect) {
    appStore.set(drawingSchemaIdAtom, "");
  }
});

window.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.code === "Backspace" && appStore.get(allowSelectAtom)) {
    appStore.get(drawingSchemaIdAtom) && appStore.set(deleteSchameAtom);
  }
});
