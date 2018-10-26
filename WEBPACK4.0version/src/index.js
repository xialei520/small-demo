const a = require('./a.js');
console.log(a);

import './index.css';
import './style.less';
//只要组件有更新就刷新
if(module.hot){
    module.hot.accept();
}