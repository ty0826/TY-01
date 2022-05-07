<template>
  <div class="add">
    <!-- 面包屑 -->
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品添加</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 表单内容 -->
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类目选择" prop="category">
          <el-button type="primary">类目选择</el-button>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellpoint">
          <el-input v-model="ruleForm.sellpoint"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="image">
          <el-button type="primary">上传图片</el-button>
        </el-form-item>
        <el-form-item label="商品描述" prop="descs">
          <textarea cols="100" rows="10"></textarea>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        category: '',
        title: '',
        price: '',
        num: '',
        sellpoint: '',
        image: '',
        descs: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: '商品' }
        ],
        price: [{ type: 'number', required: true, message: '请输入商品价格', trigger: 'blur' }],
        num: [{ type: 'number', required: true, message: '请填入商品数量', trigger: 'blur' }],
        sellpoint: [{ type: 'string', message: '请输入商品卖点', trigger: 'blur' }],
        descs: [{ message: '请输入商品描述', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.add {
  margin: 20px;
  .tltle {
    background-color: #eee;
    padding: 20px;
    border: 1px solid #eee;
    margin-bottom: 40px;
  }
  .content {
    margin-top: 40px;
    background-color: #fff;
    padding: 20px;
    padding-right: 40px;
  }
}
</style>
