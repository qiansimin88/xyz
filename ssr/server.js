/* eslint-disable global-require */
// node
const express = require('express');
const chalk = require('chalk');

const app = express();
const { createBundleRenderer } = require('vue-server-renderer');
const path = require('path');
const fs = require('fs');

const resolve = file => path.resolve(__dirname, file);

// 服务端渲染函数
const renderer = createBundleRenderer(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'), {
  runInNewContext: false, // 推荐
  // html 模板
  template: fs.readFileSync(resolve('../index.html'), 'utf-8'),
  clientManifest: require('../dist/vue-ssr-client-manifest.json'), // 客户端打包文件
});

const renderToString = context => new Promise((resolve, reject) => {
  renderer.renderToString(context, (err, htmlString) => {
    err ? reject(err) : resolve(htmlString);
  });
});

// 引入静态资源目录
app.use(express.static(resolve('../dist')));

app.get('*', (req, res, next) => {
  const context = { url: req.url, title: '服务端测试渲染' };
  res.set('Content-Type', 'text/html');
  renderToString().then((html) => {
    res.end(html);
  }).catch((err) => {
    console.log(`错误:${err}`);
    next(err);
  });
});

app.listen(3000, () => {
  console.log(chalk.green('vue ssr started at localhost: 3000'));
});
