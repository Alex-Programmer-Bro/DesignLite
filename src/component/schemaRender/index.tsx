import { CSSProperties } from 'react';
import { Schema, SchemaType } from '../../types/schema';
import { BlockRender } from './block';

export const SchemaRender = (schema: Schema) => {
  const render = {
    [SchemaType.Block]: <BlockRender id={schema.id} style={schema.style as CSSProperties} />,
    [SchemaType.Image]: <img src={schema.content} style={schema.style as CSSProperties} alt='' id={schema.id} />,
  };

  return render[schema.type];
};
