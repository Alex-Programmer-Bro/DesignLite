import { test } from '@playwright/test';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('test', async ({ page }) => {
  await page.goto('http://localhost:1420/');
  await page.getByRole('button', { name: '操作' }).click();
  await page.getByText('使用模版').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('导出资源').click();
  const download = await downloadPromise;
  const downloadPath = resolve(__dirname, download.suggestedFilename());
  await download.saveAs(downloadPath);
});
