

export default {
    functional: true,
    render(createElement, context) {
        let {parent, data} = context;
        let route = parent.$route;  // 拿到父组件的$route
        let matched = route.matched;
        let depth = 0;
        data.routerView = true;

        while (parent) {
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++;
            }
            parent = parent.$parent;
        }

        let record = matched[depth];
        if (!record) {
            return createElement(); // 渲染一个空页面
        }
        let component = record.component;

        return createElement(component, data);
    }
}