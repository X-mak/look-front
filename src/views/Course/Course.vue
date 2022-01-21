<template>
  <index-header></index-header>

  <el-card
    shadow="always"
    style="width: 1200px; height: 500px; margin: 60px auto"
  >
    <div style="display: flex; flex-direction: row">
      <el-image
        style="width: 500px; height: 400px"
        :src="this.course.courseImg"
        fit="contain"
      ></el-image>
      <div
        style="
          display: flex;
          flex-direction: column;
          margin: 50px;
          align-items: baseline;
        "
      >
        <p style="font-size: 40px;">课程名: {{ this.course.courseName }}</p>
        <p style="font-size: 20px">发布人:</p>
        <el-card>
          <!-- card body -->
          <div style="display: flex; align-items: center">
            <el-avatar :src="this.publisher.userImg"></el-avatar>
            <span style="font-size: 20px; margin: 0 30px">{{
              this.publisher.userName
            }}</span>
          </div>
        </el-card>
        <el-row style="display:flex;align-items:center">
          <p style="font-size: 20px">价格:</p>

   
            <span style="font-size: 18px">{{ this.course.cost }}</span>
          <el-icon :size="30" style=""><coin /></el-icon>
        </el-row>

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
import { Coin } from "@element-plus/icons-vue";

const open = (msg, type) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: type,
  });
};
export default {
  name: "",
  components: { IndexHeader, Coin },
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
        else {
          this.valid = true;
        }
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
p{
  margin:20px 0;
}
</style>
