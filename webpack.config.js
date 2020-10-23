const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css成单独未见减少js文件体积
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理dist目录
const WebpackManifestPlugin = require('webpack-manifest-plugin'); // 显示打包了哪些资源
const WorkboxWebpackPlugin = require('workbox-webpack-plugin'); // 渐进式离线应用


/**
 * tree shaking
 * 去除无用js css代码
 * 前提： 使用production 使用ES6Module
 */

// console.log("__dirname",path.resolve(__dirname,'dist/imgs'));
// process.env.NODE_ENV = 'production'
process.env.NODE_ENV = 'development' // postcsss使用时还需配置nodejs的环境变量，因为postcss时基于node运行，默认使用production环境
module.exports = {
  entry:  './src/index.js', // html hmr热更新 但是一般不用左，一般只有一个html 但是服务端渲染  多html文件 旧恶可以左了 entry: ['./src/index.js','./src/index.html']
  // entry: {
  //   main: "./src/index.js",
  //   test: "./src/main.js"
  // }, // 代码分割实现按需加载 多入口拆分，单入口采用分割技术
  output: {
    filename: 'bundle.js', // js/budil.js 这样旧指定了输出目录
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },
  module: {
    /**
     * 整个loader配置会按照从右至左。从下至上的顺序加载，use:[x]内容也是
     */
    rules: [
      {
       test: /\.css$/,
       exclude: path.resolve(__dirname, 'node_modules'),
       use: [
        //  'style-loader',// 创建styLe标签 
        MiniCssExtractPlugin.loader, // 当使用css提取插件时插件时不可以同时存在
         'css-loader',// 将css整合到js文件中 
        //  { 
        //    // 修改配置时则写成对象
        //   loader: 'postcss-loader', // 通过配置时postcss加载package.json中的browseList配置兼容指定浏览器, css 兼容
        //   options: {
        //     indent: 'postcss',
        //     plugins: () => [
        //       require('autoprefixer'),
        //       require('postcss-preset-env')(),
        //     ]
        //   }
        //  }
        ] 
      },
      {
        exclude: /\.(js|css|html|json)$/,
        loader: 'file-loader',  
        options: {
          name: "[hash:10].[ext]", // [hash:10] 哈希值面呈的前10位，[ext] 后缀名
          encoding: 'utf8',
          outputPath: './static/imgs'
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        // exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'url-loader',
          options: {
            limit: 8*1024, // 8~12KB及以下的图片建议base64处理，虽然会增大体积，但它可以减少http请求，当超过指定大小后由file-loader来处理
            name: "[hash:10].[ext]",
            encoding: 'utf8',
            esModule: false, //由于html采用commonjs处理而url-loader有时采用ES6module处理并且是base64处理,为了保持处理方式一致。故而关闭ES6Module采用commonjs
            outputPath: './static/imgs' // 由于版本问题要使用outputPath的话需要使用use: {}
          }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader', // 处理html中的img标签
      },
      // {
      //   test: /\.js$/,
      //   exclude: path.resolve(__dirname, 'node_modules'),
      //   enforce: "pre", // 优先执行，因为eslint先检查语法后再做js语法兼容
      //   loader: "eslint-loader", // package.json中配置eslintConfig "eslintConfig": { "extends": "airbnb" } 
      //   options: {
      //     fix: false
      //   }
      // },
      {
        /** @babel/preset-env js基本语法
         *  @babel/polyfill 全部语法处理，需要再入口js文件import '@babel/polyfill'，问题时导致js文件过大
         *  core-js 按需加载
         * 
         */
        test: /\.js$/,
        loader: 'babel-loader', // js兼容性处理 
        exclude: path.resolve(__dirname,"node_modules"),
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
          ]
        }
      }
    ]
  },
  plugins: [
    new WebpackManifestPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // alwaysWriteToDisk: true,
      template: './src/index.html',
      minify: {
        collapseBooleanAttributes: true, //去空格
        removeComments: true // 去注释
      }
    }),
    new MiniCssExtractPlugin({
      /**css内容提取成单独文件 
       * css提取成单独文件，这里不配置，而是再实例化插件时配置
      */
      filename: 'css/bundle.css' // 重命名s输出css文件
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      /**帮助service worker 快速启动
       * 删除酒店的serviceworker 
       * 生成serviceworker 配置文件
       */
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  // devServer 自动化编译，打开浏览器，更新浏览器
  devServer: { 
    contentBase: path.resolve(__dirname,"dist"), // 要运行的目录
    compress: true, // 启用gzip压缩运行代码
    port:3000,
    open: true, // 默认浏览器
    hot: true // 开启hmr热更新模式
  },
  /** 
   * 将某个node_module中的代码单独打包成一个chunk最终输出 主要时将第三方拿出来，自己的代码放一起
   * 如果有超过几十kb公共代码/模块 它会只打包成一个 （多页面应用）
   */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }, // 单页面应用代码分割
  mode: 'development', //如果改成Production 模式 那么则必须加publicPath 不否图片泽园访问不到
  // mode: 'production'
};