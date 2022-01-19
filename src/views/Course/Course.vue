<template>
  <index-header></index-header>
  <el-row style="display: flex; justify-content: flex-end">
    <el-card>
      <div slot="header">
        <span><!-- card title --></span>
      </div>
      <!-- card body -->
      <el-avatar :src="this.publisher.userImg"></el-avatar>
      <span>{{ this.publisher.userName }}</span>
    </el-card>
  </el-row>
  <el-card
    shadow="always"
    style="width: 1200px; height: 500px; margin: -20px auto"
  >
    <div style="display: flex; flex-direction: row">
      <el-image
        style="width: 500px; height: 400px"
        :src="this.course.courseImg"
        fit="contain"
      ></el-image>
      <div style="display: flex; flex-direction: column;margin:50px;align-items:baseline">
        <p style="font-size:40px">{{ this.course.courseName }}</p>
        <el-button type="primary" size="default" v-if="!valid" @click="buy" 
          >购买课程</el-button
        >
        <el-button type="primary" size="default" v-else @click="enterClass"
          >进入课程</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
import IndexHeader from "../../components/IndexPart/IndexHeader.vue";
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
  name: "",
  components: { IndexHeader },
  data() {
    return {
      courseId: 0,
      course: {},
      userInfo: {},
      valid: false,
      publisher: {},
      LoginUser: {},
    };
  },
  created() {
    this.courseId = this.$route.query.id;
    setTimeout(() => {
      this.LoginUser = this.$store.getters.getUser;
      this.userInfo = this.LoginUser.userInfo;
      this.load();
    });
  },
  methods: {
    load() {
      request({
        url: "/course/" + this.courseId,
        method: "get",
      }).then((res) => {
        this.course = res.data;
        this.publisher = res.data.userInfo;
      });
      request({
        url: "/manage/course/" + this.courseId,
        method: "get",
        params: { userAccount: this.userInfo.userAccount },
      }).then((res) => {
        if (res.code === "400") this.valid = false;
        else this.valid = true;
      });
    },
    buy() {
      request({
        url: "/manage/course/" + this.courseId,
        method: "post",
        params: { userAccount: this.userInfo.userAccount },
      }).then((res) => {
        if (res.code === "400") {
          open(res.msg, "warning");
        } else {
          open(res.msg, "success");
        }
      });
      this.load();
    },
    enterClass() {
      this.$router.push({
        path: "/course/video",
        query: {
          id: this.courseId,
        },
      });
    },
  },
};
</script>

<style scoped>
</style>
