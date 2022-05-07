<template>
  <el-dialog title="编辑规格参数" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="规格参数" prop="id">
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="类目ID" prop="itemCatId">
          <el-input v-model="ruleForm.itemCatId"></el-input>
        </el-form-item>
        <el-form-item label="规格名称" prop="specsName">
          <el-input v-model="ruleForm.specsName"></el-input>
        </el-form-item>
        <el-form-item label="规格参数" prop="paramData">
          <el-input v-model="ruleForm.paramData"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="ISdialogVisible">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        id: '',
        itemCatId: '',
        specsName: '',
        paramData: ''
      },
      rules: {
        id: [{ required: true, message: '请输入规格参数id', trigger: 'blur' }],
        itemCatId: [{ required: true, message: '请输入类目id', trigger: 'change' }],
        specsName: [{ required: true, message: '请输入规格名称', trigger: 'change' }],
        paramData: [{ required: true, message: '请输入规格参数', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //确定
    ISdialogVisible() {
      // cid content id  specsName
      let { itemCatId, paramData, id, specsName } = this.ruleForm
      this.$api
        .updataParams({
          itemCatId,
          paramData,
          id,
          specsName
        })
        .then((res) => {
          if (res.data.status === 200) {
            //给父组件传值
            this.$parent.http(1)
            this.$message({
              message: '恭喜你，修改成功',
              type: 'success'
            })
          } else {
            this.$message.error('对不起，修改失败')
          }
        })
      this.dialogVisible = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
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

<style></style>
