import type { UserConfigExport } from 'vite';
import type { VitePluginUniResolvedOptions } from '@dcloudio/vite-plugin-uni';

export interface IConfig {
  root: string;
  /**
   * 框架
   * @default 'base'
   */
  framework?: 'uniapp';
  /**
   * 编译平台
   * @default 'h5'
   */
  platform?: VitePluginUniResolvedOptions['platform'];
}
