export { getVinConfig } from './constant.js';

export const EXT_REGEXP = /\.\w+$/;

export function replaceExt(path: string, ext: string) {
  return path.replace(EXT_REGEXP, ext);
}
