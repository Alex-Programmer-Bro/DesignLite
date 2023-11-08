import { Schema, SchemaType } from "./types/schema";

export const resolveHTML = (schema: Schema) => {
  switch (schema.type) {
    case SchemaType.Image:
      return `<img class="${schema.id}" src={${schema.content}} alt="" />`
    case SchemaType.Text:
      return `<span class="${schema.id}">${schema.content}</span>`
  }
}

const transferCSS = (style: React.CSSProperties) => {
  return Object.entries(style).map(([key, value]) => {
    return `${key.replace(/([A-Z]+)/, '-$1').toLowerCase()}:${value};`
  }).join('')
}
export const resolveCSS = (schema: Schema) => {
  return `.${schema.id} {
    ${transferCSS(schema.style)}
  }`
}
