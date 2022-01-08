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
      label="用户名" prop="username"  
    >
      <el-input v-model="form.username" type="text"></el-input>
    </el-form-item>
    <el-form-item 
      label="密码" prop="pwd"
    >
      <el-input v-model="form.pwd" type="password"></el-input>
    </el-form-item>
    <el-button type="primary" size="default" @click="login">登录</el-button>
  </el-form>
</template>

<script>
import { ElMessage } from 'element-plus'
import request from '../utils/request';
import { reactive, ref } from 'vue'

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
        username:[{ required: true,message: '用户名不能为空',trigger: 'blur',}],
        pwd:[{ required: true,message: '密码不能为空',trigger: 'blur',}]
      }
    }
  },
  methods: {
    login(){
      if(this.form.username == null && this.form.pwd == null)
        open("账号或密码不能为空!",'warning');
      else{
        request({
          url:'/user',
          method:'get',
          params:{username:this.form.username,pwd:this.form.pwd}
        }).then((res)=>{
          console.log(res);
          this.form = {};
          if(res.code === "200"){
            open(res.msg,'success');
            this.$router.push('/');
          }else{
            open(res.msg,'warning');
          }
      })
      }
    }
  },
}
</script>

<style>

</style>