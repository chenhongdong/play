export default class History {
    constructor(router) {
        this.router = router;
        this.current = createRoute(null, {
            path: '/'
        });
    }

    transitionTo(location, onComplete) {
        let route = this.router.match(location);    // match实际上也是返回了createRoute创建的路由

        // /user/list通过createRoute后变成
        /* {path:'/user/list',matched:[
            {path: '/user', component: {}, parent: undefined, redirect: undefined},
            {path: '/user/list', component: {}, parent: {path:'/user',...}, redirect: undefined}
        ]} */
        console.log(route);
        // 新的route属性覆盖掉current
        if (this.current.path === location && this.current.matched.length === route.matched.length) {
            return;  // 相同路径就不跳转
        }
        this.update(route);
        onComplete && onComplete();
    }

    update(route)  {
        this.current = route;
        this.cb && this.cb(route);
    }

    listen(cb) {
        this.cb = cb;
    }
}


export function createRoute(record, location) {
    let res = [];
    if (record) {
        while(record) {
            res.unshift(record);
            record = record.parent;
        }
    }

    return {
        ...location,
        matched: res
    }
}