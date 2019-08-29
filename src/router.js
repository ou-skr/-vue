import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)//代表可以在vue实例中使用所有路由相关功能，<router-link></router-link><router-view></router-view>,不写的话根组件的router-view会用不了
// 把login组件引进来
import Login from '@/vues/login.vue'
// 把home组件引进来
import Home from '@/vues/home.vue'
// 创建路由模块
var router=new VueRouter({
    routes:[
        {
            name:'Login',
            path:'/login',
            component:Login
        },
        {
            name:'Home',
            path:'/home',
            component:Home
        }
    ]
})

export default router