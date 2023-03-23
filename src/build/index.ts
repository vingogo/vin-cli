import vinConfig from '../common/vinConfig.js';
import viteBuild from './vite/index.js';

import type { EnvType } from './index.d';

let env: EnvType = 'production';

export const build = (options: any = {}) => {
  const { development, framework = vinConfig.framework } = options;
  if (
    development ||
    process.env.BUILD_ENV === 'local' ||
    process.env.NODE_ENV === 'development'
  ) {
    env = 'development';
  }
  process.env.NODE_ENV = env;
  process.env.NODE_OPTIONS = process.env.NODE_OPTIONS || '--max-old-space-size=4096';

  viteBuild({ ...options, framework, env });
};
