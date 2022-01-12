<template>
  <el-form
    style="max-width: 320px;height:36%;margin:0 auto;position:relative;top:150px;"
    label-width="100px"
    label-position="top"  
    hide-required-asterisk
    :model="form"
    :rules="rules"
  >
    <el-form-item 
      label="用户名" prop="userName"  
    >
      <el-input v-model="form.userName" type="text"></el-input>
    </el-form-item>
    <el-form-item 
      label="密码" prop="pwd"
    >
      <el-input v-model="form.pwd" type="password" @keyup.enter.native="login"></el-input>
    </el-form-item>
    <el-button type="primary" size="default" @click="login">登录</el-button>
    <el-row>
      <p>没有账号?点此</p>
      <el-button type="text" size="default" @click="goRegister">注册</el-button>
    </el-row>
   
    
  </el-form>
</template>

<script>
import { ElMessage } from 'element-plus'
import request from '../utils/request';


const open = (msg,type) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: type,
  })
}

export default {
  data(){
    return{
      form:{},
      rules:{
        userName:[{ required: true,message: '用户名不能为空',trigger: 'blur',}],
        pwd:[{ required: true,message: '密码不能为空',trigger: 'blur',}]
      }
    }
  },
  methods: {
    login(){
      if(this.form.userName == null && this.form.pwd == null)
        open("账号或密码不能为空!",'warning');
      else{
        request({
          url:'/user/check',
          method:'get',
          params:{userName:this.form.userName,pwd:this.form.pwd}
        }).then((res)=>{
          this.form.pwd = "";
          if(res.code === "200"){
            open(res.msg,'success');
            sessionStorage.setItem("token",res.data.token);
            this.$store.commit('SET_USER', res.data);
            this.$router.push('/');
          }else{
            open(res.msg,'warning');
          }
      })
      }
    },

    goRegister(){
      this.$router.push('/register');
    }
  },
}
</script>

<style>

</style>