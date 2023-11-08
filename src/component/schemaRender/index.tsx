import { Schema, SchemaType } from "../../types/schema";
import { TextRender } from "./text";

export const SchemaRender = (schema: Schema) => {
  const render = {
    [SchemaType.Text]: <TextRender
      style={schema.style}
      text={schema.content || ''}
    />,
    [SchemaType.Shape]: <div>图形</div>,
    [SchemaType.Image]: <img src={schema.content} style={schema.style} alt="" />,
  }

  return render[schema.type];
};
