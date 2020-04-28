import View from './components/view';
import Link from './components/link';

let _Vue;

export default function install(Vue) {
    _Vue = Vue;

    _Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                this._rootRouter = this;
                this._router = this.$options.router;
                this._router.init(this);
                Vue.util.defineReactive(this, '_route', this._router.history.current);
                console.log(this._rootRouter)
            } else {
                this._rootRouter = this.$parent && this.$parent._rootRouter;
            }
        }
    });

    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._rootRouter._route;
        }
    });
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._rootRouter._router;
        }
    });

    Vue.component('RouterView', View);
    Vue.component('RouterLink', Link);
}