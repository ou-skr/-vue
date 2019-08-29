import Vue from 'vue'
import App from './App.vue'
//引入样式文件
import '@/styles/index.less'
// 引入组件
import router from '@/router.js'
// 引入element ui 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
 