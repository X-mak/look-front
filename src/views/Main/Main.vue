<template>
  <div>
    <div>banner</div>
    <div class="course-part">
      <el-card style="width: 80%; margin: 10px auto" shadow="never">
        <template #header>
          <div class="card-header">
            <span>最近更新</span>
            <el-button
              size="default"
              @click="loadRecent"
              circle
              style="margin-left: 10%"
            >
              <el-icon :size="15"><refresh /></el-icon>
            </el-button>
          </div>
        </template>
        <index-show-course :courses="this.recentCourse" />
      </el-card>
    </div>

    <div class="course-part">
      <el-card style="width: 80%; margin: 10px auto" shadow="never">
        <template #header>
          <div class="card-header">
            <span>热门课程</span>
            <el-button
              size="default"
              @click="loadHot"
              circle
              style="margin-left: 10%"
            >
              <el-icon :size="15"><refresh /></el-icon>
            </el-button>
          </div>
        </template>
        <index-show-course :courses="this.hotCourse" />
      </el-card>
    </div>

    <div class="course-part">
      <el-card style="width: 80%; margin: 10px auto" shadow="never">
        <template #header>
          <div class="card-header">
            <span>热门分类</span>
          </div>
        </template>
        <el-row>
          <div v-for="item in this.hotClass" class="class-list">
            <el-button
              type="info"
              round
              style="width: 200%; height: 120%"
              @click="goClass(item)"
              ><p>{{ item }}</p></el-button
            >
          </div>
        </el-row>
      </el-card>
    </div>

    <div class="course-part">
      <el-card style="width: 80%; margin: 10px auto" shadow="never">
        <template #header>
          <div class="card-header">
            <span>免费课程</span>
            <el-button
              size="default"
              @click="loadFree"
              circle
              style="margin-left: 10%"
            >
              <el-icon :size="15"><refresh /></el-icon>
            </el-button>
          </div>
        </template>
        <index-show-course :courses="this.freeCourse" />
      </el-card>
    </div>
    <index-footer/>
  </div>
</template>

<script>
import IndexShowCourse from "../../components/IndexPart/IndexShowCourse.vue";
import IndexFooter from "../../components/IndexPart/IndexFooter.vue";
import request from "../../utils/request";
import { Refresh } from "@element-plus/icons-vue";

export default {
  name: "",
  components: { IndexShowCourse, Refresh ,IndexFooter },
  data() {
    return {
      recentCourse: [],
      hotCourse: [],
      freeCourse: [],
      hotClass: ["美妆", "手工", "音乐", "职业技能"],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.loadRecent();
      this.loadHot();
      this.loadFree();
    },
    loadRecent() {
      request({
        url: "course/list",
        method: "get",
        params: { order: "date" },
      }).then((res) => {
        this.recentCourse = res.data;
      });
    },
    loadHot() {
      request({
        url: "course/list",
        method: "get",
        params: { order: "hot" },
      }).then((res) => {
        this.hotCourse = res.data;
      });
    },
    loadFree() {
      request({
        url: "course/list",
        method: "get",
        params: { order: "free" },
      }).then((res) => {
        this.freeCourse = res.data;
      });
    },
    goClass(item) {
      this.$router.push({
        path: "/search",
        query: {
          keyword:item,
        },
      });
    },
  },
};
</script>

<style scoped>
.course-part {
  margin: 3% 0;
}
.class-list {
  margin: 0 5%;
}
</style>
