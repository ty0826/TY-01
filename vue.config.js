const { defineConfig } = require('@vue/cli-service')
module.exports = {
    //跨域
    assetsDir: 'assets',
    //修改打包路径
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    //反向代理
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8826', //
                ws: true,
                changeOrigin: true,
                pathRewrite: { //重写路径
                    '^/api': ''
                }
            },
        },
    }

}