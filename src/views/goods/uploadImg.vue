<template>
  <el-upload class="upload-demo" ref="upload" :action="urls" :on-success="success" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </el-upload>
</template>
<script>
import base from '@/api/base'
export default {
  data() {
    return {
      urls: base.upload,
      fileList: []
    }
  },
  methods: {
    //上传成功函数
    success(response, file, fileList) {
      console.log(response, file, fileList)
      this.$message({
        message: '恭喜你，上传成功',
        type: 'success'
      })
      const url =base.host+'/'+response.url.slice(7)
      this.$emit('addUrl',url)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>
