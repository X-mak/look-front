<template>
  <div style="display: flex; flex-direction: column; width: 1500px">
    <el-space wrap>
      <el-card
        v-for="course in courses"
        style="
          width: 250px;
          height: 250px;
          margin: 10px 0;
          display: flex;
          justify-content: center;
        "
        @click="join(course)"
      >
        <div class="single-course">
          <el-image
            style="width: 150px; height: 130px"
            :src="course.courseImg"
            fit="contain"
          ></el-image>
          <p>{{ course.courseName }}</p>
          <div class="subcontent">
            <div>
              <span>热度:{{ course.clicks }}</span
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>发布人:{{ course.userName }}</span>
            </div>
            <span>发布时间:</span><br /><span>{{ course.publishDate }}</span>
          </div>
        </div>
      </el-card>
    </el-space>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="3"
      :pager-count="7"
      @current-change="changePage"
      style="align-self: center"
    ></el-pagination>
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  name: "",
  data() {
    return {
      LoginUser: {},
      userInfo: {},
      pageNum: 1,
      courses: [],
      total: 1,
    };
  },
  created() {
    setTimeout(() => {
      this.LoginUser = this.$store.getters.getUser;
      this.userInfo = this.LoginUser.userInfo;
      this.load();
    });
  },
  methods: {
    load() {
      request({
        url: "/course/bought/" + this.pageNum,
        method: "get",
        params: { userAccount: this.userInfo.userAccount, pageSize: 3 },
      }).then((res) => {
        this.courses = res.data;
        this.total = parseInt(res.msg);
      });
    },
    join(course) {
      this.$router.push({
        path: "/course/video",
        query: {
          id: course.id,
        },
      });
    },
    changePage(page) {
      this.pageNum = page;
      this.load();
    },
  },
};
</script>

<style scoped>
.el-card p {
  color: rgba(59, 59, 59, 0.8);
  margin-top: 4%;
}
.el-card :hover p {
  color: rgb(148, 223, 241, 0.8);
}
.el-card {
  cursor: pointer;
}
.el-space p {
  text-align: center;
}
.subcontent{
   color: rgba(184, 184, 184);font-size: small;
}
</style>
