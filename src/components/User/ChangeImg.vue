<template>
  <el-dialog
    v-model="dialogImgVisible"
    title="修改头像"
    width="40%"
    @closed="cancelImg"
  >
    <el-form
      label-width="120px"
      label-position="left"
      style="width: 420px; margin: 0 auto"
    >
      <el-form-item label="原头像:">
        <el-avatar
          :src="userInfo.userImg"
          @error="true"
          style="margin-left: 60px"
        >
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
          :limit="1"
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
  props: ["userInfo"],
  emits: ["load", "imgVisible"],
  components: {
    Plus,
  },
  data() {
    return {
      imageUrl: "",
      dialogImgVisible: true,
    };
  },
  methods: {
    load() {
      request({
        url: "/user/confirm",
        method: "get",
      }).then((res) => {
        this.$emit("load", res.data);
      });
    },
    cancelImg() {
      this.dialogImgVisible = false;
      this.$emit("imgVisible", this.dialogImgVisible);
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

<style scoped>
</style>
