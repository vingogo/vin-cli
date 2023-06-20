# Prettier 规范

## 使用

### 安装

Install:

```bash
pnpm add @vingogo/prettier-config prettier -D
```

### 配置

根目录下创建 `.prettierrc.js`

```js
module.exports = {
  ...require('@vingogo/prettier-config'),
  // 你可以编写额外的 Prettier 配置来覆盖原有的
  semi: false
};
```

### 添加 script

```json
{
  "scripts": {
    "format": "prettier --write --cache --parser typescript \"**/*.[tj]s?(x)\""
  }
}
```
