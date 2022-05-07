<template>
  <div class="spaciFicon">
    <!-- 目录位置 -->
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/params' }">规格参数</el-breadcrumb-item>
        <el-breadcrumb-item>规格与包装</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索框 -->
    <div class="sreach">
      <el-input v-model="input" placeholder="请输入内容" @change="steupParams"></el-input>
      <el-button type="primary" class="button">搜索</el-button>
      <el-button type="primary" @click="addParams">添加</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="规格参数ID" width="180"> </el-table-column>
        <el-table-column prop="itemCatId" label="类目ID" width="180"> </el-table-column>
        <el-table-column prop="specsName" label="规格名称"> </el-table-column>
        <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini">查看</el-button>
            <el-button size="mini" class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" class="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <Mypage :total="total" :pagesize="pageSize" @changePage="changePage"></Mypage>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="dialog">
      <paramsDialog ref="Mydialog"></paramsDialog>
    </div>
    <!-- //编辑弹窗 -->
        <updateParams ref="updataParmas"></updateParams>
  </div>
</template>

<script>
import Mypage from '@/components/Mypage.vue'
import paramsDialog from './paramsDialog.vue'
import updateParams from './updataParams.vue'
export default {
  components: {
    Mypage,
    paramsDialog,
    updateParams
  },
  data() {
    return {
      input: '',
      tableData: [],
      total: 10,
      pageSize: 1,
    }
  },
  methods: {
    //点击添加出现弹框
    addParams(){
      this.$refs.Mydialog.dialogVisible=true
    },
    //点击分页改变表格数据
    changePage(num) {
      this.http(num)
    },
    //封装函数
    http(page) {
      this.$api
        .getParams({
          page
        })
        .then(({ data: res }) => {
          if (res.status === 200) {
            this.tableData = res.data
            ;(this.total = res.total), (this.pageSize = res.pageSize)
          }
        })
    },
    //搜索按钮
    steupParams(val) {
      this.$api
        .paramsSreach({
          search: val
        })
        .then(({ data: res }) => {
          if (res.status === 200) {
            this.tableData = res.result
            //结果需要分页
            this.total = res.result.length
          } else {
            this.tableData = []
          }
          this.input = ''
        })
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
            .delectParams({
              id: row.id
            })
            .then(({ data: res }) => {
              if (res.status === 200) {
                this.http(1)
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
    //编辑操作
    handleEdit(index,row){
      console.log(index,row);
      this.$refs.updataParmas.dialogVisible=true
      this.$refs.updataParmas.ruleForm={...row}
    }
  },
  //生命周期函数获取表格数据
  created() {
    this.http(1)
  }
}
</script>

<style lang="less" scoped>
.header {
  padding: 20px;
}
.sreach {
  padding: 20px;
  display: flex;
  .button {
    margin-left: 15px;
  }
}
.table {
  padding: 20px;
  .page {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>
