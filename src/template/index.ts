import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import { templateConfig } from '../common/config.js';
import { replaceFileContext } from '../utils/replaceFileContext.js';
import { queryFiles } from '../utils/queryFiles.js';
import { dirname, CWD } from '../common/constant.js';

const { resolve } = path;

// 初始化模版
export const template = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: '请选择模版: ',
        name: 'template',
        choices: templateConfig.map(({ value, name }) => {
          return {
            key: value,
            name,
            value
          };
        })
      },
      {
        type: 'input',
        message: '项目名（package.json name）: ',
        name: 'project',
        validate: (val) => {
          if (val.match(/^[a-z][a-z0-9_-]+$/)) {
            return true;
          }
          return '请输入[a-z]开头[a-z0-9_-]字符串';
        }
      }
    ])
    .then(({ template, ...params }) => {
      const tempPath = resolve(dirname, `./../../templates/${template}`);
      const midPath = resolve(dirname, `./${template}`);
      const dist = resolve(CWD, `./`);
      fs.copySync(tempPath, midPath, { overwrite: true });

      // 根据输入的
      queryFiles(midPath, ['.json', '.html', '.js', '.ts', '.tsx', '.md']).forEach(
        (filePath) => {
          replaceFileContext(filePath, (text) => {
            return text.replace(
              /\{\{\{\s*(.*?)\s*\}\}\}/g,
              (o, a) => params[a] || o
            );
          });
        }
      );
      fs.copySync(midPath, dist, { overwrite: true });
      setTimeout(() => {
        fs.removeSync(midPath);
      });
    });
};
