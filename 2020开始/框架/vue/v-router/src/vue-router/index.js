import install from './install';
import createMatcher from './create-matcher';
import HashHistory from './history/hash';

export default class VueRouter {
    constructor(options = {}) {
        this.matcher = createMatcher(options.routes || []);

        this.mode = options.mode || 'hash';

        this.history = new HashHistory(this);

    }

    init(app) {
        const history = this.history;
        // 监听路由变化函数
        const setupHashListener = () => {
            history.setupListener();
        };
        history.transitionTo(
            history.getCurrentLocation(),
            setupHashListener
        );

        history.listen(route => { // 发布订阅监听路径变化，好更新视图
            app._route = route; 
        });
    }

    match(location) {
        return this.matcher.match(location);
    }

    push() {

    }
    replace() {

    }
}

VueRouter.install = install;