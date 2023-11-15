import { CSSInterface } from "./meta";

export enum SchemaType {
  Block = '块',
  Image = '图片',
}

export type Schema = {
  id: string;
  type: SchemaType;
  style: CSSInterface;
  content?: string;
};
