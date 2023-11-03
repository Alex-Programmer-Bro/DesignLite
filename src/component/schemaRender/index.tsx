import { Schema, SchemaType } from "../../types/schema";
import { TextEditor } from "../textEditor";

export const SchemaRender = (schema: Schema) => {
  const render = {
    [SchemaType.Text]: <TextEditor
      style={schema.style}
      text={schema.content || ''}
      onChange={text => {
        console.log(text);
      }} />,
    [SchemaType.Shape]: <div>图形</div>,
    [SchemaType.Image]: <div>图片</div>,
  }

  return <div style={schema.style}>
    {render[schema.type]}
  </div>;
};
