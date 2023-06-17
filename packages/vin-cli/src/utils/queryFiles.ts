import fs from 'fs-extra';
import path from 'path';

// 通过后缀筛选查询文件
export const queryFiles = (
  dir: string,
  exts: string[] = [],
  list: string[] = []
): string[] => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.resolve(dir, file);

    const stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      list.concat(queryFiles(filePath, exts, list));
    } else if (exts.includes(path.extname(file))) {
      list.push(filePath);
    }
  });
  return list;
};
