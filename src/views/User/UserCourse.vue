<template>
<div style="display: flex; flex-direction: column;width:1500px">
  <el-space wrap >
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
import request from "../../utils/request"
export default {
  name: "",
  data() {
    return {
      LoginUser:{},
      userInfo:{},
      pageNum:1,
      courses:[],
      total:1,
    };
  },
  created() {
    setTimeout(()=>{
      this.LoginUser = this.$store.getters.getUser;
      this.userInfo = this.LoginUser.userInfo;
      this.load();
    })
  },
  methods: {
    load(){
      request({
        url:"/course/bought/"+this.pageNum,
        method:"get",
        params:{userAccount:this.userInfo.userAccount,pageSize:3},
      }).then((res)=>{
        this.courses = res.data;
        this.total = parseInt(res.msg);
      })
    },
    join(course){

    },
    changePage(page){
      this.pageNum = page;
      this.load();
    }
  },
};
</script>

<style scoped>
</style>
