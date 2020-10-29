/**
 * beta
 * PWA：渐进式网络应用程序，即离线可访问web，目前兼容性欠佳，通过ServiceWorker
 * 如果要在node环境中使用浏览器对象需要package.json中配置，例如eslint就不识别所以要配置
 * eslintConfig: { "env": { browser: true } }
 */
// 懒加载和预加载是通过在入口js中使用ES10语法import()实现
// 懒加载: import('./xxx').then().catch()
// 懒加载修改构建后的名称: import(/* webpackChunkName: 'test' */'./xxx'); // 通常为时间触发后再加载 文件需要用时才加载
// 预加载：import(/* webpackChunkName: 'test', webpackPrefetch */'./xxx'); // 通常为浏览器空闲时加载
/**
 * 渐进式离线应用插件，它会项目根目录生成serviceWorker配置文件 './service-worker.js'
 * 注意： sw代码必须运行在服务器上
 * --> nodejs
 * --> npm i serve -g  快速创建服务器
 * --> serve -s build  将build目录下的所有资源暴露出去，端口号默认为5000
 */
var WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      /** 需要在入口中做兼容性处理
       *  if(’serviceWorker‘ in navigator) {
       *    // 待页面全局加载好了判断是否注册
       *    window.addEventListener('load', () => {
       *      navigator.serviceWorker.register('./service-worker.js')
       *      .then( ()=> {
       *        console.log('sw ok')
       *      })
       *      .catch( () => {
       *        console.log('sw bad')
       *      });
       *    }) 
       * }
       */
      clientsClain: true,
      skipWating: true,
      // 以上配置主要帮助客户端 serviceWorkerk快速启动 和 删除旧的serviceWorker
    })
  ]
}