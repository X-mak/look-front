<template>
  <el-dialog
    v-model="dialogPwdVisible"
    title="修改密码"
    width="40%"
    @closed="cancelPwd"
  >
    <el-form
      label-width="120px"
      label-position="left"
      style="width: 320px; margin: 0 auto"
    >
      <el-form-item label="原密码:">
        <el-input
          v-model="userPwd.old"
          type="text"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码:">
        <el-input
          v-model="userPwd.pwd"
          type="password"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="重复新密码:" size="default">
        <el-input
          v-model="userPwd.rePwd"
          type="password"
          style="width: 200px"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelPwd">返回</el-button>
        <el-button type="primary" @click="confirmPwd">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import request from "../../utils/request";
import { ElMessage } from "element-plus";
const open = (msg, type) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: type,
  });
};
export default {
  emits: ["pwdVisible"],
  props: ["userInfo"],
  data() {
    return {
      userPwd: {},
      dialogPwdVisible: true,
    };
  },
  methods: {
    alterPwd() {
      this.dialogPwdVisible = true;
    },
    cancelPwd() {
      this.userPwd = {};
      this.dialogPwdVisible = false;
      this.$emit("pwdVisible", this.dialogPwdVisible);
    },
    confirmPwd() {
      if (this.userPwd.pwd != this.userPwd.rePwd) {
        open("两次输入的密码不一致!", "warning");
        this.userPwd.rePwd = "";
      } else {
        let account = {
          userAccount: this.userInfo.userAccount,
          userPassword: this.userPwd.old,
        };
        request({
          url: "/user/pwd",
          method: "put",
          data: account,
          params: { newPwd: this.userPwd.pwd },
        }).then((res) => {
          if (res.code === "400") {
            open(res.msg, "warning");
            this.userPwd = {};
          } else {
            open(res.msg, "success");
            this.userPwd = {};
            this.dialogPwdVisible = false;
          }
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
