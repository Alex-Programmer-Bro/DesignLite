import { test } from '@playwright/test';
import { resolve } from 'path';

test('test', async ({ page }) => {
  await page.goto('http://localhost:1420/');
  await page.getByRole('button', { name: '操作' }).click();
  await page.getByText('使用模版代码内预制的模版').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('导出资源导出前端静态资源，以供部署上线').click();
  const download = await downloadPromise;
  await download.saveAs(resolve(__dirname, download.suggestedFilename()));
});
