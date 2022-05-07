<template>
  <div class="user">
    <div class="header">
      <h2>更多精彩内容 :</h2>
      <el-button @click="change" type="primary">查看文件</el-button>
    </div>
    <!-- 图片区域 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button @click="download" style="float: right; padding: 3px 0" type="text">下载图片</el-button>
          </div>
          <div class="imgs">
            <img :src="imgUrl" ref="img" style="height: 400px" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button @click="downs" style="float: right; padding: 3px 0" type="text">下载不同源图片</el-button>
          </div>
          <div class="imgs">
            <img src="../../assets//imgage//true (1).jpg" ref="img" style="height: 400px" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button @click="down" style="float: right; padding: 3px 0" type="text">下载本地资源</el-button>
          </div>
          <div class="imgs">
            <img :src="imgUrl" ref="img" style="height: 400px" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <userDialog ref="userDialog"></userDialog>
  </div>
</template>

<script>
import userDialog from './userDialog.vue'
import img from '@/assets/imgage/true.jpg'
export default {
  data() {
    return {
      imgUrl: img
    }
  },
  components: {
    userDialog
  },
  methods: {
    change() {
      this.$refs.userDialog.dialogVisible = true
    },
    //下载图片
    download() {
      //新窗口打开
      const URL = this.$refs.img
      window.location.href = URL.src
    },
    //同源下载图片
    down() {
      var link = document.createElement('a')
      link.href = this.URL
      link.download = 'pic'
      link.click()
    },
    //不同源下载图片

    downloadIamge(imgsrc, name) {
      // 下载图片地址和图片名
      var image = new Image()
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        var url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
        var a = document.createElement('a') // 生成一个a元素
        var event = new MouseEvent('click') // 创建一个单击事件
        a.download = name || 'photo' // 设置图片名称
        a.href = url // 将生成的URL设置为a.href属性
        a.dispatchEvent(event) // 触发a的单击事件
      }
      image.src = imgsrc
    },
    downs() {
      this.downloadIamge(this.$refs.img.src, 'pic')
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  margin: 20px;
  .header {
    margin-bottom: 30px;
    height: 50px;
    display: flex;
    background-color: #fcfcfc;
    line-height: 50px;
    h2 {
      margin-right: 20px;
    }
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.box-card {
  width: 400px;
}
</style>
