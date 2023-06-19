# ESLint 规范

前端 Vue 项目 eslint 规范

## 使用

### 安装

Install:

```bash
pnpm add @vingogo/eslint-config-vue eslint --dev
```

### 配置

根目录下创建`.eslintrc.json`，配置：

```json
{
  "extends": "@vingogo/eslint-config-vue"
}
```

## 添加 script

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## 配置 VS Code 自动修复

在根目录创建 `.vscode/settings.json`

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  }
}
```
