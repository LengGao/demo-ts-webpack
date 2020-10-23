# demo-ts-webpack
入门级教程： https://webpack.html.cn/
webpack4中文光网：https://v4.webpack.docschina.org/
webpack5中文官网： https://webpack.docschina.org/concepts/
npm包版本范围指示：https://www.dazhuanlan.com/2020/03/10/5e669b5493488/
版本:
webpack@4.44.2 webpack-cli@4.1.0 #npm i -g webpack@4.44.2 webpack-cli@4.1.0
# 运行指令 
# webpack指令：webpack ./src/index.js -o /build/built.js --node=development 或者 -node=production
# 有webpack-cli 可直接运行指令：webpack
# 还可以修改npm指令："start": "webpack --config webpack.config.js",


webpack-dev-server
# 启动指令 npx webpack-dev-server 
# webpack-dev-server@^3.5.x引入了webpack-cli/bin/config/config-merge包，但是webpack-cli@4.1.0/bin目录下没有该包，所以需左兼容性处理：npm i webpack-cli@3.3.12 将bin目录下的config 和 utils 复制到新本同目录即可
# 其中引入了许多新版本没有的模块如：findup-sync 所以需要npm i 一下
# 或者修改插件里的源码 因为插件源码殷蹙的包放到了根目录的node_modules/yargs


兼容性问题：
# 当前webpack4版本兼容，5补兼容 问题尚未解决
html-webpack-plugin^4.5.0
# npm text 为了将package.json内容复制以便于注释

postcss-loader postcss-preset-env 
# 版本兼容问题 npm i postcss-loader@^3.0.0  postcss-preset-env@^^6.7.0 
# 做css浏览器兼容性处理兼容性在package.json配置browserlist,postcss配置里数组里引入autoprefixer模块
# 由于postcss 默认使用的是--node=production所以在做自定义配置时process.env.NODE = development

tree shaking  清除无用资源
# 前提：1,使用ES6Module 2,使用production环境变量 然后Build就可以
# 可选配置 在package.json中
# "sideEffect"s: false   意思为：所有的文件都没有副作用，但是会有一个问题，由于版本问题可能会把css文件清除掉
# 所以我们要配置他 "sideEffects: ["*.css"]"

eslint
# eslint DOM WOM 等全局变量需要配置
# package.json eslintConfig 中 ”env“: {"browser": true, "node": true}