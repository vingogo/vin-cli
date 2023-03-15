import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import templateConfig from '../config/template';
import replaceFileContext from '../utils/replaceFileContext';
import queryFiles from '../utils/queryFiles';

// 初始化模版
const template = () => {
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
      const tempPath = path.resolve(__dirname, `./../../templates/${template}`);
      const midPath = path.resolve(__dirname, `./${template}`);
      const dist = path.resolve(process.cwd(), `./`);
      fs.copySync(tempPath, midPath, {
        overwrite: true
      });

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
      fs.copySync(midPath, dist, {
        overwrite: true
      });
      setTimeout(() => {
        fs.removeSync(midPath);
      });
    });
};

export default template;
