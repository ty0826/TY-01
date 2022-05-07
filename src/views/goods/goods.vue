<template>
  <div class="goods">
    <!-- 头部区域 -->
    <div class="header">
      <el-input v-model="input" placeholder="请输入内容" @change="searchInp"></el-input>
      <el-button type="primary">查询</el-button>
      <router-link to="/add">
        <el-button type="primary">添加</el-button>
      </router-link>
      <el-button type="primary" @click="changedig">弹窗添加</el-button>
    </div>
    <!-- 内容区域 -->
    <div class="wrapper">
      <el-table :data="tableData" border>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品ID" width="180"> </el-table-column>
        <el-table-column prop="title" label="商品名称" width="180" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="price" label="商品价格"> </el-table-column>
        <el-table-column prop="num" label="商品数量"> </el-table-column>
        <el-table-column prop="category" label="规格类目"> </el-table-column>
        <el-table-column prop="image" label="商品图片" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="sellpoint" label="商品卖点" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip> </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button size="mini">查看</el-button>
            <el-button size="mini" class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" class="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!-- 分页功能 -->
      </el-table>
      <div class="page">
        <Mypage :pagesize="pagesize" :total="total" @changePage="changePage"></Mypage>
      </div>
    </div>

    <!-- 弹窗添加 -->
    <GoodsDialog ref="sameVue" :rowData="rowData" @changedialogVisible="changedialogVisible" :dialogVisible="dialogVisible" @chengeDialogVisible="chengeDialogVisible"></GoodsDialog>
  </div>
</template>

<script>
import GoodsDialog from '@/views/goods/GoodsDialog.vue'
import Mypage from '@/components/Mypage.vue'
export default {
  components: {
    Mypage,
    GoodsDialog
  },
  data() {
    return {
      input: '',
      tableData: [],
      pagesize: 1,
      total: 0,
      dialogVisible: false,
      rowData: {}
    }
  },
  methods: {
    //子集改变弹窗效果
    changedialogVisible() {
      this.dialogVisible = false
    },
    //弹窗
    chengeDialogVisible() {
      this.dialogVisible = false
      this.$refs.sameVue.title = '添加商品'
    },
    changedig() {
      this.dialogVisible = true
    },
    //编辑操作
    handleEdit(index, row) {
      this.dialogVisible = true
      this.$refs.sameVue.title = '编辑商品'
      this.rowData = { ...row } //使数据一直在改变
    },
    //删除操作
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api
            .deleteGooods({
              id: row.id
            })
            .then(({ data: res }) => {
              if (res.status === 200) {
                this.user(1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              } else {
                this.$message({
                  type: 'success',
                  message: '删除失败!'
                })
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //分页的函数
    changePage(num) {
      this.user(num)
    },
    //封装函数
    user(page) {
      this.$api.getGoodsList({ page }).then(({ data: res }) => {
        if (res.status === 200) {
          this.tableData = res.data
          this.pagesize = res.pageSize
          this.total = res.total
        }
      })
    },
    //搜索函数
    searchInp(val) {
      this.$api
        .getGearch({
          search: val
        })
        .then(({ data: res }) => {
          console.log(res)
          if (res.status === 200) {
            this.tableData = res.result
            //结果需要分页
            this.total = res.result.length
          } else {
            this.tableData = []
          }
          this.input=''
        })
    }
  },
  created() {
    this.user(1)
  }
}
</script>

<style lang="less" scoped>
.goods {
  height: 700px;
  margin: 20px;
  .header {
    display: flex;
    margin-bottom: 20px;
    button {
      margin-left: 20px;
    }
  }
  .wrapper {
    position: relative;
    .page {
      position: absolute;
      bottom: -50px;
      right: 30px;
    }
  }
}
</style>
