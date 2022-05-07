//搭建express服务器
const express = require('express')
const app = express()

//post请求
app.use(express.urlencoded({ extended: true }))
    //路由
const router = require('./router')
    //使用路由
app.use('/api', router)
    //静态文件托管,访问地址http://localhost:8826/upload.jpg
app.use(express.static('upload'))

app.listen(8826, () => {
    console.log(8826)
})