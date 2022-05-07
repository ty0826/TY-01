<template>
  <div>
    <el-dialog title="添加规格参数" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <treeGoods @changeNode="changeNode"></treeGoods>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true" :disabled="isDisable">确定并添加分组</el-button>
      </span>
      <el-dialog width="45%" title="商品规格参数配置" :visible.sync="innerVisible" append-to-body>
        <div>当前选中的商品 ：{{ treedata.name }}</div>
        <el-button type="primary" style="margin-top: 20px; margin-bottom: 20px" @click="addDomain">新增规格列表</el-button>
        <hr />

        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
          <el-form-item v-for="(item, index) in dynamicValidateForm.domains" :label="item.title + index" :key="index" :prop="item.title" :rules="{ required: true, message: '域名不能为空', trigger: 'blur' }">
            <div class="items">
              <el-input v-model="item.title"></el-input>
              <el-button @click.prevent="addChildrenDomains(index)" class="dele">新增子组</el-button>
              <el-button @click.prevent="removeDomain(index)" class="dele">删除</el-button>
            </div>
            <!-- //子组 -->
            <el-form-item v-for="(items, i) in item.children" :label="items.title + i" :key="i" :prop="items.title">
              <div class="items">
                <el-input v-model="items.title"></el-input>
                <el-button @click.prevent="removeChildrenDomain(index, i)" class="dele">删除</el-button>
              </div>
            </el-form-item>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import treeGoods from '@/views/goods/treeGoods.vue'
export default {
  components: {
    treeGoods
  },
  data() {
    return {
      //外弹框
      dialogVisible: false,
      //内弹框
      innerVisible: false,
      //列表参数值
      treedata: {},
      //按钮状态
      isDisable: true,
      dynamicValidateForm: {
        domains: []
      }
    }
  },
  methods: {
    //接收treeData传过来的值
    changeNode(val) {
      this.isDisable = false
      this.treedata = val
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    //提交按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addParmas({
              itemCatId:this.treedata.cid,
              content:JSON.stringify(this.dynamicValidateForm.domains),
              specsName:this.treedata.name
          }).then(res=>{
            
            if(res.data.status===200){
               this.$message({
                    message: '恭喜你，添加成功',
                    type: 'success'
                  })
              //渲染到页面上
              this.$parent.http(1)
              //关闭弹窗
              this.dialogVisible=false
              this.innerVisible=false
              //清空数据
              this.dynamicValidateForm.domains=[]
              //禁用按钮
              this.isDisable=true
            }else{
              this.$message.error('对不起，添加失败')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    //删除外组
    removeDomain(index) {
      this.dynamicValidateForm.domains.splice(index, 1)
    },
    //删除子组
    removeChildrenDomain(index, i) {
      this.dynamicValidateForm.domains[index].children.splice(i, 1)
    },
    //添加外组
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        title: '',
        children: []
      })
    },
    //添加子组
    addChildrenDomains(index) {
      this.dynamicValidateForm.domains[index].children.push({
        title: '',
        value: ''
      })
    }
  }
}
</script>

<style lang="less">
.items {
  display: flex;
  .dele {
    margin-left: 15px;
  }
}
</style>
