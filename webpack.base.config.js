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
      
    ]
  }


}