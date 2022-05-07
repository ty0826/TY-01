<template>
  <div>
    <!-- 头部导航 -->
    <div class="header">
      <i v-if="!isCollapse" class="el-icon-s-fold" @click="sub" style="cursor: pointer"></i>
      <i v-else @click="sub" class="el-icon-s-unfold" style="cursor: pointer"></i>
      <div class="header-right">
        <el-dropdown>
          <span class="el-dropdown-link" style="color: #fff; cursor: pointer"> 多语言<i class="el-icon-arrow-down el-icon--right"></i> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>简体中文</el-dropdown-item>
            <el-dropdown-item>English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="contensts">
          <span>欢迎：{{ userInfor.user }}</span>
          <i class="el-icon-switch-button" @click="loginOut"></i>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('loginModule', ['userInfor'])
  },
  props: ['isCollapse'],
  methods: {
    ...mapMutations('loginModule', ['clearUser']),
    sub() {
      this.$emit('change')
    },
    loginOut() {
      //清空数据
      this.clearUser()
      localStorage.removeItem('user')
      //跳转页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  // width: 1336px;
  height: 60px;
  background: rgba(132, 107, 241, 0.91);
  line-height: 60px;
  font-size: 30px;
  li {
    cursor: pointer;
  }
  .header-right {
    display: flex;
    float: right;
    margin-right: 20px;
    color: #fff;
    font-size: 15px;
  }
  .contensts {
    cursor: pointer;
    margin-left: 50px;
    display: flex;
    span {
      margin-right: 20px;
    }
    .el-icon-switch-button {
      font-size: 35px;
      line-height: 60px;
    }
  }
}
</style>
