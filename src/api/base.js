//  接口路径配置
const base = {
    host: 'http://localhost:8826', //基础路径
    goodsList: '/api/api/projectList', //商品列表
    search: '/api/api/search', //查询参数
    treeList: '/api/api//backend/itemCategory/selectItemCategoryByParentId', //类目选择
    upload: '/api/api/upload/', //图片上传
    addGoods: '/api/api/backend/item/insertTbItem', //添加商品
    delectGoods: '/api/api/backend/item/deleteItemById', //删除商品
    updateGoods: '/api/api/backend/item/updateTbItem', //编辑商品
    loginPage: '/api/api/login', //登录页面
    statistical: '/api/api/statistical', //销售信息
    sellTotal: '/api/api/sellTotal', //图表信息
    params: '/api/api/backend/itemParam/selectItemParamAll', //参数列表
    Sreachparams: '/api/api/params/search', //规格参数搜索
    delectParams: '/api/api/params/delete', //删除参数
    addParmas: '/api/api/backend/itemParam/insertItemParam', //添加规格参数
    updataParams: '/api/api/update/category', //编辑参数
    getList: '/api/api/order-list', //获取用户列表
}

//默认导出
export default base