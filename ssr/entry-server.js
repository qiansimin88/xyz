import createApp from './app';

export default context =>

// 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
// 以便服务器能够等待所有的内容在渲染前，
// 就已经准备就绪。
  new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    router.push(context.url);

    router.onReady((_) => {
      // 匹配到的当前的异步组件
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({
          code: 404,
        });
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map((Component) => {
        if (Component.asyncData) {
          // 执行每个asyncData函数 并且带入  store和当前路由两个参数
          return Component.asyncData({
            store, route: router.currentRoute,
          });
        }
      })).then((_) => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state;
        resolve(app);
      });
    }, reject);
  })
// const { app } = createApp();
// return app;
;
