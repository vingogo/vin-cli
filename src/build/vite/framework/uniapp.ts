import { mergeConfig } from 'vite';
import type { EnvType } from '../../index.d';
import type { Options } from '../../index.d';
import type { UserConfigExport } from 'vite';
import uni, { runDev, runBuild } from '@dcloudio/vite-plugin-uni';
import { CWD } from '../../../common/constant.js';

const defaultViteConfig = (
  env: EnvType,
  override: UserConfigExport
): UserConfigExport => {
  const root = CWD;

  return {
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      drop: env === 'development' ? [] : ['console', 'debugger']
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: `${root}/src`
        },
      ]
    },
    ...override
  };
};

async function createVite(
  config: UserConfigExport,
  env: EnvType,
  options: Options
) {
  const root = process.cwd();

  if (env === 'development') {
    const viteDevConfig = mergeConfig(
      defaultViteConfig(env, {
        root: root,
        mode: env,
        server: {
          port: options.port || 3001,
          hmr: {
            protocol: 'ws'
          }
        },
        plugins: [
          // @ts-ignore
          uni?.default?.(),
        ]
      }),
      config,
      false
    );

    runDev({ ...viteDevConfig })
  } else {
    const viteBuildConfig = mergeConfig(
      defaultViteConfig(env, {
        root: root,
        mode: env,
        plugins: [
          // @ts-ignore
          uni?.default?.(),
        ],
        build: {
          emptyOutDir: true,
          minify: true,
        }
      }),
      config,
      true
    );

    // @ts-ignore
    await runBuild({ ...viteBuildConfig });
  }
}

export default createVite;
