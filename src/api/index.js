// 请求的方法
import axios from 'axios'
import base from './base'
const qs = require('qs')
const api = {
    //登录页面
    loginPage(params) {
        return axios.post(base.loginPage, qs.stringify(params))
    },
    // 商品列表
    getGoodsList(params) {
        return axios.get(base.goodsList, {
            params
        })
    },
    //商品搜索
    // 参数：search
    getGearch(params) {
        return axios.get(base.search, {
            params
        })
    },
    //类目选择
    // 接口说明： 接口不同的参数cid 返回不同的类目数据 后台接受变量： id *
    getTreeList(params) {
        return axios.get(base.treeList, {
            params
        })
    },
    //添加商品
    //  * 参数： title cid  category sellPoint price num descs paramsInfo image
    addGoods(parmas) {
        return axios.get(base.addGoods, {
            parmas
        })
    },
    //删除商品
    deleteGooods(params) {
        return axios.get(base.delectGoods, {
            params
        })
    },
    //编辑商品
    updateGoods(params) {
        return axios.get(base.updateGoods, {
            params
        })
    },
    //销售信息
    getStatistical() {
        return axios.get(base.statistical)
    },
    // * 销量对比
    // */
    getSellTotal() {
        return axios.get(base.sellTotal)
    },
    //获取参数列表
    getParams(params) {
        return axios.get(base.params, { params })
    },
    //规格参数搜索
    paramsSreach(params) {
        return axios.get(base.Sreachparams, { params })
    },
    //删除参数
    delectParams(params) {
        return axios.get(base.delectParams, { params })
    },
    //添加参数
    addParmas(params) {
        return axios.get(base.addParmas, { params })
    },
    //编辑参数
    updataParams(params) {
        return axios.get(base.updataParams, { params })
    },
    //用户列表
    getUserList(params) {
        return axios.get(base.getList, { params })
    },
}

export default api