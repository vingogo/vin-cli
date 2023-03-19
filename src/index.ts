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

// 当前包版本
program.action(async () => {
  const options = program.opts();
  if (options.version) {
    console.log(getCliVersion());
  }
});
program.option('-v, --version', '当前包版本');

program.parse();
