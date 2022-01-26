<template>
  <IndexHeader></IndexHeader>
  <div
    style="
      width: 180vh;
      margin: 0 auto;
      background-color: rgb(157, 218, 149, 0.6);
    "
  >
    <el-card class="box-card">
      <template #header>
        <div class="card-header" style="display: flex; align-items: center">
          <el-avatar :size="50" :src="this.watchingUser.userImg"></el-avatar>
          <div style="margin-left: 2%;display:flex;flex-direction:column">
            <span style="font-size: large;">{{
              this.watchingUser.userName
            }}</span>
            <span style="font-size: small;">粉丝数:{{this.watchingUser.fans}}</span>
          </div>

          <el-button class="button" type="primary" style="margin-left: 2%"
            >关注</el-button
          >
        </div>
      </template>
      <div>
        <span>TA的课程</span>
      </div>
    </el-card>
    <course-list
      :courses="this.courses"
      @changePage="changePage"
      :total="this.total"
    ></course-list>
  </div>
</template>

<script>
import request from "../../utils/request";
import IndexHeader from "../../components/IndexPart/IndexHeader.vue";
import { ElMessage } from "element-plus";
import CourseList from "../../components/Course/CourseList.vue";
const open = (msg, type) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: type,
  });
};
export default {
  name: "",
  components: { IndexHeader, CourseList },
  data() {
    return {
      userAccount: "",
      watchingUser: {},
      pageNum: 1,
      courses: [],
      total: 0,
    };
  },
  created() {
    this.userAccount = this.$route.params.account;
    this.loadUser();
    this.loadPage();
  },
  methods: {
    loadUser() {
      request({
        url: "/user",
        params: { userAccount: this.userAccount },
      }).then((res) => {
        if (res.msg === "400") {
          this.$router.push("/main");
          open("用户不存在!", "warning");
        } else {
          this.watchingUser = res.data.userInfo;
        }
      });
    },
    loadPage() {
      request({
        url: "/course/publish/" + this.userAccount + "/" + this.pageNum,
        params: { status: 1, pageSize: 3 },
      }).then((res) => {
        this.courses = res.data;
        this.total = parseInt(res.msg);
      });
    },
    changePage(page) {
      this.pageNum = page;
      this.loadPage();
    },
  },
};
</script>

<style scoped>
</style>
