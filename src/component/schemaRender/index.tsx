import { Schema, SchemaType } from "../../types/schema";
import { TextRender } from "./text";

export const SchemaRender = (schema: Schema) => {
  const render = {
    [SchemaType.Text]: <TextRender
      id={schema.id}
      style={schema.style}
      text={schema.content || ''}
    />,
    [SchemaType.Shape]: <div id={schema.id}>图形</div>,
    [SchemaType.Image]: <img src={schema.content} style={schema.style} alt="" id={schema.id} />,
  }

  return render[schema.type];
};
