exports.done = false;
let a = require('./a');
console.log('这里是b文件，a的done是', a.done);
exports.done = true;
console.log('b文件完成');