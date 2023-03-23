import config from '../../common/vinConfig.js';
import createUniappVite from './framework/uniapp.js';

const viteBuild = (options: any = {}) => {
  const { framework, noCache, port, env } = options;
  // 获取用户自定义配置
  const userViteConfig = config || {};
  switch (framework) {
    case 'uniapp':
      createUniappVite(userViteConfig, env, {
        cache: !noCache,
        port
      });
  }
};

export default viteBuild;
