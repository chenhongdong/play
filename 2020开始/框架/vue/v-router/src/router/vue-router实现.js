// 路由里面 主要mode
// router-link  router-view
// Vue.use注册插件


class VueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash';
        // 路由表是一个数组 [{'/home': Home}]
        this.routes = options.routes || [];
        this.routesMap = this.createMap(this.routes);
        // 路由中需要存放当前的路径  需要一个状态
        this.history = {current: null};

        this.init();
    }

    init() {
        if (this.mode === 'hash') {
            // 先判断用户打开时有没有hash 没有就跳转到#/
            location.hash ? '' : location.hash = '/';
            window.addEventListener('load', () => {
                this.history.current = location.hash.slice(1);
            });
            window.addEventListener('hashchange', () => {
                this.history.current = location.hash.slice(1);
            })
        } else {
            location.pathname ? '' : location.pathname = '/';
            window.addEventListener('load', () => {
                this.history.current = location.pathname;
            });
            window.addEventListener('popstate', () => {
                this.history.current = location.pathname;
            });
        }
    }

    go() {

    }
    back() {

    }

    push() {

    }

    createMap(routes) {
        return routes.reduce((prev,next) => {
            prev[next.path] = next.component;
            return prev;
        }, {});
    }
}
// 使用Vue.use就会调用install方法
VueRouter.install = function(Vue, opts) {
    // 每个组件都有 this.$router | this.$route
    // 在所有组件中获取同一个路由的实例

    Vue.mixin({
        beforeCreate() {    // 混合方法
            // 获取组件的属性名

            if (this.$options && this.$options.router) {
                // 定位根组件
                this._root = this;
                this._router = this.$options.router;
            } else {
                // vue组件的渲染顺序 父 -> 子 -> 孙子
                // 如果想获取唯一的路由实例 this._root._router
                this._root = this.$parent._root;
            }


            Object.defineProperty(this, '$router', {
                get() {
                    return this._root._router;
                }
            });
            Object.defineProperty(this, '$route', {
                get() { // current属性
                    return {
                        // 当前路由所在的状态
                        current: this._root._router.history.current
                    };
                }
            });
        }
    });
    Vue.component('router-link', {
        render(h) {
            return h('a', {}, '首页');
        }
    });
    // 根据当前的状态current 对应路由表{'/home': Home}
    Vue.component('router-view', {
        render(h) {
            console.log(this);
            let current = this._self._root._router.history.current;
            console.log(current);
            return <h1>首页</h1>
        }
    });
}

export default VueRouter;