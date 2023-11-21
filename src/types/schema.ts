import { designerState } from '../store/designer';

export enum SchemaType {
  Block = '块',
  Image = '图片',
}

export type Schema = {
  id: string;
  type: SchemaType;
  style: Partial<typeof designerState>;
  content?: string;
};
