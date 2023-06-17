import { createRequire } from 'module'

const require = createRequire(import.meta.url)

// allow to import from node_modules
// @import "~package-name/var.scss"
const tildeImporter = (url: string) => {
  if (url.includes('~')) {
    url = url.replace('~', '')

    if (!url.includes('.scss')) {
      url += '.scss'
    }

    url = require.resolve(url)
  }
  return { file: url }
};

export async function compileScss(filePath: string, extraOptions?: { additionalData?: string }) {
  const { renderSync } = require('sass')
  // TODO: additionalData 如果存在路径可能会路径错误
  const additionalData = extraOptions?.additionalData

  const { css } = renderSync({ data: `${additionalData}\n${filePath}`, importer: tildeImporter, outputStyle: 'compressed' })
  return css
}
