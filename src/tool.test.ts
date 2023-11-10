import { describe, expect, it } from 'vitest';
import { resolveCSS, resolveHTML } from './tool';
import { Schema, SchemaType } from './types/schema';

describe('resolve schema', () => {
  const textSchema: Schema = {
    id: 'hello',
    type: SchemaType.Block,
    style: {
      color: '#ffffff',
      backgroundColor: 'red'
    },
    content: 'hello world',
  }

  it('resolveHTML', () => {
    expect(resolveHTML(textSchema)).toMatchInlineSnapshot('"<span class=\\"hello\\">hello world</span>"');
  });

  it('resolveCSS', () => {
    expect(resolveCSS(textSchema)).toMatchInlineSnapshot(`
      ".hello {
          color:#ffffff;background-color:red;
        }"
    `);
  })
})
