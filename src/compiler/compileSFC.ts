import fse from 'fs-extra'
import { resolve } from 'path'
import { parse as parseSFC } from '@vue/compiler-sfc'
import { replaceExt } from '../shared/fsUtils.js'
import { compileScript } from './compileScript.js'
import type { Format } from 'esbuild';

const { readFile, outputFileSync } = fse;

export async function compileSFC(sfc: string, { format = 'esm', dist = 'dist' }: { format: Format; dist: string }) {
  const sources: string = await readFile(sfc, 'utf-8')
  const { descriptor } = parseSFC(sources, { sourceMap: false })
  const { script, scriptSetup } = descriptor

  let scriptContent

  // TODO: uniapp 特殊性，暂时不做过多处理，后续使用 vite 替换
  if (script || scriptSetup) {
    if (script?.content) {
      scriptContent = await compileScript(script.content, format)
      const jsFilePath = replaceExt(sfc, '.js');

      outputFileSync(resolve(dist, jsFilePath), scriptContent);
    }
  }
}
