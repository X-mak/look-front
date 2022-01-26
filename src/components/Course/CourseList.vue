<template>
  <div style="display: flex; flex-direction: column">
    <el-space wrap>
      <el-card
        v-for="course in courses"
        style="
          width: 220px;
          height: 240px;
          margin: 30px 23px;
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
export default {
  props: ["courses", "total"],
  emits: ["changePage"],
  name: "",
  data() {
    return {};
  },
  methods: {
    join(course) {
      this.$router.push({
        path: "/course",
        query: {
          id: course.id,
        },
      });
    },
    changePage(page) {
      this.$emit("changePage", page);
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
