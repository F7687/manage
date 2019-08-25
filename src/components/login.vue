<template>
  <div class="login">
  <el-form  :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm container">
    <img src="../assets/avatar.jpg" alt="" class="avatar">
  <el-form-item label="用户名" prop="username" >
    <el-input v-model="loginForm.username" prefix-icon="myicon-user myicon" placeholder="请输入用户名"></el-input>
  </el-form-item>
   <el-form-item label="密　码" prop="password" >
    <el-input v-model="loginForm.password" placeholder="请输入用户密码" prefix-icon="myicon-key myicon"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" class="login-btn" @click="login">登陆</el-button>
    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
  </el-form-item>
</el-form>
  </div>
</template>
<script>
import { login } from '@/api/login.js'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 实现二次验证
      // console.log(this.$refs.loginForm.validate);
      // console.log(this.$message);
      this.$refs.loginForm.validate((data) => {
        if (data) {
          login(this.loginForm)
            .then((res) => {
              console.log(res)
              if (res.data.meta.status === 200) {
                // token令牌做导航守卫
                localStorage.setItem('itcast', res.data.data.token)
                // localStorage.setItem('lastname', 'Smith')
                this.$message({ message: res.data.meta.msg, type: 'success' })
                this.$router.push({ name: 'index' })
              } else {
                this.$message({ message: res.data.meta.msg, type: 'error' })
              }
            })
            .catch(() => {
              this.$message({ message: '服务器异常，请稍后重试....', type: 'error' })
            })
        } else {
          this.$message({
            message: '请输入正确的用户名密码',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>
<style lang="less">
.login {
  margin: 0;
  padding: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 80px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -40px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
