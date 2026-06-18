# 彭方的个人电子名片

基于 React、TypeScript 与 Vite 构建的响应式个人网站。根目录 `index.html` 已额外做成普通静态页面，可以直接用浏览器打开。

## 直接打开

双击根目录的 `index.html`，或在浏览器打开：

```text
file:///C:/Users/22108/Documents/namecard/index.html
```

这个入口不需要启动本地服务。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

推送到 `main` 或 `master` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。首次发布前，请在仓库的 **Settings -> Pages -> Build and deployment** 中将来源设置为 **GitHub Actions**。
