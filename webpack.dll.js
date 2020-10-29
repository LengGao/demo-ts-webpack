/** dll 动态打包库解决重复打包问题
 * 适用于：只需要打包一次的库
 * production模式下会启用这里的配置
 * 需要在webpack.config.js中配合AddAssetHtmlWebpackPlugin，Webpack.DllReferencePlugin一起使用
 * node_module全部打包成一个chunk体积过大需要拆分
 * 并且配置打包过的库不再打包
 * 使用时需要船舰webpack.dll.js配置文件
 * 注意：不要和externals
 */
var path = require('path')
var Webpack = require('webpack') // 在输出目录下建立manifest.json映射文件

module.exports = {
  entry: {
    // 最终打包生成的[name] ==> jquery ['jquery']为要打包的库
    jquery: ['jquery'] 
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'dll'),
    library: '[name]_[hash]' // 库向外面暴露内容的出去的名字 如：jqueryhash，然后在插件里配置引入库名时候的映射，因为这里名称已经改成动态的了，而带么中只会写 require(’jquery‘)
  },
  plugins: [
    new Webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库暴露内容的名称
      path: path.resolve(__dirname,'dll/manifest.json') // 映射文件路径
    }),
  ]

}