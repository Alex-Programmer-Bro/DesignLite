import { CSSProperties } from 'react';
import { Schema, SchemaType } from '../../types/schema';
import { BlockRender } from './block';

export const SchemaRender = (schema: Schema) => {
  const render = {
    [SchemaType.Block]: <BlockRender {...schema} />,
    [SchemaType.Image]: <img src={schema.meta.imageURL} style={schema.style as CSSProperties} alt='' id={schema.id} />,
  };

  return render[schema.type];
};
