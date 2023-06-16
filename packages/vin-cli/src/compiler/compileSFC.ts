import fse from 'fs-extra'
import { resolve } from 'path'
import { parse as parseSFC } from '@vue/compiler-sfc'
import { replaceExt } from '../shared/fsUtils.js'
import { compileScript } from './compileScript.js'
import { compileScss } from './compileStyle.js'
import type { SFCStyleBlock } from '@vue/compiler-sfc'
import { getVinConfig } from '../common/index.js'
import type { Format } from 'esbuild'

const { readFile, outputFileSync } = fse;

export async function compileSFC(sfc: string, { format = 'esm', dist = 'dist' }: { format: Format; dist: string }) {
  const sources: string = await readFile(sfc, 'utf-8')
  const { descriptor } = parseSFC(sources, { sourceMap: false })
  const { script, scriptSetup, styles, template } = descriptor

  let scriptContent

  // TODO: uniapp 特殊性，暂时不做过多处理，后续使用 vite 替换
  if (script || scriptSetup) {
    if (script?.content) {
      scriptContent = await compileScript(script.content, format)
      // const jsFilePath = replaceExt(sfc, '.js');

      // outputFileSync(resolve(dist, jsFilePath), scriptContent);
      outputFileSync(resolve(dist, replaceExt(sfc, '.vue')), `
        <template>${template?.content}</template>\n<script>${scriptContent}</script>
      `.trim())
    }
  }

  // style
  const cssPreprocessorOptions = (await getVinConfig()).css?.preprocessorOptions;
  for (let index = 0; index < styles.length; index++) {
    const style: SFCStyleBlock = styles[index]

    if (style.lang === 'scss') {
      const cssFilePath = replaceExt(sfc, '.css');

      const code = await compileScss(style.content, cssPreprocessorOptions?.['scss'])
      outputFileSync(resolve(dist, cssFilePath), code);
    }
  }
}
