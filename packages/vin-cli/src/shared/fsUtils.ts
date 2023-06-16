import { extname } from 'path';
import fse from 'fs-extra';

const {
  appendFileSync,
  pathExistsSync,
  readFileSync,
} = fse

export const replaceExt = (file: string, ext: string): string => file.replace(extname(file), ext);

export function smartAppendFileSync(file: string, code: string) {
  if (pathExistsSync(file)) {
    const content = readFileSync(file, 'utf-8');

    if (!content.includes(code)) {
      appendFileSync(file, code);
    };
  };
};