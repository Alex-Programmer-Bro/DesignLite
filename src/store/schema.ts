import { atom, Setter } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { v1 } from 'uuid';
import { DrawingSchemaKey, SchemaCacheKey } from '../constant';
import { Schema, SchemaType } from '../types/schema';
import { baseStyleAtom, ImageURLAtom, textStyleAtom } from './designer';
import { selectedDrawTypeAtom } from './toolbar';

export const schemasAtom = atomWithStorage<Schema[]>(SchemaCacheKey, []);
schemasAtom.debugLabel = '画布上所有的 Schema';

export const drawingSchemaIdAtom = atomWithStorage<string>(DrawingSchemaKey, '');
drawingSchemaIdAtom.debugLabel = '选中了哪个 Schema Id';

export const getDrawingSchema = atom(get => {
  const id = get(drawingSchemaIdAtom);
  if (id) {
    const schemas = get(schemasAtom);
    const target = schemas.find(item => item.id === id);

    if (!target && schemas.length) {
      console.warn(`loss drawing schema about drawingSchema'id ${id} and ${schemas}`);
    }

    return target;
  } else {
    return undefined;
  }
});
getDrawingSchema.debugLabel = '正在绘制的元素';

export const getActionSchemaTypeAtom = atom(get => {
  const drawingSchema = get(getDrawingSchema);
  if (drawingSchema) {
    return drawingSchema.type;
  }
  return get(selectedDrawTypeAtom);
});
getActionSchemaTypeAtom.debugLabel = '准备添加或正在编辑的 SchemaType'

export const updateSchema = (set: Setter, { id, schema }: { id: string; schema: Partial<Schema> }) => {
  set(schemasAtom, pre => {
    return pre.map(item => {
      if (item.id === id) {
        const result: Schema = {
          ...item,
          ...schema,
          style: {
            ...item.style,
            ...schema.style
          },
          content: schema.content || item.content
        }
        return result;
      }
      return item;
    })
  });
}

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
  const imageURL = get(ImageURLAtom);

  const newSchema: Schema = {
    id: v1(),
    type: drawType,
    style: {}
  }

  if (drawType === SchemaType.Text) {
    newSchema.style = {
      ...newSchema.style,
      ...baseStyle,
      lineHeight: 1,
      outline: '2px solid transparent',
      minWidth: '30px',
      fontSize: textStyle.size,
      color: textStyle.color,
      fontWeight: textStyle.bold ? 800 : 400,
      textDecoration: textStyle.underline ? 'underline' : 'auto',
      fontStyle: textStyle.italic ? 'italic' : 'inherit',
      textAlign: textStyle.align,
    }
    newSchema.content = textStyle.content;
  } else if (drawType === SchemaType.Image) {
    newSchema.content = imageURL;
  }

  set(drawingSchemaIdAtom, newSchema.id);
  set(schemasAtom, pre => [...pre, newSchema]);
});

export const resetAtom = atom(null, (_, set) => {
  set(schemasAtom, []);
  set(drawingSchemaIdAtom, '');
});

export const useTemplateAtom = atom(null, (_, set) => {
  set(schemasAtom, [
    {
      id: '1',
      type: SchemaType.Text,
      content: `1 少壮不努力，老大徒悲伤。—— 汉乐府古辞《长歌行》
      <br />
      2 业精于勤，荒于嬉。—— 韩 愈《进学解》
      <br />
      3 一寸光阴一寸金，寸金难买寸光阴。——《增广贤文》
      <br />
      4 天行健，君子以自强不息。——《周易·乾·象》
      <br />
      5 志不强者智不达。——《墨子·修身》名言名句
      <br />
      6 青，取之于蓝而青于蓝；冰，水为之而寒于水。 ——《荀子·劝学》
      <br />
      7 志当存高远。—— 诸葛亮《诫外生书》
      <br />
      8 丈夫志四海，万里犹比邻。—— 曹 植《赠白马王彪》 
      <br />
      9 有志者事竟成。 ——《后汉书·耿 列传》`,
      style: {
        display: 'block',
        margin: '20px auto',
        padding: '20px',
        width: 800,
        height: 300,
        background: '#ddd',
        borderRadius: 10,
        boxShadow: '10px 10px 10px #ccc',
      }
    },
    {
      id: '2',
      type: SchemaType.Image,
      content: 'https://media.istockphoto.com/id/1217161735/photo/roccella-jonica-city-calabria.jpg?s=2048x2048&w=is&k=20&c=tNY_66IckqAplO39CCw8y-7fnndJ-80b4QAd_d8-3G0=',
      style: {
        display: 'block',
        margin: '40px auto',
        width: 800,
        height: 'auto'
      }
    }
  ]);
});

export const exportAssetsAtom = atom(null, (get) => {
  const schemas = get(schemasAtom);
  console.log(schemas);
});
