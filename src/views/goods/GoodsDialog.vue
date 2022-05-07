<template>
  <div>
    <!-- 商品弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="70%" :before-close="close">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类目选择" prop="category">
          <el-button type="primary" @click="innerVisible = true">类目样式</el-button>
          <span style="margin-left: 20px; background-color: orange; font-size: 20px">{{ ruleForm.category }}</span>
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
          <el-button type="primary" @click="innerVisibleImg = true">上传图片</el-button>
          <img :src="ruleForm.image" width="200px" style="margin-left: 30px" />
        </el-form-item>
        <el-form-item label="商品描述" prop="descs">
          <Wangeditor ref="mytxt" @getNwehtml="getNwehtml"></Wangeditor>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>

      <!-- 类目内嵌弹窗 -->
      <el-dialog width="50%" title="类目样式" :visible.sync="innerVisible" append-to-body>
        <treeGoods @changeNode="changeNode"></treeGoods>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="treeClose">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 上传图片弹窗 -->
      <el-dialog width="50%" title="上传图片" :visible.sync="innerVisibleImg" append-to-body>
        <uploadImg @addUrl="addUrl"></uploadImg>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="upImg">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import treeGoods from '@/views/goods/treeGoods.vue'
import uploadImg from '@/views/goods/uploadImg.vue'
import Wangeditor from '@/views/goods/wangEidtor.vue'
export default {
  components: {
    treeGoods,
    uploadImg,
    Wangeditor
  },
  props: {
    dialogVisible: {
      default: '',
      type: Boolean
    },
    rowData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }, //外弹框，父传子
  data() {
    return {
      title: '添加商品',
      urlImg: '',
      treeVaule: [], //弹窗内部的值
      innerVisibleImg: false, //图片弹窗
      innerVisible: false, //内弹框
      ruleForm: {
        id: '',
        category: '',
        title: '',
        price: '',
        num: '',
        sellpoint: '',
        image: '',
        descs: '',
        cid: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        num: [{ required: true, message: '请填入商品数量', trigger: 'blur' }],
        sellpoint: [{ message: '请输入商品卖点', trigger: 'blur' }],
        descs: [{ message: '请输入商品描述', trigger: 'blur' }]
      }
    }
  },
  //侦听表单数据的变化
  watch: {
    rowData(val) {
      this.ruleForm = val
      //改变wangEidtor的值
      this.$nextTick(() => {
        this.$refs.mytxt.editor.txt.html(val.descs)
      })
    }
  },
  methods: {
    //获取富文本内容
    getNwehtml(val) {
      this.ruleForm.descs = val
    },
    //点击确定按钮上传图片路径
    upImg() {
      this.innerVisibleImg = false
      this.ruleForm.image = this.urlImg
    },
    //上传图片
    addUrl(val) {
      this.urlImg = val
    },
    //内弹窗关闭
    treeClose() {
      this.innerVisible = false
      this.ruleForm.category = this.treeVaule
      this.ruleForm.cid = this.treeVaule.cid
    },
    //接受子集传过来的值
    changeNode(val) {
      this.treeVaule = val.name
    },
    //改变弹窗的状态
    close() {
      this.$emit('chengeDialogVisible')
      this.clesrForm()
    },
    //提交按钮
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        //es6语法，解构赋值
        let { title, cid, category, sellPoint, price, num, descs, image, id } = this.ruleForm
        if (valid) {
          if (this.title === '添加商品') {
            this.$api
              .addGoods({
                id,
                title,
                cid,
                category,
                sellPoint,
                price,
                num,
                descs,
                image
              })
              .then((res) => {
                if (res.data.status === 200) {
                  //给父组件传值
                  this.$parent.user(1)
                  this.$message({
                    message: '恭喜你，添加成功',
                    type: 'success'
                  })
                  this.clesrForm()
                } else {
                  this.$message.error('对不起，添加失败')
                }
              })
          } else {
            this.$api
              .updateGoods({
                title,
                cid,
                category,
                sellPoint,
                price,
                num,
                descs,
                image,
                id
              })
              .then((res) => {
                if (res.data.status === 200) {
                  //给父组件传值
                  this.$parent.user(1)
                  this.$message({
                    message: '恭喜你，修改成功',
                    type: 'success'
                  })
                  this.clesrForm()
                } else {
                  this.$message.error('对不起，修改失败')
                }
              })
          }
        }
      })
    },
    resetForm(formName) {
      this.$refs.ruleForm.resetFields()
    },
    //封装一个清除内容函数
    clesrForm() {
      //关闭弹窗
      this.$emit('changedialogVisible')
      //清空文本框内容
      ;(this.ruleForm = {
        category: '',
        title: '',
        price: '',
        num: '',
        sellpoint: '',
        image: '',
        descs: '',
        cid: ''
      }),
        //清空数据
        this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style></style>
