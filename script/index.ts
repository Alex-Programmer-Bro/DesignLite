import { JSDOM } from 'jsdom';
import { exec } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'path';
import showdown from 'showdown';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execCommadn = promisify(exec);

const logFile = path.resolve(__dirname, '../changelog.md');
const pkgFile = path.resolve(__dirname, '../package.json');

const getLog = async () => {
  function cleanString(version: string) {
    let result = version.replace(/[^0-9.]/g, '');
    const firstDotIndex = result.indexOf('.');
    if (firstDotIndex !== -1) {
      result = result.substring(0, firstDotIndex + 1) + result.substring(firstDotIndex + 1).replace(/\./g, '');
    }
    return Number(result);
  }

  const content = await readFile(logFile, 'utf-8');
  const pkg = JSON.parse(await readFile(pkgFile, 'utf-8')) as unknown as { version: string };
  const converter = new showdown.Converter();
  const html = converter.makeHtml(content);
  const { window } = new JSDOM(html);

  const versions = [...window.document.querySelectorAll('h2')]
    .sort((a, b) => cleanString(b.textContent!) - cleanString(a.textContent!))
    .map((item) => item);
  const bestVersion = versions[0];

  if (cleanString(bestVersion.textContent!) <= cleanString(pkg.version)) return;
  const ul = bestVersion.nextElementSibling as HTMLUListElement;
  return {
    version: bestVersion.textContent!,
    log: ul.innerHTML,
  };
};

export const release = async () => {
  const log = await getLog();
  if (!log) return;
  await execCommadn(`echo "next_version=${log.version}" >> $GITHUB_ENV`);
};
