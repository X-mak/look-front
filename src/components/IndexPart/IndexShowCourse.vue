<template>
  <div class="main">
    <el-card
      v-for="course in courses"
      shadow="hover"
      style="
        width: 220px;
        height: 240px;
        margin: -12px 2%;
        display: flex;
        justify-content: center;
      "
      class="card"
      @click="join(course)"
    >
      <div class="single-course">
        <el-image
          style="width: 150px; height: 120px; border-radius: 14px"
          :src="course.courseImg"
          fit="contain"
        ></el-image>
        <p style="margin-top:5%;margin-bottom:5%">{{ course.courseName }}</p>
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
  </div>
</template>

<script>

export default {
  props: ["courses"],
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
  },
};
</script>

<style scoped>
.subcontent{
   color: rgba(184, 184, 184);font-size: small;
}

.single-course{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main{
    display:flex;
    flex-direction: row;
    width: 100%;
    margin: 20px auto;
    background-color: rgba(214, 236, 251, 0.6);
    border-radius:40px;
    
}
.card p {
  color: rgba(59, 59, 59, 0.8);
  margin-top: 4%;
  font-size:18px;
}
.card :hover p {
  color: rgb(148, 223, 241, 0.8);
}
.card {
  cursor: pointer;
}
</style>
