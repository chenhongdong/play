let o = {
    a: 1,
    obj: {
        name: 'chd'
    },
    arr: [1,2,3]
};

function deepClone(obj, map = new Map()) {
    if (typeof obj === 'object') {
        if (map.has(obj)) {
            return map.get(obj);
        }
        let data = Array.isArray(obj) ? [] : {};
        map.set(obj, data);

        for (let key in obj) {
            data[key] = deepClone(obj[key], map);
        }
        return data;
    }
    return obj;
}

let o2 = deepClone(o);
o2.arr.push(4);
o2.obj.job = 'happy';
console.log(o, o2);