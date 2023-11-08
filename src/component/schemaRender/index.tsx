import { Schema, SchemaType } from "../../types/schema";
import { TextRender } from "./text";

export const SchemaRender = (schema: Schema) => {
  const render = {
    [SchemaType.Text]: <TextRender
      style={schema.style}
      text={schema.content || ''}
    />,
    [SchemaType.Shape]: <div>图形</div>,
    [SchemaType.Image]: <div>图片</div>,
  }

  return <div style={schema.style}>
    {render[schema.type]}
  </div>;
};
