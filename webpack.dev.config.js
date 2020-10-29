/**
 * dev
 * HMR：热模块替换 只对有改动的模块进行重新打包
 * 指是在devServer中对css html js等资源进行处理
 * 需要在js入口文件中编写
 * 对于：style-loader自己自动有HMR处理
 * 对于html: 单页面应用没有意义，多页面应用需要时则配置entry为数组即可 entry: ['./src/index.js','./src/index.html','./src/index2.html']
 * import from('./xxx')
 * if (module.hot) {
 *    module.hot.accept('./xxx', () => {
 *      ....一旦只有’./xxx‘模块变化，然后执行回调函数，不再构建其他模块
 *    })
 * }
 */

module.exports = {
  module: {
  },
  // devServer 自动化编译，自动运行（打开浏览器，更新浏览器）
  devServer: { 
    contentBase: path.resolve(__dirname,"dist"), // 要运行的目录
    compress: true, // 启用gzip压缩运行代码
    // watchContentBase: true, //剪视所有文件的变化，一旦变化则重新加载
    watchOptions: {
      ignored: /node_modules/
    },
    overlay: false, //一旦出错不要进行全屏提示
    clientLogLevel: 'none', // 不显示服务器启动日志
    quiet: true, //除了基本启动信息之外其他的都不打印 
    host: 'http://localhost',
    port:3000,
    open: true, // 默认浏览器 
    // proxy: { // 开发环境跨域问题
    //   "/api": {
    //     target: 'http://localhost:3000', // 浏览器之间存在跨域问题，服务器之间不存在跨域问题
    //     pathRewrite:{'/api':''} // /api/xxx 去掉/api路径  
    //   }
    // }, //服务器5000接收到/api/xxx的请求，会转发到另一个服务器
    hot: true // 开启hmr热更新模式
  },
}