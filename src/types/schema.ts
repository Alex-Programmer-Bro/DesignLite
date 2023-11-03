export enum SchemaType {
  Image,
  Text,
  Shape
}

export type Schema = {
  id: string;
  type: SchemaType
  style: React.CSSProperties
}
