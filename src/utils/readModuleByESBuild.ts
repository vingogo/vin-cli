import fs from 'fs-extra';
import path from 'path';
import * as esbuild from 'esbuild';
import requireFromString from 'require-from-string';

// esbuild读取文件导出
const readModuleByESBuild = (fileName: string, bundle = true) => {
  if (/\.json$/.test(fileName)) {
    return {
      ['default']: require(fileName)
    };
  }
  if (!/\.([tj]s)$/.test(fileName)) {
    return {};
  }
  const { root, dir, name } = path.parse(fileName);
  const randomId = Math.floor(Math.random() * 1000000);
  const outfile = path.resolve(root, dir, `${name}.${randomId}.js`);

  esbuild.buildSync({
    entryPoints: [fileName],
    bundle,
    format: 'cjs',
    outfile,
    define: { 'process.env.NODE_ENV': `"${process.env.NODE_ENV}"` }
  });

  const code = fs.readFileSync(outfile, {
    encoding: 'utf-8'
  });

  fs.removeSync(outfile);

  return requireFromString(code, {
    appendPaths: [path.resolve(root, dir)]
  });
};

export default readModuleByESBuild;
