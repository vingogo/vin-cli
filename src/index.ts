#!/usr/bin/env node

import commander from 'commander';
import template from './template';
import packageJson from '../package.json';

const program = new commander.Command();

// 生成项目文档
program
  .command('template')
  .description('自动生成模版')
  .action(() => {
    template();
  });

// 当前包版本
program.action(() => {
  const options = program.opts();
  if (options.version) {
    console.log(packageJson.version);
  }
});
program.option('-v, --version', '当前包版本');

program.parse();
