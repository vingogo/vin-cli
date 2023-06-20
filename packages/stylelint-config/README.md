# StyleLint 规范

## 使用

### 安装

Install:

```bash
pnpm add @vingogo/stylelint-config stylelint -D
```

### 配置

根目录下创建 `.stylelintrc.json`

```json
{
  "extends": "@vingogo/stylelint-config"
}
```

### 添加 script

```json
{
  "scripts": {
    "stylelint": "stylelint --fix \"src/**/*.scss\""
  }
}
```
