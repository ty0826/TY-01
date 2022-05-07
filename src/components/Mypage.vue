<template>
  <div class="block">
    <el-pagination  :page-size="pagesize" layout="total, prev, pager, next,jumper" :total="total" @current-change="changePage"> </el-pagination>
  </div>
</template>

<script>
export default {
  props:{
    pagesize:{
      default:10,
      type:Number
    },
    total:{
      default:100,
      type:Number
    }
  },
  methods:{
    changePage(page){
      this.$emit('changePage',page)
    }
  }
}
</script>

<style></style>
