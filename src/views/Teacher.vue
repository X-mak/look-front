<template>
  <el-button type="primary" size="default" @click="uploadClass"
    >上传课程</el-button
  >
  <!-- 上传界面 -->
  <!-- <el-dialog
    v-model="dialogVisible"
    title="上传视频"
    width="40%"
    @closed="cancelClass"
    top="50px"
  >
    <el-form label-width="120px" label-position="left" style="width:420px;margin:0 auto;">
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
          :limit="1"
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
  </el-dialog> -->
  <upload-course v-if="this.dialogVisible" @changeVisible="changeVisible" :userInfo="this.userInfo"></upload-course>



</template>

<script>
import request from "../utils/request";
import { ElMessage } from "element-plus";
import UploadCourse from "../components/Teacher/UploadCourse.vue";
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
      userInfo: {},
    };
  },
  created() {
    setTimeout(() => {
      this.userInfo = this.$store.getters.getUser.userInfo;
    });
  },
  components: {
    UploadCourse,
  },
  methods: {
    uploadClass() {
      this.dialogVisible = true;
    },
    changeVisible(v){
      this.dialogVisible = v;
    }
  },
};
</script>

<style scoped>
</style>
