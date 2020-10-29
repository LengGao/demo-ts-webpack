/**
 * pro
 */
var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css成单独未见减少js文件体积
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 将js，css 编译进html
var Webpack = require('webpack') // 在输出目录下建立manifest.json映射文件
var AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin') // 将某个文件打包输出出去，并自动在html文件中引入

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'js/bundle.[contenthash].js'
  },
  module: {
    rule: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname,"node_modules"),
        loader: 'babel-loader',
        /** 改loader为 use: [{loader,options},{loader,options}] 
         * { 
         * 如果构建时间长才开启多进程打包，进程启动需要600ms
         * 启动进程数=CPU核数-1,
         * loader: 'thread-loader',
         * options: { workers: 2 // 启动2个进程 }
         * }
         */
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: 'usage', // 开启按需加载
                corejs: {
                  version: 3 // 指定 corejs的版本
                },
                targets: {
                  chrome: '60', // 指定做到多少版本的浏览器为止
                  firefox: '50',
                  safari: '10',
                  ie: '9',
                  edge: '17'
                }
              }
            ]
          ],
          // 开启babel缓存  第二次构建时，会读取之前的缓存 这是对js的村里但是 我们还需要考虑跟更多，文件资源缓存则需要修改文件名 hash每次构建的时候会生成hash  chunkhash 入口hash  contenthash文件内容hash
          cacheDirectory: true
        }

      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // filename: 'index[contenthash].html', // 单页面应用没必要,
      template: './src/index.html', // 要编译进的html文件的路径
      minify: {
        collapseBooleanAttributes: true, //去空格
        removeComments: true // 去注释
      }
    }),
    new MiniCssExtractPlugin({
      /**css内容提取成单独文件 
       * css提取成单独文件，这里不配置，而是再实例化插件时配置
      */
      filename: 'css/bundle[contenthash].css' // 重命名s输出css文件
    }),
    new Webpack.DllReferencePlugin({
       // 配合webpack.dll.js
      manifest: path.resolve(__dirname,'dll/manifest.json') // 告诉webpack哪些库不参与打包，同时引入时的名称也要改
    }),
    new AddAssetHtmlWebpackPlugin({
       // 配合webpack.dll.js Webpack.DllReferencePlugin
      filepath: path.resolve(__dirname,'dll/jquery.js')
    })
  ],
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
  devtool: 'source-map',
  /** 代码分割实现并行加载，可以将node_modules中的代码单独打包成一个chunk最终输出
   * 单页面应用可以将node_module单独打包成一个chunk
   * 多入口还会自动分析chunk中有没有公共的文件，如果有则只打包成一个单独的chunk而不会重复打包
   * 默认配置：1，打包为文件大小下限30k。2，对于异步模块：抽离公共文件数不超过5。3，对于入口模块：抽离公共文件数不超过3（一个入口文件的最大并行请求默认不得超过3个）
   * 原因参考：https://www.cnblogs.com/dashnowords/p/9545482.html
   */
  optimization: {
    // 除了配置以外 ES10 import('./path...') 就可以将引入的文件单独打包成一个chunk
    splitChunks: {
      chunks: 'all',
      minSize: 30*1024, // 分割chunk的下限
      maxSize: 0, // 分割chunk的上限
      minChunks: 1, // 最少被引用一次的模块才被提取
      maxAsyncRequests: 5, // 按需加载时并行的文件加载数量
      maxInitialRequests: 3, // 入口文件最大并行数量
      name: true, // 可以使用命名规则
      automaticNameDelimiter: '-', // 名称连接符
      cacheGroups: {
        verdors: {
          test:''
        }
      }
    }
  },
  /** 配置不参与打包的模块 适用于：彻底不需要打包的资源
   * 例如：import $ from('jquery')
   * 手动在html页面手动CDN引入
   */
  externals: {
    jquery: 'jQuery'
  },


  /** tree skaking 去除无用代码，也就是没有引用的代码将不参与打包，进行打包时0webpack默认会执行
   * 1，必须使用ES6。2，必须使用production环境
   * 在package.json中进行配置
   * sideEffects: false  所有文件都可以进行tree shaking所以css文件就有文献
   * sideEffects: ['*.css']
   */
  mode: 'production'
}