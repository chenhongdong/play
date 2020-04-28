/* 
    1.不可扩展  -> 不可增加新的属性，老的属性可以删除和更改值
    2.密封     -> 不可增加新的属性，老的属性不能删除，可以修改属性值
    3.冻结     -> 不可增加新的属性，老的属性不能删除也不能更改值 
*/

// 不可扩展
let music = {singer: '周杰伦', song: '我的地盘', public: 2004, all: ['七里香', '借口', '止战之殇', '园游会']};
// console.log(Object.isExtensible(music));    // 可扩展 true
// Object.preventExtensions(music);    
// console.log(Object.isExtensible(music));    // 不可扩展 false
// music.album = '七里香';
// music.song = '晴天';
// delete music.public;
// console.log(music); // { singer: '周杰伦', song: '我的地盘', public: 2004 } } 没有添加成功新的属性album


// 密封
// console.log(Object.isExtensible(music));    // 可扩展
// console.log(Object.isSealed(music));        // 没有密封
// Object.seal(music);         // 密封
// music.song = '晴天';
// delete music.public;
// console.log(music);
// console.log(Object.isExtensible(music));    // 不可扩展
// console.log(Object.isSealed(music));        // 密封


// 冻结
// console.log(Object.getOwnPropertyDescriptor(music, 'song'));
// Object.freeze(music);
// console.log(Object.getOwnPropertyDescriptor(music, 'song'));
// music.album = '七里香';
// music.song = '晴天';
// delete music.public;
// // 都是浅层控制，如果是引用类型就可以不受限制
// music.all.push('搁浅');
// console.log(music);


// 自己实现深冻结,引用类型也会受到限制。实现思路和深拷贝一样
function deepFreeze(obj) {
    let newObj = {};
    for (let key in obj) {
        let value = obj[key];
        // 如果是对象就深度递归
        // todo 和深拷贝一起写
        newObj[key] = Object.freeze(value);
    }
}
deepFreeze(music);
music.all.push('外婆');
console.log(music);

