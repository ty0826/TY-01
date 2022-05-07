<template>
  <div>
    <el-menu :collapse="iscollapse" router default-active="2" class="el-menu-vertical-demo" background-color="#ccc" text-color="red" active-text-color="#ffd04b">
      <el-menu-item style="padding-left: 40px; font-size: 20px">
        <span slot="title"> </span>
        {{ iscollapse == false ? '后台管理系统' : '后台' }}
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-s-platform"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-help"></i>
          <span slot="title">规格参数</span>
        </template>
        <el-menu-item index="/specilFincon">规格与包装 </el-menu-item>
      </el-submenu>
      <el-menu-item index="/adv">
        <i class="el-icon-s-help"></i>
        <span slot="title">广告管理</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/list">订单列表</el-menu-item>
          <el-menu-item index="/back">退货订单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['iscollapse'],
  data() {
    return {}
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
