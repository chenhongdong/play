// import {flatten} from './utils';
// import Utils from 'utils';  // 这里直接通过alias设置别名，简化了模块的引用
// import _ from 'lodash';
// console.log('lodash', _);
// console.log(Utils.flatten([1,[3,[2]], 10, [4]]));

// import './style.css';
// import React from 'react';
// import {render} from 'react-dom';
// // import $ from 'jquery';
// // $('#root').css({border: '10px solid #fff'})

// // import _ from 'lodash';
// // let arr = [1, 2, 3, 4, 5];
// // console.log(_.tail(arr));   // tail方法，返回除第一个元素之外的元素数组

// render(<React.Fragment>
//     <h1 className="title">你好，世界</h1>
//     <div className="logo"></div>
// </React.Fragment>, window.root);

import axios from 'axios';


let btn = document.createElement('button');
btn.innerHTML = '播放';

btn.addEventListener('click', () => {
    // 4.懒加载
    // import()语法 主要是通过jsonp来实现动态加载，返回一个Promise
    // 目前处于第三阶段的提案，也支持await

    // import(/* webpackChunkName:'audio' */'./audio.js').then(data => {
    //     console.log('动态加载', data);
    // }) 
    // import('./audio.js').then(data => {
    //     console.log('动态加载', data);
    // });


    // 跨域请求
    axios.get('/api/info').then(res => {
        const data = res.data;
        let div = document.createElement('div');
        let html = `<h2>${data.nickname} <span style="color: pink;">Lv.${data.level}</span></h2>
            <audio src="${data.src}" autoplay="true"></audio>`;
        div.innerHTML = html;

        window.root.appendChild(div);
    });
});

window.root.appendChild(btn);

// 导入需要热更新的模块
import audio from './audio';
// 使用热更新
if (module.hot) {
    module.hot.accept('./audio.js', (data) => {
        console.log('文件更新了啊');
        console.log(data);
    });
}


// 利用IgnorePlugin把只需要的语言包导入使用就可以了，省去了一下子打包整个语言包
import moment from 'moment';
import 'moment/locale/zh-cn';
// 设置了中文，却把整个语言包都打包进去了，这样很不好
// moment.locale('zh-cn');
let time = moment().endOf('day').fromNow();

window.root.innerHTML += time;