import fs from 'fs-extra';
import path from 'path';
import readModuleByESBuild from '../utils/readModuleByESBuild.js'
import { dirname } from '../common/constant.js';
import type { IConfig } from '../../types'

let file = path.resolve(process.cwd(), './vite.config.ts');
if (!fs.existsSync(file)) {
  file = path.resolve(process.cwd(), './vite.config.js');
}

export const configPath = file;

const defaultConfig = readModuleByESBuild(
  path.resolve(dirname, '../../templates/defaultConfig.js')
).default;

const workspaceConfig =
  (fs.existsSync(configPath) &&
    readModuleByESBuild(configPath, false)?.default) ||
  {};

const config: IConfig = {
  ...defaultConfig,
  ...workspaceConfig
};

export default config;
