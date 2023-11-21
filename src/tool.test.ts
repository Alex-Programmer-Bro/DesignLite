import { describe, expect, it, vi } from 'vitest';
import { resolveCSS, resolveHTML, uploadAndReadJSON } from './tool';
import { Schema, SchemaType } from './types/schema';

describe('resolve schema', () => {
  const textSchema: Schema = {
    id: 'hello',
    type: SchemaType.Block,
    style: {
      color: '#ffffff',
      backgroundColor: 'red',
      content: 'hello world',
    },
  };

  const imageSchema: Schema = {
    id: 'hello-img',
    type: SchemaType.Image,
    style: {
      borderRadius: '10px',
    },
    content: 'https://avatars.githubusercontent.com/u/115539090',
  };

  it('resolveHTML', () => {
    expect(resolveHTML(textSchema)).toMatchInlineSnapshot('"<pre class=\\"hello\\">hello world</pre>"');
    expect(resolveHTML(imageSchema)).toMatchInlineSnapshot(
      '"<img class=\\"hello-img\\" src=https://avatars.githubusercontent.com/u/115539090 alt=\\"\\" />"',
    );
  });

  it('resolveCSS', () => {
    expect(resolveCSS(textSchema)).toMatchInlineSnapshot(`
      ".hello {
          color:#ffffff;background-color:red;
        }"
    `);
  });
});
export const filesProcess = (fileList: FileList) => {
  if (Object.prototype.toString.call(fileList).split(' ')[1].slice(0, -1) != 'FileList')
    throw Error('Please input FileList type object as the argument.');

  for (let file of fileList) {
    console.log('File name: ' + file.name);
  }
};

describe('uploadAndReadJSON', () => {
  it('should parse valid JSON file', async () => {
    const fakeJSONContent = '{"key": "value"}';
    const fakeFile = new File([fakeJSONContent], 'test.json', {
      type: 'application/json',
    });

    const fakeFileList = {
      0: fakeFile,
      length: 1,
      item: (index: number) => (index === 0 ? fakeFile : null),
      [Symbol.iterator]: function* () {
        yield this[0];
      },
    } as FileList;

    const originalAppendChild = document.body.appendChild;
    document.body.appendChild = vi.fn(<T extends Node>(node: T) => {
      if (node instanceof HTMLInputElement && node.type === 'file') {
        Object.defineProperty(node, 'files', {
          value: fakeFileList,
          writable: true,
        });
        setTimeout(() => node.dispatchEvent(new Event('change')));
      }
      return originalAppendChild.call(document.body, node) as T;
    });

    await expect(uploadAndReadJSON()).resolves.toEqual({ key: 'value' });
    document.body.appendChild = originalAppendChild;
  });

  it('should throw error for invalid JSON file', async () => {
    const fakeJSONContent = '{invalid}';
    const fakeFile = new File([fakeJSONContent], 'test.json', {
      type: 'application/json',
    });

    const fakeFileList = {
      0: fakeFile,
      length: 1,
      item: (index: number) => (index === 0 ? fakeFile : null),
      [Symbol.iterator]: function* () {
        yield this[0];
      },
    } as FileList;

    const originalAppendChild = document.body.appendChild;
    document.body.appendChild = vi.fn(<T extends Node>(node: T) => {
      if (node instanceof HTMLInputElement && node.type === 'file') {
        Object.defineProperty(node, 'files', {
          value: fakeFileList,
          writable: true,
        });
        setTimeout(() => node.dispatchEvent(new Event('change')));
      }
      return originalAppendChild.call(document.body, node) as T;
    });

    await expect(uploadAndReadJSON()).rejects.toThrowError();
    document.body.appendChild = originalAppendChild;
  });

  it('should throw error if no file is selected', async () => {
    const fakeFileList = {
      length: 0,
      item: () => null,
      [Symbol.iterator]: function* () {
        yield this[0];
      },
    } as FileList;

    const originalAppendChild = document.body.appendChild;
    document.body.appendChild = vi.fn(<T extends Node>(node: T) => {
      if (node instanceof HTMLInputElement && node.type === 'file') {
        Object.defineProperty(node, 'files', {
          value: fakeFileList,
          writable: true,
        });
        setTimeout(() => node.dispatchEvent(new Event('change')));
      }
      return originalAppendChild.call(document.body, node) as T;
    });

    await expect(uploadAndReadJSON()).rejects.toThrowError();
    document.body.appendChild = originalAppendChild;
  });
});
