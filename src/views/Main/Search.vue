<template>
  <div style="display: flex; flex-direction: column">
    <div style="margin: 0 auto; width: 1200px">
      <el-row style="margin: 0 auto; width: 600px">
        <div style="display: flex; align-items: center">
          <el-icon :size="16"><clock /></el-icon>
          <el-button type="text" size="default" @click="timeOrder"
            >最新发布</el-button
          >
        </div>
        <div style="display: flex; align-items: center;margin-left:40px;">
          <el-icon :size="16"><hot-water></hot-water></el-icon>
          <el-button type="text" size="default" @click="hotOrder"
            >热度最高</el-button
          >
        </div>
      </el-row>
      <el-row style="margin: 0 auto; width: 600px">
        <el-radio-group
          v-model="age"
          v-for="ageTier in this.ageList"
          size="default"
        >
          <el-radio-button
            :label="ageTier"
            @change="searchByClass"
          ></el-radio-button>
        </el-radio-group>
        <el-button
          type="text"
          size="default"
          @click="cleanAge"
          style="margin-left: 10px"
          >清空</el-button
        >
      </el-row>
      <el-row style="margin: 0 auto; width: 600px">
        <el-radio-group
          v-model="subject"
          v-for="subjectTier in this.subjectList"
          size="default"
        >
          <el-radio-button
            :label="subjectTier"
            @change="searchByClass"
          ></el-radio-button>
        </el-radio-group>
        <el-button
          type="text"
          size="default"
          @click="cleanSubject"
          style="margin-left: 10px"
          >清空</el-button
        >
      </el-row>
      <hr style="margin-top: 10px" />
    </div>

    <el-space wrap>
      <el-card
        v-for="course in courses"
        style="
          width: 250px;
          height: 250px;
          margin: 30px 25px;
          display: flex;
          justify-content: center;
        "
        @click="join(course)"
      >
        <div class="single-course">
          <el-image
            style="width: 150px; height: 150px"
            :src="course.courseImg"
            fit="contain"
          ></el-image>
          <p>{{ course.courseName }}</p>
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
import { Clock,HotWater } from "@element-plus/icons-vue";

export default {
  name: "",
  components: { Clock ,HotWater},
  data() {
    return {
      pageNum: 1,
      courses: [],
      keyword: "",
      order: "",
      total: 0,
      ageList: ["小学", "初中", "高中", "大学", "其他"],
      subjectList: [
        "语文",
        "数学",
        "英语",
        "化学",
        "历史",
        "政治",
        "物理",
        "地理",
      ],
      age: "",
      subject: "",
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    setTimeout(() => {
      this.load();
    });
  },
  methods: {
    load() {
      if (this.keyword == null) this.keyword = "";
      request({
        url: "/course/keyword/" + this.pageNum,
        method: "get",
        params: {
          keyword: this.keyword,
          order: this.order,
          age: this.age,
          subject: this.subject,
          pageSize: 3,
        },
      }).then((res) => {
        this.courses = res.data;
        this.total = parseInt(res.msg);
      });
    },
    changePage(page) {
      this.pageNum = page;
      this.load();
    },
    timeOrder() {
      this.order = "";
      this.load();
    },
    hotOrder() {
      this.order = "click";
      this.load();
    },
    join(course) {
      this.$router.push({
        path: "/course",
        query: {
          id: course.id,
        },
      });
    },
    searchByClass() {
      this.load();
    },
    cleanAge() {
      this.age = "";
      this.load();
    },
    cleanSubject() {
      this.subject = "";
      this.load();
    },
  },
  watch: {
    $route(to, from) {
      if (to.query.keyword != from.query.keyword) {
        this.keyword = to.query.keyword;
        this.load();
      }
    },
  },
};
</script>

<style scoped>
.el-card p {
  color: rgba(59, 59, 59, 0.8);
  margin-top: 12%;
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
</style>
