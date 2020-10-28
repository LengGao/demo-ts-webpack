/**
 * pro
 */
var path = require('path')


module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name]'
  },

  /** source-m   p：提供源代码到构建后代码映射技术。如果构建后代码出错了，通过映射可以追踪源代码错误
   * [inline-|hidden-|eval-][nosources-][cheap-[module]]source-map
   * 内部和外部区别：1，外部生成了文件,内联增大体积，2，内联构建速度快
   * source-map：外部 
   *    错误代码准确信息和源代码错误位置
   * inline-source-map：内联 
   *    只生成一个内联source-map 错误代码准确信息和源代码错误位置
   * hidden-source-map：外部 
   *    错误原因，不能追踪源代码错误，只提示构建后代码错误位置
   * eval-source-map：内联 
   *    每一个文件都生成对应的source-map，都在eavl 
   *    错误代码准确信息和源代码错误位置
   * mosources-source-map：外部 
   *    错误代码准确信息 和 但是没有任何源代码信息
   * cheap-source-map：外部
   *    错误代码准确信息 和 源代码的错误位置 只精确到行
   * cheap-module-source-map：外部
   *    错误代码信息 和 源代码的错误位置
   *    module会将loader的source map加入
   * 
   * 开发环境：速度快，调试更友好
   * 速度快：eval-cheap-module-source-map 
   * 调试友好 eval-source-map 
   * 生产环境：代码体积，调试更友好
   * 体积小：cheap-module-source-map
   * 调试：source-mapp
   * --> 开发: eval-source-map 生产：source-map
   */
  devtool: 'eval-source-map'
  
}