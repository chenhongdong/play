import './style.css';
import React from 'react';
import { render } from 'react-dom';

// import _ from 'lodash';
// console.log(_.xor([2,1], [1, 3]))

// import { flatten } from './common';
// console.log('index',flatten([1,[33, 4, 5, [34]]]));





class Music extends React.Component {
    constructor() {
        super();
        // this.showLrc = this.showLrc.bind(this);
        this.state = {};
    }
    showLrc() {
        // 通过ES6的import()方法实现了懒加载功能，实际上是利用了jsonp去动态导入了
        import('./lrc').then(data => {
            let lrc = data.default.split('\n').filter(item => item !== '');
            this.setState({ lrc });
        })
    }

    // other() {
    //     import('./common').then(data => {
    //         console.log(data.flatten);
    //     })
    // }

    render() {
        return (
            <div>
                <button className="btn" onClick={() => this.showLrc()}>显示歌词</button>
                <div className="lrc-box">
                    {this.state.lrc && this.state.lrc.map((item, index) => (
                        <p key={index} className="lrc">{item}</p>
                    ))}
                </div>
                {/* <button id="btns" onClick={() => this.other()}>播放歌曲</button> */}
            </div>
        )
    }
}

render(<React.Fragment>
    <h1 className="title">听妈妈的话-周杰伦</h1>
    <Music></Music>
</React.Fragment>, window.root);


// 热更新
// import audio from './audio';

// if (module.hot) {
//     module.hot.accept('./audio.js', (path) => {
//         console.log(path);
//         console.log('audio文件更新了');
//     });
// }


// IgnorePlugin
// 利用IgnorePlugin把只需要的语言包导入使用就可以了，省去了一下子打包整个语言包
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// // 设置了中文，却把整个语言包都打包进去了，这样很不好
// // moment.locale('zh-cn');
// let time = moment().endOf('day').fromNow();

// window.root.innerHTML += time;