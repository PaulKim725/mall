import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick';

import toast from '@/components/common/toast';

Vue.use(toast);

Vue.config.productionTip = false

// vue实例 事件总线
Vue.prototype.$bus = new Vue();

// fastclick 减少移动端300ms延迟问题
FastClick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
