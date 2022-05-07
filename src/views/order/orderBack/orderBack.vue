<template>
  <div class="table">
    <h1 style="background-color:'pink">退货订单列表</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="用户id" width="180"> </el-table-column>
      <el-table-column prop="title" label="标题" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="num" label="数量"> </el-table-column>
      <el-table-column prop="user" label="用户信息"> </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button size="mini">查看</el-button>
          <el-button size="mini" class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" class="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      tableData: [],
      total:10,
      pageSize:1
    }
  },
  methods: {
    http(page) {
      this.$api
        .getUserList({
          page
        })
        .then(({ data: res }) => {
          console.log(res)
          if (res.status === 200) {
            this.tableData = res.data.list
          }
        })
    }
  },
  created() {
    this.http()
  }
}
</script>

<style lang="less" scoped>
.table {
  margin-top: 20px;
  padding: 20px;

}
</style>
