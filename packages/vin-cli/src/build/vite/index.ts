import createUniappVite from './framework/uniapp.js';

const viteBuild = (options: any = {}) => {
  const { framework, noCache, port, env, platform } = options;
  switch (framework) {
    case 'uniapp':
      createUniappVite(env, {
        cache: !noCache,
        port,
        platform
      });
  }
};

export default viteBuild;
