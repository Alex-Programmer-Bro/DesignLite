import { atom, Setter } from 'jotai';
import { atomWithStorage, RESET } from 'jotai/utils';
import { v1 } from 'uuid';
import { SchemaCacheKey } from '../constant';
import { resolveCSS, resolveHTML, uploadAndReadJSON } from '../tool';
import { Schema, SchemaType } from '../types/schema';
import { layoutState, layoutStateAtom } from './designer';
import { metaStateAtom } from './meta';
import { selectedDrawTypeAtom } from './toolbar';

export const schemasAtom = atomWithStorage<Schema[]>(SchemaCacheKey, []);
schemasAtom.debugLabel = '画布上所有的 Schema';

export const drawingSchemaIdAtom = atom<string>('');
drawingSchemaIdAtom.debugLabel = '选中了哪个 Schema Id';

export const selectedSchemaAtom = atom((get) => Boolean(get(drawingSchemaIdAtom)));
selectedSchemaAtom.debugPrivate = true;

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
getDrawingSchema.debugLabel = '正在绘制的元素';

export const getActionSchemaTypeAtom = atom((get) => {
  const drawingSchema = get(getDrawingSchema);
  if (drawingSchema) {
    return drawingSchema.type;
  }
  return get(selectedDrawTypeAtom);
});
getActionSchemaTypeAtom.debugLabel = '准备添加或正在编辑的 SchemaType';

export const updateSchema = (set: Setter, { id, schema }: { id: string; schema: Partial<Schema> }) => {
  set(schemasAtom, (pre) => {
    return pre.map((item) => {
      if (item.id === id) {
        const result: Schema = {
          ...item,
          ...schema,
          style: {
            ...item.style,
            ...schema.style,
          },
          meta: {
            ...item.meta,
            ...(schema.meta || {}),
          },
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

  const newSchema: Schema = {
    id: v1(),
    type: drawType,
    style: {
      display: 'block',
      width: '100%',
      height: '24px',
    },
    meta: {
      content: '',
      imageURL: '',
    },
  };

  set(drawingSchemaIdAtom, newSchema.id);
  set(schemasAtom, (pre) => [...pre, newSchema]);
  set(layoutStateAtom, { ...layoutState, ...newSchema.style });
});

export const useTemplateAtom = atom(null, (_, set) => {
  set(schemasAtom, [
    {
      id: 'hello-text',
      type: SchemaType.Block,

      style: {
        display: 'block',
        margin: '20px auto',
        padding: '20px',
        width: '800px',
        height: '300px',
        backgroundColor: '#ddd',
        borderRadius: '10px',
        fontSize: '16px',
      },
      meta: {
        content: `1 少壮不努力，老大徒悲伤。—— 汉乐府古辞《长歌行》
2 业精于勤，荒于嬉。—— 韩 愈《进学解》
3 一寸光阴一寸金，寸金难买寸光阴。——《增广贤文》
4 天行健，君子以自强不息。——《周易·乾·象》
5 志不强者智不达。——《墨子·修身》名言名句
6 青，取之于蓝而青于蓝；冰，水为之而寒于水。 ——《荀子·劝学》
7 志当存高远。—— 诸葛亮《诫外生书》
8 丈夫志四海，万里犹比邻。—— 曹 植《赠白马王彪》 
9 有志者事竟成。 ——《后汉书·耿 列传》`,
        imageURL: '',
      },
    },
    {
      id: 'hello-img',
      type: SchemaType.Image,
      style: {
        display: 'block',
        margin: '40px auto',
        width: '800px',
        height: 'auto',
      },
      meta: {
        content: '',
        imageURL:
          'https://media.istockphoto.com/id/1217161735/photo/roccella-jonica-city-calabria.jpg?s=2048x2048&w=is&k=20&c=tNY_66IckqAplO39CCw8y-7fnndJ-80b4QAd_d8-3G0=',
      },
    },
  ]);
});

export const getCodeAtom = atom((get) => {
  const schemas = get(schemasAtom);

  let { html, css } = schemas.reduce(
    (result, item) => {
      result.html += resolveHTML(item);
      result.css += resolveCSS(item);
      return result;
    },
    { html: '', css: '' },
  );

  return {
    html,
    css,
  };
});

const generateAssetsAtom = atom((get) => {
  const schemas = get(schemasAtom);
  let { html, css } = get(getCodeAtom);
  html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      * {
          margin: 0;
          padding: 0;
      }

      ${css}
    </style>
  </head>
  <body>
    ${html}
  </body>
  </html>
  `;
  return {
    html,
    schemas: JSON.stringify(schemas),
  };
});

export const exportAssetsAtom = atom(null, async (get) => {
  const { html, schemas } = get(generateAssetsAtom);
  if (isWeb) {
    const { default: JSZip } = await import('jszip');
    const zip = new JSZip();
    zip.file('index.html', html);
    zip.file('desingeLite.json', schemas);
    const content = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = 'website.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  } else {
    const { invoke } = await import('@tauri-apps/api/tauri');
    invoke('export_assets', { html, schemas });
  }
});

export const importConfigAtom = atom(null, async (_, set) => {
  const json = await uploadAndReadJSON();
  set(schemasAtom, json);
});

export const deleteSchameAtom = atom(null, (get, set) => {
  const id = get(drawingSchemaIdAtom);
  if (!id) return;

  set(
    schemasAtom,
    get(schemasAtom).filter((item) => item.id !== id),
  );
  set(drawingSchemaIdAtom, '');
  set(layoutStateAtom, RESET);
  set(metaStateAtom, RESET);
});
