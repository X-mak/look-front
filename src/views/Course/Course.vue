<template>
  <index-header></index-header>

  <el-card
    shadow="always"
    style="width: 1200px; height: 500px; margin: 60px auto"
  >
    <div>
      <!-- 主体 -->
      <div class="row">
        <div class="column infos">
          <!-- 标题 -->
          <div class="title">
            <p>{{ this.course.courseName }}</p>
          </div>

          <!-- 封面 -->
          <div class="poster">
            <el-image
              style="width: 400px; height: 200px"
              :src="this.course.courseImg"
              fit="contain"
            ></el-image>
          </div>
          <div class="free-btn">
            <el-button type="primary" size="default" @click="enterClass"
              >免费观看</el-button
            >
          </div>
          <!-- 信息 -->
          <div>
            <div>
              <div @click="watchUser" class="publisher">
                <div><el-avatar :src="this.publisher.userImg"></el-avatar></div>

                <span style="font-size: 20px; margin: 0 30px">{{
                  this.publisher.userName
                }}</span>
              </div>
            </div>
            <div class="date">发布日期:{{ this.course.publishDate }}</div>
          </div>
        </div>
        <!-- 业务区域 -->
        <div class="column">
          <div class="row top-btns">
            <div class="top-btn">
              <el-icon :size="15"><star /></el-icon> <el-button type="text">收藏</el-button>
            </div>
            <hr>
            <div class="top-btn">
              <el-icon :size="15"><user /></el-icon> <el-button type="text" @click="gotoMy">我的</el-button>
            </div>
          </div>
          <div class="buy-btn">
            <el-button
              color="#626aef"
              plain
              size="large"
              v-if="valid == -1"
              @click="buy"
            >
              <p>购买</p>
              <span style="font-size: 18px; margin-left: 10px">{{
                this.course.cost
              }}</span>
              <el-icon :size="30" style=""><coin /></el-icon>
            </el-button>
            <el-button
              color="#626aef"
              plain
              size="large"
              v-if="valid == 1"
              @click="enterClass"
            >
              <p>进入课程</p>
            </el-button>
          </div>
          <div>
            <p style="color: rgba(87, 87, 87,0.8);">课程类别  : {{this.course.age}}</p>
          </div>
        </div>
      </div>
    </div>
  </el-card>
  <comments-part :comment="this.comment" v-if="valid != 0" />
</template>

<script>
import IndexHeader from "../../components/IndexPart/IndexHeader.vue";
import request from "../../utils/request";
import { ElMessage } from "element-plus";
import { Coin, Star, User } from "@element-plus/icons-vue";
import CommentsPart from "../../components/Course/CommentsPart.vue";
const open = (msg, type) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: type,
  });
};
export default {
  name: "",
  components: { IndexHeader, Coin, CommentsPart, Star, User },
  data() {
    return {
      courseId: 0,
      course: {},
      userInfo: {},
      valid: 0,
      publisher: {},
      LoginUser: {},
      comment: [],
    };
  },
  created() {
    this.courseId = this.$route.query.id;
    setTimeout(() => {
      this.LoginUser = this.$store.getters.getUser;
      this.userInfo = this.LoginUser.userInfo;
      this.load();
    });
  },
  methods: {
    load() {
      request({
        url: "/course/" + this.courseId,
        method: "get",
      }).then((res) => {
        this.course = res.data;
        this.publisher = res.data.userInfo;
      });
      request({
        url: "/manage/course/" + this.courseId,
        method: "get",
        params: { userAccount: this.userInfo.userAccount },
      }).then((res) => {
        if (res.code === "400") this.valid = -1;
        else {
          this.valid = 1;
        }
        this.comment.push(this.courseId, this.valid);
      });
    },
    buy() {
      request({
        url: "/manage/course/" + this.courseId,
        method: "post",
        params: { userAccount: this.userInfo.userAccount },
      }).then((res) => {
        if (res.code === "400") {
          open(res.msg, "warning");
        } else {
          open(res.msg, "success");
        }
      });
      this.load();
    },
    enterClass() {
      this.$router.push({
        path: "/course/video",
        query: {
          id: this.courseId,
        },
      });
    },
    watchUser() {
      this.$router.push("/userPage/" + this.publisher.userAccount);
    },
    collectThis(){
  
    },
    gotoMy(){
      this.$router.push("/user/course")
    },
  },
};
</script>

<style scoped>
p {
  margin: 20px 0;
}
.publisher :hover {
  color: rgb(148, 223, 241, 0.8);
  cursor: pointer;
}
.publisher {
  width: 30%;
  height: 60px;
  display: flex;
  align-items: center;
  border: 1px solid rgb(153, 153, 153, 0.6);
  border-radius: 5px;
  margin-left: 5%;
}
.publisher div {
  margin-left: 35px;
}
.row {
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
}

.infos {
  width: 55%;
  margin-left: 8%;
}
.date {
  font-size: small;
  color: rgb(153, 153, 153, 0.8);
  margin-left: 5%;
}
.title p {
  font-weight: 700;
  font-size: 22px;
}
.title {
  margin-left: 3%;
}
.free-btn {
  margin: 15px 0 15px 400px;
}
.top-btn {
  height: 30px;
  margin: 5px 30px 5px 30px;

}
.top-btns {
  margin-left: 200px;
}

.buy-btn {
  margin: 35%  10%;
}
</style>
