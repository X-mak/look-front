<template>
  <div>教师后台</div>
  <el-button type="primary" size="default" @click="uploadClass"
    >上传课程</el-button
  >
  <!-- 上传界面 -->
  <el-dialog
    v-model="dialogVisible"
    title="上传视频"
    width="30%"
    @closed="cancelClass"
    top="50px"
  >
    <el-form label-width="120px" label-position="left">
      <el-form-item label="课程标题:">
        <el-input
          type="text"
          style="width: 200px"
          v-model="this.class.courseName"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程封面:">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/files/video-img"
          accept="image/*"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :multiple="false"
          limit:1
        >
          <img
            v-if="this.class.courseImg"
            :src="this.class.courseImg"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="课程视频" size="default">
        <el-upload
          class="upload-demo"
          action="http://localhost:8080/files/video"
          accept="video/*"
          :multiple="false"
          :limit="1"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
        >
          <el-button type="primary">点此选择视频文件</el-button>
          <template #tip>
            <div class="el-upload__tip">视频文件不能大于500MB!</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="课程受众" size="default">
        <el-select
          v-model="this.courseClass.age"
          class="m-2"
          placeholder="课程受众"
        >
          <el-option v-for="item in this.age" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程类型" size="default">
        <el-select
          v-model="this.courseClass.subject"
          class="m-2"
          placeholder="课程类型"
        >
          <el-option v-for="item in this.subject" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelClass">返回</el-button>
        <el-button type="primary" @click="confirmClass">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import request from "../utils/request";
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
  data() {
    return {
      dialogVisible: false,
      imageUrl: "",
      videoUrl: "",
      userInfo: {},
      class: {},
      courseClass: {},
      age: ["小学", "初中", "高中", "大学", "其他"],
      subject: ["语文", "数学", "英语", "化学", "物理"],
    };
  },
  created() {
    setTimeout(() => {
      this.userInfo = this.$store.getters.getUser.userInfo;
    });
  },
  components: {
    Plus,
  },
  methods: {
    uploadClass() {
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res) {
      //头像上传成功
      if (res.code === "400") {
        open(res.msg, "warning");
      } else {
        this.class.courseImg = res.data;
        open(res.msg, "success");
      }
    },
    beforeAvatarUpload(file) {
      //图片上传前的检查
      if (file.type.indexOf("image") === -1) {
        open("请上传图片!", "warning");
        return false;
      } else if (file.size > 800000) {
        open("上传的图片过大!", "warning");
        return false;
      }
    },
    handleVideoSuccess(res) {
      //视频上传成功
      if (res.code === "400") {
        open(res.msg, "warning");
      } else {
        this.class.courseVideo = res.data;
        open(res.msg, "success");
      }
    },
    beforeVideoUpload(file) {
      //视频上传前的检查
      if (file.type.indexOf("video") === -1) {
        open("请上传图片!", "warning");
        return false;
      } else if (file.size > 500000000) {
        open("上传的图片过大!", "warning");
        return false;
      }
    },
    cancelClass() {
      //取消提交
      this.dialogVisible = false;
    },
    confirmClass() {
      //确认提交
      if (this.class.courseName === "" || this.class.courseName == null) {
        open("课程名不能为空!", "warning");
      } else if (
        this.class.courseVideo === "" ||
        this.class.courseVideo == null
      ) {
        open("课程视频不能为空!", "warning");
      } else if (this.class.courseImg === "" || this.class.courseImg == null) {
        open("课程封面不能为空!", "warning");
      } else if (this.courseClass.age == null) {
        open("课程分类不能为空!", "warning");
      } else if (this.courseClass.subject == null) {
        open("课程分类不能为空!", "warning");
      } else {
        this.class.courseClass = this.courseClass;
        request({
          url: "/course",
          method: "post",
          data: this.class,
          params: { userAccount: this.userInfo.userAccount },
        }).then((res) => {
          if (res.code === "400") {
            open(res.msg, "warning");
          } else {
            open(res.msg, "success");
            this.dialogVisible = true;
          }
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
