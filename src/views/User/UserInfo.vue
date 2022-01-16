<template>
  <el-form
    style="
      max-width: 50%;
      height: 36%;
      margin: 0 auto;
      position: relative;
      top: 120px;
    "
    label-width="200px"
    label-position="left"
  >
    <el-form-item label="用户头像:" size="default">
      <el-avatar :src="userInfo.userImg" @error="true">
        <img src="../../assets/img/NotFound.png" />
      </el-avatar>
    </el-form-item>

    <el-form-item label="用户账号:" prop="username">
      <el-input v-model="userInfo.userAccount" disabled type="text"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称:" prop="name">
      <el-input v-model="userInfo.userName" type="text"></el-input>
    </el-form-item>
    <el-form-item label="硬币数:" size="default">
      <el-input v-model="userInfo.coins" disabled type="text"></el-input>
    </el-form-item>
    <br />
    <el-button type="primary" size="default" v-if="!this.signed" @click="signIn"
      >签到</el-button
    >
    <el-button type="primary" size="default" v-else disabled>已签到</el-button>

    <el-button type="primary" size="default" @click="alterInfo"
      >修改当前信息</el-button
    >
    <el-button type="primary" size="default" @click="alterImg"
      >修改头像</el-button
    >
    <el-button type="primary" size="default" @click="alterPwd"
      >修改密码</el-button
    >
  </el-form>
  <!-- 修改头像 -->
  <change-img v-if="this.dialogImgVisible"  @imgVisible="imgVisible" @load="infoLoad" :userInfo="this.userInfo"></change-img>

  <!-- 修改密码 -->
  <change-pwd v-if="this.dialogPwdVisible" @pwdVisible="pwdVisible" :userInfo="this.userInfo"></change-pwd>
</template>

<script>
import request from "../../utils/request";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import ChangePwd from "../../components/User/ChangePwd.vue";
import ChangeImg from "../../components/User/ChangeImg.vue";
const open = (msg, type) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: type,
  });
};
export default {
  components: {
    Plus,
    ChangePwd,
    ChangeImg,
  },
  data() {
    return {
      LoginUser: {},
      userInfo: {},
      cpUserInfo: {},
      dialogImgVisible: false,
      dialogPwdVisible: false,
      signed: false,
      d:"",
    };
  },
  created() {
    setTimeout(() => {
      this.LoginUser = this.$store.getters.getUser;
      this.userInfo = this.LoginUser.userInfo;
      this.cpUserInfo = JSON.parse(JSON.stringify(this.userInfo));

      // 签到检查
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      if (month < 10) month = "0" + month;
      var day = date.getDate();
      if (day < 10) day = "0" + day;
      this.d = year + "-" + month + "-" + day;
      request({
        url: "/manage/sign",
        method: "get",
        params: { userAccount: this.userInfo.userAccount, date: this.d },
      }).then((res) => {
        if (res.code === "400") this.signed = true;
        else this.signed = false;
      });
    });
  },
  methods: {
    infoLoad(u){
      this.LoginUser = u;
      this.userInfo = u.userInfo;
    },
    load() {
      request({
        url: "/manage/sign",
        method: "get",
        params: { userAccount: this.userInfo.userAccount, date: this.d },
      }).then((res) => {
        if (res.code === "400") this.signed = true;
        else this.signed = false;
      });
    },
    pwdVisible(v){
      this.dialogPwdVisible = v;
    },
    imgVisible(v){
      this.dialogImgVisible = v;
    },
    signIn() {
      request({
        url: "/manage/sign/" + this.userInfo.userAccount,
        method: "post",
      }).then((res) => {
        if (res.code === "400") {
          open(res.msg, "warning");
        } else {
          open(res.msg, "success");
          this.load();
        }
      });
    },
    alterInfo() {
      if (this.userInfo.userName === "") {
        open("用户昵称不能为空!", "warning");
        this.load();
      } else if (this.cpUserInfo.userName === this.userInfo.userName) {
        open("您还没有修改信息!", "warning");
      } else {
        request({
          url: "/user/info",
          method: "put",
          data: this.userInfo,
        }).then((res) => {
          if (res.code === "400") {
            open(res.msg, "warning");
            this.load();
          } else {
            open(res.msg, "success");
          }
        });
      }
    },
    alterImg() {
      this.dialogImgVisible = true;
    },
    alterPwd(){
      this.dialogPwdVisible = true;
    },
    
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
