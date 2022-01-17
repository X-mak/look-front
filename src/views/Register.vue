<template>
  <el-form
    style="
      max-width: 320px;
      height: 36%;
      margin: 0 auto;
      position: relative;
      top: 150px;
    "
    label-width="100px"
    label-position="left"
    hide-required-asterisk
    :model="form"
    :rules="rules"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" type="text"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input v-model="form.pwd" type="password"></el-input>
    </el-form-item>
    <el-form-item label="重复密码" prop="repwd">
      <el-input v-model="form.repwd" type="password"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" prop="name">
      <el-input v-model="form.name" type="text"></el-input>
    </el-form-item>
    <el-form-item label="用户角色" prop="role">
      <el-select v-model="form.role" placeholder="请选择角色">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-button type="primary" size="default" @click="register">注册</el-button>
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
  data() {
    const confirm = (rule, value, callback) => {
      if (value != this.form.pwd) callback(new Error("前后两次密码不一致!"));
      else callback();
    };
    return {
      form: {},
      rules: {
        username: [
            { required: true,message: '用户名不能为空',trigger: 'blur' } ,     
        ],
        pwd : [
            { required: true,message: '密码不能为空',trigger: 'blur' } ,    
        ],
        name : [
            { required: true,message: '用户昵称不能为空',trigger: 'blur' } ,    
        ],
        role : [
            { required: true,message: '用户角色不能为空',trigger: 'blur' } ,    
        ],
        repwd: [
            { required: true,message: '密码不能为空',trigger: 'blur' } ,    
          {
            validator: confirm,
            trigger: "blur",
          },
        ],
      },
      options: [
        {
          value: "1",
          label: "普通用户",
        },
        {
          value: "3",
          label: "教师",
        },
        {
          value: "4",
          label: "管理员",
          //disabled: true,
        },
      ],
    };
  },
  methods: {
    register() {
        if(this.form.username == undefined || this.form.pwd == undefined || this.form.repwd == undefined || this.form.name == undefined || this.form.role == undefined || this.form.pwd != this.form.repwd){
            open("请填写完整的注册信息!","warning");
            if(this.form.pwd != this.form.repwd){
                this.form.repwd = "";
            }
        }else{
            var req = {
                "userAccount":{
                    "userAccount":this.form.username,
                    "userPassword":this.form.pwd
                },
                "userInfo":{
                    "userAccount":this.form.username,
                    "userName":this.form.name,
                },
                "roleName":this.form.role
            }
            request({
                url:"/user",
                method:"post",
                data:req,               
            }).then((res)=>{
                if(res.code === "400"){
                    open(res.msg,"warning");
                    this.form={}
                }else{
                    open(res.msg,"success");
                    this.$router.push("/login");
                    this.form={}
                }
            })
        }
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>
