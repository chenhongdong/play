// import 'jquery';
// console.log('a');

// import lodash from 'lodash';
// import('jquery');
// console.log('a', lodash);

// import common from './common';
// console.log(common);


// import './style.css';
// import $ from 'jquery';
// import moment from 'moment';
// // 手动引入中文语言包
// import 'moment/locale/zh-cn';
// // 设置语言包
// // moment.locale('zh-cn');

// let r = moment().endOf('day').fromNow();
// console.log(r);


import common from './common';
// import $ from 'jquery';

console.log(common, 123);

// if (module.hot) {
//     module.hot.accept('./common', () => {
//         console.log('文件更新了');
//         let src = require('./common');
//         console.log('更新后： ',src);
//     })
// }

if (module.hot) {
    module.hot.accept();
    console.log('文件更新了');
}