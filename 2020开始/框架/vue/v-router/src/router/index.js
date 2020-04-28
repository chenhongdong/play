import Vue from 'vue';
import VueRouter from '@/vue-router';

// 注册组件，router-link和router-view
Vue.use(VueRouter);


import routes from './routes';

export default new VueRouter({
    mode: 'hash',   // 默认是hash，还有history
    routes
});


