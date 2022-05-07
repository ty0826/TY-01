<template>
  <div class="login-box">
    <div class="box">
      <div class="title">登录页面</div>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <el-form-item label="用户名：" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <div style="margin-top: 40px">
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" style="margin-left: 20px">提交</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import jwt from 'jwt-decode'
export default {
  data() {
    var validateusername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validateusername, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapMutations('loginModule',['setUser']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { username, password } = this.loginForm
          this.$api
            .loginPage({
              username,
              password
            })
            .then(({ data: res }) => {
              console.log('--------', res)
              if (res.status === 200) {
                console.log('登陆成功')
                console.log(jwt(res.data))
                let userFor = {
                  user: jwt(res.data).username,
                  token: res.data
                }
                //登录成功之后，存储登陆信息
                this.setUser(userFor)
                //存储本地
                localStorage.setItem('user',JSON.stringify(userFor))
                //跳转页面
                this.$router.push('/')
              } else {
                this.$message.error('账号或密码错误')
              }
            })
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
.login-box {
  background: url('../../assets/imgage/u=464193180,2840440799&fm=253&fmt=auto&app=138&f=JPEG.webp');
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.box {
  margin: 200px auto;
  width: 400px;
  height: 300px;
  border: 1px solid #302d2d;
  box-shadow: 0 0 0 0.3;
  background-color: rgba(224, 191, 191, 0.5);
  padding: 20px;
  .title {
    color: rgb(230, 100, 100);
    font-size: 30px;
    text-align: center;
    margin-bottom: 40px;
  }
}
</style>
