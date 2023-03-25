import viteBuild from './vite/index.js';
import inquirer from 'inquirer';
import { platformConfig } from '../common/config.js';

import type { EnvType } from './index.d';

let env: EnvType = 'production';

export const build = (options: any = {}) => {
  const { development, framework = 'uniapp' } = options;
  if (
    development ||
    process.env.BUILD_ENV === 'local' ||
    process.env.NODE_ENV === 'development'
  ) {
    env = 'development';
  }
  process.env.NODE_ENV = env;
  process.env.NODE_OPTIONS = process.env.NODE_OPTIONS || '--max-old-space-size=4096';

  inquirer
    .prompt([
      {
        type: 'list',
        message: '请选择平台: ',
        name: 'platform',
        choices: platformConfig.map(({ value, name }) => {
          return {
            key: value,
            name,
            value
          };
        })
      },
    ])
    .then(({ platform }) => {
      viteBuild({ ...options, framework, env, platform });
    });
};
