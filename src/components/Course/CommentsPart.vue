<template>
  <div style="width: 1000px; margin: 80px auto" class="demo-shadow">
    <el-menu mode="horizontal" default-active="2">
      <el-menu-item index="1" @click="hotOrder">按热度排序</el-menu-item>
      <el-menu-item index="2" @click="dateOrder">按时间排序</el-menu-item>
    </el-menu>
    <div
      v-if="valid == 1"
      style="
        display: flex;
        width: 100%;
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
          <div
            v-if="!this.ranked"
            style="display: flex; flex-direction: column; align-items: center"
          >
            <span style="color: rgb(121, 120, 120, 0.8); font-size: 16px"
              >为本节课评分吧</span
            >
            <el-rate
              v-model="this.myComment.star"
              :colors="colors"
              v-if="!ranked"
            >
            </el-rate>
          </div>
          <div
            v-else
            style="display: flex; flex-direction: column; align-items: center"
          >
            <span style="color: rgb(121, 120, 120, 0.8); font-size: 16px"
              >感谢您对课程的评分</span
            >
            <el-rate v-model="this.myComment.star" :colors="colors" disabled>
            </el-rate>
          </div>
        </div>
      </div>

      <el-input
        v-model="this.myComment.context"
        :rows="2"
        type="textarea"
        placeholder="请写下您对此课程的评价吧!"
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
    <div style="width: 100%; margin: 40px auto" v-for="item in allComments">
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
            <div
              style="position: absolute; left: 78.5%; color: rgba(184, 184, 184)"
            >
              <div style="display: flex; align-items: center">
                <span style="margin-right: 5px">{{ item.hot }}</span>
                <img
                  src="../../assets/img/like.png"
                  style="width: 30px;cursor:pointer"
                  class="thumb"
                  @click="likeComment(item)"
                  v-if="item.liked"
                />
                <img
                  src="../../assets/img/like_hover.png"
                  style="width: 30px;cursor:pointer"
                  class="thumb"
                  v-else
                />
              </div>
            </div>
          </div>
        </template>
        <div class="text item">
          <span>{{ item.context }}</span>
        </div>
        <el-popconfirm title="您确认要删除此条评论吗?" v-if="item.own" @confirm="deleteComment(item)" style="cursor:pointer">
          <template #reference>
            <el-button
              type="danger"
              circle
              style="margin-left: 90%"
              ><el-icon :size="15"><delete /></el-icon
            ></el-button>
          </template>
        </el-popconfirm>
      </el-card>
    </div>
    <div style="display: flex">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="3"
        :pager-count="7"
        @current-change="changePage"
        style="margin: 10px auto"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
import { ElMessage } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
const open = (msg, type) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: type,
  });
};
export default {
  props: ["comment"],
  name: "",
  components: { Delete },
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
      total: 0,
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
          this.myComment.star = res.data;
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
      this.pageLoad();
    },
    dateOrder() {
      this.order = "date";
      this.pageLoad();
    },
    submitComment() {
      if (this.myComment.context == null || this.myComment.context == "") {
        open("请填写评论内容!", "warning");
      } else if (this.myComment.star == 0) {
        open("请为这个课程评分!", "warning");
      } else {
        this.myComment.userAccount = this.userInfo.userAccount;
        this.myComment.courseId = this.courseId;
        request({
          url: "/course/comments",
          method: "post",
          data: this.myComment,
        }).then((res) => {
          if (res.code == "400") {
            open(res.msg, "warning");
          } else {
            open(res.msg, "success");
          }
          this.pageLoad();
          this.myComment.context = "";
        });
      }
    },
    changePage(page) {
      this.pageNum = page;
      this.pageLoad();
    },
    deleteComment(item) {
      request({
        url:"/course/comments",
        method:"delete",
        params:{id:item.id}
      }).then((res)=>{
        if(res.code==="400")open(res.msg,"warning");
        else open(res.msg,"success");
        this.pageLoad();
      })
      
    },
    likeComment(item) {
      request({
        url:"/course/comments/like",
        method:"post",
        data:{commentId:item.id,userAccount:this.userInfo.userAccount}
      }).then((res)=>{
        if(res.code==="400")open(res.msg,"warning");
        else open(res.msg,"success")
        this.pageLoad();
      })
    },
  },
};
</script>

<style scoped>
.thumb :hover{
  color:aqua
}
</style>
