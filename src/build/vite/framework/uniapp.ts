import type { EnvType } from '../../index.d';
import type { Options } from '../../index.d';
import { runDev, runBuild } from '@dcloudio/vite-plugin-uni';

async function createVite(
  env: EnvType,
  options: Options
) {
  if (env === 'development') {
    runDev({ ...options, logLevel: 'error' });
  } else {
    runBuild({ ...options });
  }
}

export default createVite;
