import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
    //准备翻译的语言环境信息
const messages = {
        en: {
            //英文
            menu: {
                title: 'Background management system',
                home: 'home',
                goods: 'Commodity management',
                params: 'Specification parameters',
                adv: 'Advertising management',
                order: 'Order management',
                list: 'Order list',
                out: 'Return order'
            }
        },
        zh: {
            //中文
            menu: {
                title: '后台管理系统',
                home: '首页',
                goods: '商品管理',
                params: '规格参数',
                adv: '广告管理',
                order: '订单管理',
                list: '订单列表',
                out: '退货订单'
            }
        }
    }
    //通过选项创建 VueI18n 实例
const i18n = new VueI18n({
        locale: 'en', // 设置地区
        messages, // 设置地区信息
    })
    //导出i18n
export default i18n