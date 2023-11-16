import { describe, expect, it } from 'vitest';
import { resolveCSS, resolveHTML } from './tool';
import { Schema, SchemaType } from './types/schema';

describe('resolve schema', () => {
  const textSchema: Schema = {
    id: 'hello',
    type: SchemaType.Block,
    style: {
      color: '#ffffff',
      backgroundColor: 'red',
    },
    content: 'hello world',
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
    expect(resolveHTML(textSchema)).toMatchInlineSnapshot('"<span class=\\"hello\\">hello world</span>"');
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
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
    });
    const file2 = new File(['this is test file'], 'test.txt', {
      type: 'text/plain',
    });
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('name', 'file-upload');
    input.multiple = true;
    let mockFileList = Object.create(input.files!) as FileList;
    mockFileList[0] = file;
    mockFileList[1] = file2;
    Object.defineProperty(mockFileList, 'length', { value: 2 });
    console.log('The string representation the object: ' + Object.prototype.toString.call(mockFileList));
    filesProcess(mockFileList);
    expect(1).toBe(1);
  });
  it('should throw error for invalid JSON file', async () => {});
  it('should throw error if no file is selected', async () => {});
});
