import fs from 'fs-extra';

// 替换文件内容
const replaceFileContext = (filePath: string, cb: (text: string) => string) => {
  const text = fs.readFileSync(filePath, {
    encoding: 'utf-8'
  });

  fs.outputFileSync(filePath, cb(text) || text, 'utf-8');
};
export default replaceFileContext;
