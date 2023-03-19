import { resolve } from 'path';
import type { UserConfig } from 'vite';
import { getDirname } from '../utils/fsUtils.js'

export const dirname = getDirname(import.meta.url)
export const CWD = process.cwd();
export const VIN_CONFIG_FILE = resolve(CWD, 'vin.config.mjs');
export const CLI_PACKAGE_JSON = resolve(dirname, '../../package.json')

async function getVinConfigAsync(): Promise<UserConfig> {
  try {
    return (await import(VIN_CONFIG_FILE)).default;
  } catch (err) {
    console.log('err', err)
    return {};
  }
}

export async function getVinConfig() {
  return await getVinConfigAsync();
}
