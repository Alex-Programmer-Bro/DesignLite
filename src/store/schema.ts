import { atom, Setter } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { v1 } from "uuid";
import { appStore } from ".";
import { DrawingSchemaKey, SchemaCacheKey } from "../constant";
import { Schema, SchemaType } from "../types/schema";
import { baseStyleAtom, textStyleAtom } from "./designer";
import { selectedDrawTypeAtom } from "./toolbar";

export const schemasAtom = atomWithStorage<Schema[]>(SchemaCacheKey, []);
schemasAtom.debugLabel = "画布上所有的 Schema";

export const drawingSchemaIdAtom = atomWithStorage<string>(DrawingSchemaKey, "");
drawingSchemaIdAtom.debugLabel = "选中了哪个 Schema Id";

export const getDrawingSchema = atom((get) => {
  const id = get(drawingSchemaIdAtom);
  if (id) {
    const schemas = get(schemasAtom);
    const target = schemas.find((item) => item.id === id);

    if (!target && schemas.length) {
      console.warn(`loss drawing schema about drawingSchema'id ${id} and ${schemas}`);
    }

    return target;
  } else {
    return undefined;
  }
});
getDrawingSchema.debugLabel = "正在绘制的元素";

export const updateSchema = (set: Setter, { id, schema }: { id: string; schema: Partial<Schema> }) => {
  set(schemasAtom, (pre) => {
    return pre.map((item) => {
      if (item.id === id) {
        const result: Schema = {
          ...item,
          ...schema,
          style: {
            ...item.style,
            ...schema.style
          }
        };
        return result;
      }
      return item;
    });
  });
};

export const setDrawingSchemaAtom = atom(null, (get, set, schema: Partial<Schema> = {}) => {
  const id = get(drawingSchemaIdAtom);
  updateSchema(set, { id, schema });
});

export const setSchemaAtom = atom(null, (_, set, { id, schema }: { id: string; schema: Partial<Schema> }) => {
  updateSchema(set, { id, schema });
});

export const createSchemaAtom = atom(null, (get, set) => {
  const drawType = get(selectedDrawTypeAtom);
  const textStyle = get(textStyleAtom);
  const baseStyle = get(baseStyleAtom);

  const newSchema: Schema = {
    id: v1(),
    type: drawType,
    style: {
      display: "inline-block"
    }
  };

  if (drawType === SchemaType.Text) {
    newSchema.style = {
      ...newSchema.style,
      ...baseStyle,
      lineHeight: 1,
      outline: "2px solid transparent",
      minWidth: "30px",
      fontSize: textStyle.size,
      color: textStyle.color,
      fontWeight: textStyle.bold ? 800 : 400,
      textDecoration: textStyle.underline ? "underline" : "auto",
      fontStyle: textStyle.italic ? "italic" : "inherit",
      textAlign: textStyle.align
    };
    newSchema.content = textStyle.content;
  }

  set(drawingSchemaIdAtom, newSchema.id);
  set(schemasAtom, (pre) => [...pre, newSchema]);
});

export const resetAtom = atom(null, (_, set) => {
  set(schemasAtom, []);
  set(drawingSchemaIdAtom, "");
});

appStore.sub(drawingSchemaIdAtom, () => {
  const id = appStore.get(drawingSchemaIdAtom);
  if (id) {
    const schemas = appStore.get(schemasAtom);
    const target = schemas.find((item) => item.id === id);

    if (!target) return;

    const { style, content } = target;

    appStore.set(baseStyleAtom, {
      width: `${style.width}` || "0px",
      height: `${style.height}` || "0px",
      margin: `${style.margin}` || "0px",
      padding: `${style.padding}` || "0px",
      backgroundColor: style.backgroundColor || "#ffffff"
    });
    appStore.set(textStyleAtom, {
      content: content || "",
      size: `${style.fontSize}` || "14px",
      color: style.color || "#000000",
      align: style.textAlign || "left",
      bold: style.fontWeight === 800,
      underline: style.textDecoration === "underline",
      italic: style.fontStyle === "italic"
    });
  }
});
