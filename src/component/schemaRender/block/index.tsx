import { Schema } from '../../../types/schema';

export interface BlockRenderProps {
  style: React.CSSProperties;
  id: string;
}

export const BlockRender = (schema: Schema) => {
  return (
    <pre aria-label='schema' style={schema.style as React.CSSProperties} id={schema.id}>
      {schema.meta.content}
    </pre>
  );
};
