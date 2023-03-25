import type { EnvType } from '../../index.d';
import type { Options } from '../../index.d';
import { runDev, runBuild } from '@dcloudio/vite-plugin-uni';

async function createVite(
  env: EnvType,
  options: Options
) {
  // uniapp 中文日志并不完整，考虑小程序开发主要国内用户，此处默认显示中文
  process.env.UNI_HBUILDERX_LANGID = 'zh_CN';

  if (env === 'development') {
    runDev({ ...options });
  } else {
    runBuild({ ...options });
  }
}

export default createVite;
