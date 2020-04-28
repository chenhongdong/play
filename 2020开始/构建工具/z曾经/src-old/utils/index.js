// 公共方法
const utils = {
    flatten: (arr) => {
        return arr.reduce((all, cur) => {
            if (Array.isArray(cur)) {
                return [...all, ...utils.flatten(cur)];
            } else {
                return [...all, cur];
            }
        }, []);
    }
};

export default utils;