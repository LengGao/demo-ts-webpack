import index from './index.css'
import hot from './static/js/hot.js'


function add (x,y) {
  return x + y
}
console.log("css:",index);
hot.hello()

if (module.hot) {
   module.hot.accept('./static/js/hot.js',function () {
    //  ../static/js/hot 文件内容变化 则更新改模块，其他模块不跟新
     hot.hello()
   })
}

//  serviceworker 兼容
// 注册serviceworker 
/**
 * eslint 不认识浏览器 对象需要配置
 */
if("serviceWorker" in navigator) {
  window.addEventListener('load',()=>{
    navigator.serviceworker.register('/server-worker.js')
    .then(()=> { console.log("res",res);
    })
  })
}