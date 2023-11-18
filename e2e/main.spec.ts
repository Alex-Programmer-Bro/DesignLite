import { mkdir, readFile, writeFile } from 'fs/promises';
import JSZip from 'jszip';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { test } from './helper';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('successfully export and import assets', async ({ page }, testInfo) => {
  await page.goto('http://localhost:1420/');
  await page.click('#dl-toolbar-action-btn');
  await page.getByText('使用模版').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('导出资源').click();
  const download = await downloadPromise;
  const downloadPath = resolve(__dirname, download.suggestedFilename());
  await download.saveAs(downloadPath);
  await page.waitForLoadState();

  await testInfo.attach('导出资源后', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  await page.getByText('重置').click();
  await page.waitForLoadState();

  await testInfo.attach('导入配置之前', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  const zipFileContent = await readFile(downloadPath);
  const zip = new JSZip();
  await zip.loadAsync(zipFileContent);

  try {
    await mkdir(resolve(dirname(downloadPath), 'website'));
  } catch (error) {}

  for (const filename of Object.keys(zip.files)) {
    const content = await zip.files[filename].async('nodebuffer');
    const filePath = resolve(dirname(downloadPath), 'website', filename);
    await writeFile(filePath, content);
  }

  await page.click('#dl-toolbar-action-btn');
  await page.getByLabel('导入配置').click();
  await page.getByLabel('import-assets').setInputFiles(resolve(dirname(downloadPath), 'website', 'desingeLite.json'));

  await testInfo.attach('导入配置之后', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});
