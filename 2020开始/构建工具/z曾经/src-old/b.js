// import 'jquery';
// console.log('bb');

// import lodash from 'lodash';
// import('jquery');
// console.log('bb', lodash);

// import common from './common';
// console.log(common);

import common from './common';
import $ from 'jquery';

// console.log('bbbb');

if (module.hot) {
    module.hot.accept('./common', () => {
        console.log('b文件更新了');
    })
}