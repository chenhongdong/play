let o = {a: 1, b: {bb: 'bb'}, c: [1,2,3]};
o.o = o;

function deepClone(obj, map = new Map()) {
    // 判断是不是对象类型
    if (typeof obj === 'object') {
        // 这里是判断循环引用的问题，看第2行代码o.o = o那里，如果设置过相同的值了，就直接返回
        if (map.has(obj)) {
            return map.get(obj);
        }
        // 深拷贝最主要，也是工作中用到的就两个类型一个是[],一个是{}
        let data = Array.isArray(obj) ? [] : {};
        // 在这里设置值，好在第8行的时候判断是不是循环引用了
        map.set(obj, data);
        // 遍历整个obj
        for (let key in obj) {
            // 把递归下一层对象的值，赋给data上的key
            data[key] = deepClone(obj[key], map);
        }
        // 最后返回data
        return data;
    }
    // 基本类型直接返回就行
    return obj;
}

let o2 = deepClone(o);
o2.b.bb2 = 'bb2';
o2.c.pop();
console.log(o, o2);