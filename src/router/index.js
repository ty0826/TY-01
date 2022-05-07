import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/layout.vue'
import Login from '@/views/login/login.vue'
import Home from '@/views/home/home.vue'
import Adv from '@/views/advent/advent.vue'
import Goods from '@/views/goods/goods.vue'
import Order from '@/views/order/order.vue'
import Params from '@/views/params/params.vue'
import specilFincon from '@/views/params/specilFincon.vue'
import Orderlist from '@/views/order/orderList/orderList.vue'
import Orderback from '@/views/order/orderBack/orderBack.vue'
import Addgoods from '@/views/goods/addGoods.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/login', component: Login },
    {
        path: '',
        component: Layout,
        //添加一个元元素
        meta: {
            isLogin: true
        },
        children: [
            { path: '/', component: Home },
            { path: '/adv', component: Adv },
            { path: '/goods', component: Goods },
            { path: '/add', component: Addgoods },
            {
                path: '/params',
                component: Params,
                children: [
                    { path: '', redirect: '/specilFincon' },
                    { path: '/specilFincon', component: specilFincon }
                ]
            },
            {
                path: '/order',
                component: Order,
                children: [
                    { path: '', redirect: '/list' },
                    { path: '/list', component: Orderlist },
                    { path: '/back', component: Orderback }
                ]
            }
        ]
    }
]

const router = new VueRouter({
    routes
})
import store from '@/store/index'
// 设置导航守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some((item) => item.meta.isLogin)) {
        //遍历mathed中的每一项中的meta是否有islogin字段，
        // 有的话就需要登录
        let token = store.state.loginModule.userInfor.token
            //判断是否已经登录
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        //不需要登录
        next()
    }
})
export default router