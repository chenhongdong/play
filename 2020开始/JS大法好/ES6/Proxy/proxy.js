/* 
    如何用proxy来实现响应式原理
    可以处理数组的变化，数组索引的变化，新增属性的变化
*/
let obj = { 
    "id": 1, 
    "title": "叶惠美", 
    "public": 2003, 
    "song": '晴天',
    "name": {
        "album": "叶惠美"
    },
    "list": ['晴天', '东风破', '三年二班', '以父之名'], 
    "img": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=281827478,1045705647&fm=26&gp=0.jpg"
};

// 可以代理13种方法 set get

// defineProperty的缺点：
// 暴力循环，是对象就会递归下去，耗性能
// defineProperty只能对特定的属性进行拦截
// Object.defineProperty   以后会改成   Reflect.defineProperty

let handle = {
    // target源对象
    // key就是当前取的哪个值
    get(target, key) {
        // console.log('收集依赖');
        if (typeof target[key] === 'object' && target[key] !== null) {
            // 递归代理  只有取到对应值的时候，才会进行代理
            return new Proxy(target[key], handle);
        }
        
        // Reflect 反射 这个方法包含了很多的api
        return Reflect.get(target, key);
    },
    set(target, key, value) {
        // 数组的set是先去改索引，然后再去改length
        
        // 判断当前是新增还是修改操作
        let oldValue = target[key];
        console.log(oldValue, key, value);
        if (!oldValue) {    // 新增
            console.log('add');
        } else if (oldValue !== value) {    // 修改
            console.log('change');
        }
        return Reflect.set(target, key, value);
    }
};
// 拦截整个对象
let proxy = new Proxy(obj, handle);
// 懒代理，默认也只代理第一层对象
// proxy.name.album = '七里香';


// 数组的代理
// 新增数组
// proxy.list.push('你听得到');
// 修改数组
proxy.list[0] = '梯田';

proxy.xoxo = 1;


