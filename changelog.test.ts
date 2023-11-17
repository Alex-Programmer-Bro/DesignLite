import { exec } from 'node:child_process';
import { resolve } from 'path';
import { expect, test } from 'vitest';

test('resolve change log', async () => {
  const shellPath = resolve(__dirname, './resolveLog.sh');

  const msg = await new Promise((resolve) => {
    exec(`bash ${shellPath}`, (_, message) => {
      resolve(message);
    });
  });

  expect(msg).toMatchInlineSnapshot(`
    "Extracted Release Body:
    Release 0.0.2-alpla:
    - 图文编辑强化
    - 提高功能流程稳定性

    Release 0.0.1-alpla:
    - 图文编辑
    - 生成前端静态资源
    "
  `);
});
