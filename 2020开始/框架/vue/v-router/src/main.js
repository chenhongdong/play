import Vue from 'vue';
import App from './App.vue';
import router from './router';

export default new Vue({
  name: 'main',
  el: '#app',
  render: h => h(App),
  router        // this.$route 放的是属性   this.$router放的是方法
});