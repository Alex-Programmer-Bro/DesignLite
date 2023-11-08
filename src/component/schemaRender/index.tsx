import { setDrawingSchemaAtom } from "../../store/schema";
import { Schema, SchemaType } from "../../types/schema";
import { TextRender } from "./text";
import { useSetAtom } from 'jotai'

export const SchemaRender = (schema: Schema) => {
  const setDrawingSchema = useSetAtom(setDrawingSchemaAtom);

  const render = {
    [SchemaType.Text]: <TextRender
      id={schema.id}
      style={schema.style}
      text={schema.content || ''}
      onChange={text => {
        setDrawingSchema({ content: text });
      }} />,
    [SchemaType.Shape]: <div>图形</div>,
    [SchemaType.Image]: <div>图片</div>,
  }

  return <div style={schema.style}>
    {render[schema.type]}
  </div>;
};
