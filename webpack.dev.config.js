/**
 * dev
 */
module.exports = {
  // devServer 自动化编译，自动运行（打开浏览器，更新浏览器）
  devServer: { 
    contentBase: path.resolve(__dirname,"dist"), // 要运行的目录
    compress: true, // 启用gzip压缩运行代码
    port:3000,
    open: true, // 默认浏览器
    // proxy: {
    //   "/api": {
    //     target: 'http://localhost:3000', // 浏览器之间存在跨域问题，服务器之间不存在跨域问题
    //     pathRewrite:{'/api':''} // /api/xxx 去掉/api路径  
    //   }
    // }, //服务器5000接收到/api/xxx的请求，会转发到另一个服务器
    hot: true // 开启hmr热更新模式
  }
}