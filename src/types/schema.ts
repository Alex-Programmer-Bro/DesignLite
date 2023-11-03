export enum SchemaType {
  Text = '文本',
  Shape = '图形',
  Image = '图片',
}

export type Schema = {
  id: string;
  type: SchemaType
  style: React.CSSProperties
}
