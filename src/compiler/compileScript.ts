import type { Format } from 'esbuild';
import { transform } from 'esbuild';

export function getScriptExtname() {
  return '.mjs'
}

export async function compileScript(
  sourcecode: string,
  format: Format = 'esm'
): Promise<string> {
  const esbuildResult = await transform(sourcecode, {
    loader: 'ts',
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    format,
    minify: true
  });

  const { code } = esbuildResult;

  return code;
}
