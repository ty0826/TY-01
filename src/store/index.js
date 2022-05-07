import Vue from 'vue'
import Vuex from 'vuex'
import loginModule from './Module/loginModule'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        loginModule
    }
})