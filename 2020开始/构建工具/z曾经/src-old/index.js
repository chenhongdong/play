// 需要实现多入口
// index.html需要a.js   login.html需要b.js


// 动态加载文件
// let btn = document.createElement('button');
// btn.innerHTML = '点';

// document.body.appendChild(btn);

// btn.addEventListener('click', () => {
//     // 动态导入 类比 路由的懒加载 import语法

//     // 懒加载原理,webpack会默认把这个calc单独打包成文件
//     // 等你点击的时候，会使用jsonp动态加载calc的文件
//     // import可以实现代码分割
//     // 原理就是jsonp动态导入
//     // /* webpackChunkName:'star' */这是魔术字符串
//     import(/* webpackChunkName:'star' */'./calc').then(data => {
//         console.log(data.add(1, 8));
//     });
// })

// import React from 'react';
// import {render} from 'react-dom';
// import './style.css';


// render(<h1 className="logo">hello 123</h1>, window.root);


// import $ from 'jquery'; // 这个文件应该是cdn加载进来的
// console.log('$', $);

// import Vue from 'vue';
// console.log(Vue);



// tree-shaking 默认只支持es6语法的，静态导入
// 只在生产环境下使用
// import {minus} from './calc';

// console.log(minus(10, 2));

// // 如果引入的模块没有使用，打包之后就删除掉，在package.json里设置sideEffects: false
// // 不过如果在引入css的时候，sideEffects会有副作用，此时设置sideEffects: ['**/*.css']
// import './style.css';
// import test from './test';



// 每个模块都是个函数，函数太多会导致内存过大


// DllPlugin动态链接库
// react + react-dom 先打包好 放在哪

// 怎么打包第3方库





// 其他： webpack跨域问题
// let xhr = new XMLHttpRequest();

// // http://localhost:8080    webpack-dev-server服务  转发给9000端口
// xhr.open('GET', '/user', true);

// xhr.onload = function() {
//     console.log(xhr.response);
// }
// xhr.send();


// alias别名使用
// import Utils from 'Utils/';
// let arr = [1,[2, 10, [20]], 3, [4, [5]]];
// console.log(Utils.flatten(arr));


