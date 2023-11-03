import { Schema, SchemaType } from "../../types/schema";

export const SchemaRender = (schema: Schema) => {
  const render = {
    [SchemaType.Text]: <div>文本</div>,
    [SchemaType.Shape]: <div>图形</div>,
    [SchemaType.Image]: <div>图片</div>,
  }

  return <div style={schema.style}>
    {render[schema.type]}
  </div>;
};
