<template style="display:flex;">
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
    :model="LoginUser"
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
    <el-button type="primary" size="default" @click="signIn">签到</el-button>
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

  <!-- 修改头像的消息框 -->
  <el-dialog
    v-model="dialogImgVisible"
    title="修改头像"
    width="40%"
    @closed="cancelImg"
  >
    <el-form label-width="200px" label-position="left" :model="LoginUser">
      <el-form-item label="原头像:">
        <el-avatar :src="userInfo.userImg" @error="true">
          <img src="../../assets/img/NotFound.png" />
        </el-avatar>
      </el-form-item>
      <el-form-item label="新头像:">
        <el-upload
          class="avatar-uploader"
          accept="image/*"
          action="http://localhost:8080/files/user-img"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :multiple="false"
          limit="1"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelImg">返回</el-button>
        <el-button type="primary" @click="confirmImg">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 修改密码的消息框 -->
  <el-dialog
    v-model="dialogPwdVisible"
    title="修改密码"
    width="40%"
    @closed="cancelPwd"
  >
    <el-form label-width="200px" label-position="left" :model="LoginUser">
      <el-form-item label="原密码:">
        <el-input v-model="userPwd.old" type="text"></el-input>
      </el-form-item>
      <el-form-item label="新密码:">
        <el-input v-model="userPwd.pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码:" size="default">
        <el-input v-model="userPwd.rePwd" type="password"></el-input>
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
import { Plus } from "@element-plus/icons-vue";
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
  },
  data() {
    return {
      LoginUser: {},
      userInfo: {},
      cpUserInfo: {},
      userPwd: {},
      imageUrl: "",
      dialogImgVisible: false,
      dialogPwdVisible: false,
    };
  },
  created() {
    setTimeout(() => {
      this.LoginUser = this.$store.getters.getUser;
      this.userInfo = this.LoginUser.userInfo;
      this.cpUserInfo = JSON.parse(JSON.stringify(this.userInfo));
    });
  },
  methods: {
    load() {
      request({
        url: "/user/confirm",
        method: "get",
      }).then((res) => {
        this.LoginUser = res.data;
        this.userInfo = this.LoginUser.userInfo;
      });
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
    cancelImg() {
      this.dialogImgVisible = false;
    },
    confirmImg() {
      if (this.imageUrl === "") {
        open("请上传头像!", "warning");
      } else {
        let req = {
          userAccount: this.userInfo.userAccount,
          userImg: this.imageUrl,
        };
        request({
          url: "/user/info",
          method: "put",
          data: req,
        }).then((res) => {
          if (res.code === "400") {
            open(res.msg, "warning");
          } else {
            open(res.msg, "success");
            this.dialogImgVisible = false;
            this.imageUrl = "";
            this.load();
          }
        });
      }
    },
    alterPwd() {
      this.dialogPwdVisible = true;
    },
    cancelPwd() {
      this.userPwd = {};
      this.dialogPwdVisible = false;
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
    handleAvatarSuccess(res) {
      if (res.code === "400") {
        open(res.msg, "warning");
      } else {
        this.imageUrl = res.data;
        open(res.msg, "success");
      }
    },
    beforeAvatarUpload(file) {
      if (file.type.indexOf("image") === -1) {
        open("请上传图片!", "warning");
        return false;
      } else if (file.size > 800000) {
        open("上传的图片过大!", "warning");
        return false;
      }
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
