exports.done = false;
const b = require('./b');
console.log('这里是a文件，b的done是', b.done);

exports.done = true;
console.log('a文件完成');