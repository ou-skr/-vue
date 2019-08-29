import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)//代表可以在vue实例中使用所有路由相关功能，<router-link></router-link><router-view></router-view>,不写的话根组件的router-view会用不了
// 把login组件引进来
import Login from '@/vues/login.vue'
// 把home组件引进来
import Home from '@/vues/home.vue'
// 把路由welcome组件引入
import Welcome from '@/vues/welcome.vue'
// 把users组件引入
import User from '@/vues/users/user.vue'

//这是解决点击路由跳转的报错
// 解决vue中的NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 创建路由模块
var router=new VueRouter({

    routes:[
        //把一开始的/也重定向
     {
         path:'/',
         redirect:{name:'Login'}
     },
        {
            name:'Login',
            path:'/login',
            component:Login
        },
        {
            name:'Home',
            path:'/home',
            component:Home,
            // 添加嵌套路由
            // 而且需要路由重定向
            redirect:{name:'Welcome'},
            children:[
                {
                    name:'Welcome',
                    path:'welcome',
                    component:Welcome
                },
                {
                    name:'User',
                    path:'user',
                    component:User
                }
            ]
        }
    ]
})

export default router