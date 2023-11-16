import { Schema, SchemaType } from './types/schema';

export const resolveHTML = (schema: Schema) => {
  switch (schema.type) {
    case SchemaType.Image:
      return `<img class="${schema.id}" src=${schema.content} alt="" />`;
    case SchemaType.Block:
      return `<span class="${schema.id}">${schema.content}</span>`;
  }
};

const transferCSS = (style: React.CSSProperties) => {
  return Object.entries(style)
    .map(([key, value]) => {
      return `${key.replace(/([A-Z]+)/, '-$1').toLowerCase()}:${value};`;
    })
    .join('');
};
export const resolveCSS = (schema: Schema) => {
  return `.${schema.id} {
    ${transferCSS(schema.style as React.CSSProperties)}
  }`;
};

export const uploadAndReadJSON = (): Promise<Schema[]> => {
  return new Promise((resolve, reject) => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.json';
    inputElement.style.display = 'none';

    inputElement.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const reader = new FileReader();

        reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
          const result = loadEvent.target?.result;
          if (typeof result === 'string') {
            try {
              const json = JSON.parse(result);
              resolve(json);
            } catch (error) {
              reject(error);
            }
          }

          inputElement.remove();
        };

        reader.readAsText(file);
      } else {
        reject(new Error('No file selected!'));
        inputElement.remove();
      }
    };

    document.body.appendChild(inputElement);
    inputElement.click();
  });
};
