#!/usr/bin/env node

import commander from 'commander';
import { getCliVersion } from './utils/fsUtils.js'

const program = new commander.Command();

// 生成项目文档
program
  .command('template')
  .description('自动生成模版')
  .action(async () => {
    const { template } = await import('./template/index.js');
    template();
  });

// compiler
program.option('-p, --path <entry>', '<compiler -p>: 需要编译的文件路径')
program.option('-d, --dist <out>', '<compiler -d>: 生成的文件路径')
program.option('-f, --format <type>', '<compiler -f>: 输出的文件格式')
program
  .command('compiler')
  .description('编译 SFC 组件')
  .action(async () => {
    const { path, dist, format } = program.opts();
    const { compileSFC } = await import('./compiler/index.js');
    compileSFC(path, { dist, format });
  });

// 当前包版本
program.action(async () => {
  const options = program.opts();
  if (options.version) {
    console.log(getCliVersion());
  }
});
program.option('-v, --version', '当前包版本');

program.parse();
