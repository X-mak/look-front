<template>
  <div style="display: flex; flex-direction: column">
    <div>搜索页面</div>
    <el-row>
      <el-button type="text" size="default" @click="timeOrder"
        >按时间排序</el-button
      >
      <el-button type="text" size="default" @click="hotOrder"
        >按热度排序</el-button
      ></el-row
    >
    <el-row>
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
      <el-button type="text" size="default" @click="cleanAge">清空</el-button>
    </el-row>
    <el-row>
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
      <el-button type="text" size="default" @click="cleanSubject"
        >清空</el-button
      >
    </el-row>
    <el-space wrap>
      <el-card
        v-for="course in courses"
        style="
          width: 250px;
          height: 250px;
          margin: 20px 30px;
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
export default {
  name: "",
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
.el-card :hover p {
  color: aqua;
}
.el-card {
  cursor: pointer;
}
.el-space p {
  text-align: center;
}
</style>
