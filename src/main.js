import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './plugins/element.js'
import './assets/css/rset.css'
import api from '@/api/index'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.prototype.$api = api
Vue.config.productionTip = false

//持久化
let user = localStorage.getItem('user')
if (user) {
    store.commit('loginModule/setUser', user)
}

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')