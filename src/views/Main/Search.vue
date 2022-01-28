<template>
  <div style="display: flex; flex-direction: column; width: 180vh;margin:10px auto;">
    <div style="margin: 0 auto; width: 1200px">
      <el-row style="margin: 0 auto; width: 600px">
        <div style="display: flex; align-items: center">
          <el-icon :size="16"><clock /></el-icon>
          <el-button type="text" size="default" @click="timeOrder"
            >最新发布</el-button
          >
        </div>
        <div style="display: flex; align-items: center; margin-left: 40px">
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
      <el-row style="margin: 5px auto; width: 600px">
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
          v-if="this.subjectList.length!=0"
          >清空</el-button
        >
      </el-row>
      <hr style="margin-top: 10px" />
    </div>
    <course-list
      :courses="this.courses"
      @changePage="changePage"
      :total="this.total"
    ></course-list>
  </div>
</template>

<script>
import request from "../../utils/request";
import { Clock, HotWater } from "@element-plus/icons-vue";
import CourseList from "../../components/Course/CourseList.vue";
export default {
  name: "",
  components: { Clock, HotWater, CourseList },
  data() {
    return {
      pageNum: 1,
      courses: [],
      keyword: "",
      order: "",
      total: 0,
      ageList: ["兴趣爱好", "职业技能"],
      subjectList:[],
      hobbyList: ["音乐","游戏","棋类","运动","美术"],
      skillList:["管理","计算机","会计","数学","职业意见"],
      age: "",
      subject: "",
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.load();
  },
  methods: {
    load() {
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
    searchByClass(name) {
      if(name.target.value == "职业技能"){
        this.subjectList = this.skillList;
      }else if(name.target.value == "兴趣爱好"){
        this.subjectList = this.hobbyList;
      }
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
};
</script>

<style scoped>
</style>
