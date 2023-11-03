export enum SchemaType {
  Image = '图片',
  Text = '文本',
  Shape = '图形'
}

export type Schema = {
  id: string;
  type: SchemaType
  style: React.CSSProperties
}
