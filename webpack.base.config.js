/**
 * base config
 */
var path = require('path')

module.exports = {
  entry: {
    main: './src/index.js'
  },  // 写成对象的话方便用webpack-merge
  output: {
    filename: 'bundle.js', // js/budil.js 这样旧指定了输出目录
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rule: [
      {
        // test: /\.js$/,
        // exclude: path.resolve(__dirname, 'node_modules'),
        // enforce: "pre", // 优先执行，因为eslint先检查语法后再做js语法兼容
        // loader: "eslint-loader", // package.json中配置eslintConfig "eslintConfig": { "extends": "airbnb-base" } 
        // options: {
        //   fix: true
        // }
      },
      {
        // 以下loader指挥匹配一个loader，注意：不能用两项配置处理同一类文件
        oneOf: [
          {
            test: /\.css/,
            use: []
          }
        ]
      }
    ]
  },


}