<template>
  <IndexHeader></IndexHeader>
  <div>{{ this.watchingUser }}</div>

  <course-list
    :courses="this.courses"
    @changePage="changePage"
    :total="this.total"
  ></course-list>
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
