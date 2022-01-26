<template>
  <div style="width: 160vh; margin: 80px auto" class="demo-shadow">
    <el-menu mode="horizontal" default-active="2">
      <el-menu-item index="1" @click="hotOrder">按热度排序</el-menu-item>
      <el-menu-item index="2" @click="dateOrder">按时间排序</el-menu-item>
    </el-menu>
    <div
      v-if="valid == 1"
      style="
        display: flex;
        width: 160vh;
        margin: 30px auto;
        justify-content: center;
      "
    >
      <div
        style="
          margin: 0 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <el-avatar :size="50" :src="this.userInfo.userImg"></el-avatar>
        <div class="demo-rate-block">
          <span style="color: rgb(121, 120, 120, 0.8); font-size: 16px"
            >为本节课评分吧</span
          >
          <el-rate v-model="rank" :colors="colors" v-if="!ranked"> </el-rate>
          <el-rate v-model="rank" :colors="colors" disabled v-else> </el-rate>
        </div>
      </div>

      <el-input
        v-model="this.myComment.content"
        :rows="2"
        type="textarea"
        placeholder="Please input"
        :autosize="{ minRows: 3, maxRows: 4 }"
        style="width: 700px"
      />
      <el-button
        type="primary"
        size="default"
        @click="submitComment"
        style="margin: 0 20px; height: 70px"
        >发表评论</el-button
      >
    </div>
    <hr style="color: rgba(184, 184, 184, 0.3)" v-if="valid == 1" />
    <div style="width: 160vh; margin: 40px auto" v-for="item in allComments">
      <el-card class="box-card">
        <template #header>
          <div class="card-header" style="display: flex; align-items: center">
            <el-avatar
              icon="el-icon-user-solid"
              :src="item.userInfo.userImg"
              fit="fill"
            ></el-avatar>
            <span style="margin: 0 2%; font-size: 18px">{{
              item.userInfo.userName
            }}</span>
            <el-rate v-model="item.star" :colors="colors" disabled> </el-rate>
          </div>
        </template>
        <div class="text item">
          <span>{{ item.context }}</span>
        </div>
      </el-card>
    </div>
    <div style="display:flex">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="3"
        :pager-count="7"
        @current-change="changePage"
        style="margin:10px auto;"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  props: ["comment"],
  name: "",
  data() {
    return {
      order: "date",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      rank: 0,
      ranked: false,
      LoginUser: {},
      userInfo: {},
      courseId: 0,
      valid: 0,
      myComment: {},
      allComments: [],
      pageNum: 1,
      total:0
    };
  },
  created() {
    setTimeout(() => {
      this.courseId = this.comment[0];
      this.valid = this.comment[1];
      this.initialLoad();
      this.pageLoad();
    });
  },
  methods: {
    initialLoad() {
      this.LoginUser = this.$store.getters.getUser;
      this.userInfo = this.LoginUser.userInfo;
      request({
        url: "/course/comments/star",
        method: "get",
        params: {
          userAccount: this.userInfo.userAccount,
          courseId: this.courseId,
        },
      }).then((res) => {
        if (res.code === "200") {
          this.ranked = true;
          this.rank = res.data;
        }
      });
    },
    pageLoad() {
      request({
        url: "/course/comments/" + this.pageNum,
        method: "get",
        params: {
          id: this.courseId,
          userAccount: this.userInfo.userAccount,
          pageSize: 10,
          order: this.order,
        },
      }).then((res) => {
        this.allComments = res.data;
        this.total = parseInt(res.msg);
      });
    },
    hotOrder() {
      this.order = "hot";
    },
    dateOrder() {
      this.order = "date";
    },
    submitComment() {},
    changePage(page){
      this.pageNum = page;
    },
  },
};
</script>

<style scoped>
</style>
