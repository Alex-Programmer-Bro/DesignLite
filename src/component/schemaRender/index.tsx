import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { drawingSchemaIdAtom } from "../../store/schema";
import { Schema, SchemaType } from "../../types/schema";
import { TextRender } from "./text";

export const SchemaRender = (schema: Schema) => {
  const id = useAtomValue(drawingSchemaIdAtom);

  const className = useMemo(() => {
    if (schema.id === id) return 'schema-active';
    return ''
  }, [schema.id, id]);

  const render = {
    [SchemaType.Text]: <TextRender
      className={className}
      id={schema.id}
      style={schema.style}
      text={schema.content || ''}
    />,
    [SchemaType.Shape]: <div className={className} id={schema.id}>图形</div>,
    [SchemaType.Image]: <img className={className} src={schema.content} style={schema.style} alt="" id={schema.id} />,
  }

  return render[schema.type];
};
