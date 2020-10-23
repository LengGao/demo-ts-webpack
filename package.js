module.exports =  
{
  "name": "demo-ts-webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "webpack": "webpack",
    "dev": "webpack-dev-server",
    "start": "webpack --config webpack.config.js",
    "test": "package.bat"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-loader": "^8.1.0",
    "css-loader": "^5.0.0",
    "file-loader": "^6.1.1",
    "html-loader": "^1.3.2",
    "html-webpack-plugin": "^4.5.0",
    "loader": "^2.1.1",
    "mini-css-extract-plugin": "^1.1.1",
    "postcss": "^8.1.2",
    "postcss-preset-env": "^6.7.0",
    "style-loader": "^2.0.0",
    "url-loader": "^4.1.1",
    "webpack": "4.44.2",
    "webpack-cli": "4.1.0",
    "webpack-dev-server": "^3.11.0"
  },
  /* githulb 搜索关键字 browserlist*/
  "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 2 firefox version",
      "last 1 safari version"
    ],// 兼容最近 一个版本的浏览器 
    "production": [
      ">0.2%", // >99.8%的
      "not dead", // 不要死了的
      "not op_mini all" // 不要op_nimi 浏览器
    ]
  }
}
