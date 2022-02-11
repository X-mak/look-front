<template>
  <el-header
    height="80px"
    style="flex-direction: row; display: flex; align-items: center"
  >
    <div class="logo">
      <el-row>
        <img src="../../assets/img/logo.jpg" alt="" style="height: 60px" />
      </el-row>
    </div>

    <!-- 相关按钮 -->
    <div class="head-btn"><p @click="goMain">首页</p></div>
    <div class="head-btn"><p @click="searchCourse">课程</p></div>
    <div class="head-btn"><p @click="goUserSearch">作者</p></div>
    <div class="head-btn"><p @click="goUser">我的</p></div>
    <div
      style="
        display: flex;
        flex-direction: row;
        margin-top: 2%;
        margin-left: 4%;
      "
    >
      <!-- 搜索栏 -->
      <el-form
        ref="form"
        label-width="180px"
        :inline="true"
        size="normal"
        @submit.native.prevent
        class="form"
      >
        <el-form-item>
          <el-input
            type="text"
            v-model="this.search"
            @keyup.enter="searchCourse"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="searchCourse"
            class="searchBtn"
            round
            ><el-icon :size="20"><search /></el-icon
          ></el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 动态 -->
    <el-dropdown style="margin-left: 3%" v-if="logined">
      <span class="el-dropdown-link"> 动态 </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-scrollbar max-height="400px">
            <div v-for="item in update" :key="item">
              <el-card
                class="record-card"
                style="width: 300px"
                @click="join(item)"
              >
                <div
                  style="
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                  "
                >
                  <el-avatar :size="50" :src="item.courseImg"></el-avatar>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    "
                  >
                    <span style="font-size: large; margin-left: 20%">{{
                      item.courseName
                    }}</span>
                    <div
                      style="
                        margin-left: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                      "
                    >
                      <div>
                        <span
                          style="color: rgb(153, 153, 153); font-size: small"
                          >发布人:{{ item.userName }}</span
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span
                          style="color: rgb(153, 153, 153); font-size: small"
                          >热度:{{ item.clicks }}</span
                        >
                      </div>
                      <span style="color: rgb(153, 153, 153); font-size: small"
                        >发布时间:{{ item.publishDate.substring(5) }}</span
                      >
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-scrollbar>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 观看记录 -->
    <el-dropdown style="margin-left: 3%" v-if="logined">
      <span class="el-dropdown-link"> 观看记录 </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-scrollbar max-height="400px">
            <div v-for="item in history" :key="item">
              <el-card
                class="record-card"
                style="width: 300px"
                @click="join(item)"
              >
                <div
                  style="
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                  "
                >
                  <el-avatar :size="50" :src="item.courseImg"></el-avatar>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    "
                  >
                    <span style="font-size: large; margin-left: 20%">{{
                      item.courseName
                    }}</span>
                    <div
                      style="
                        margin-left: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                      "
                    >
                      <div>
                        <span
                          style="color: rgb(153, 153, 153); font-size: small"
                          >热度:{{ item.clicks }}</span
                        >
                      </div>
                      <span style="color: rgb(153, 153, 153); font-size: small"
                        >观看时间:{{ item.publishDate.substring(5) }}</span
                      >
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-scrollbar>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <div>
      <div class="login-info" v-if="!logined" @click="goLogin">
        <p>登录/注册</p>
        <img src="../../assets/img/login.jpg" alt="" style="width: 40px" />
      </div>
    </div>

    <!-- 用户信息 -->
    <el-dropdown style="position: absolute; right: 2%">
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="UserImg"></el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goLogin" v-if="!logined"
            >登录</el-dropdown-item
          >

          <el-dropdown-item @click="goUser" v-if="logined">
            <span style="margin: 0 auto"> 个人中心</span></el-dropdown-item
          >
          <el-dropdown-item @click="goSubscribe" v-if="logined">
            <span style="text-align: center; margin: 0 auto"
              >关注:{{ this.userInfo.subscribes }}</span
            >
          </el-dropdown-item>
          <el-dropdown-item v-if="logined">
            <el-icon :size="12"><coin /></el-icon>
            <span>硬币:{{ this.userInfo.coins }}</span>
          </el-dropdown-item>
          <el-dropdown-item @click="logOut" v-if="logined"
            ><span style="margin: 0 auto">退出登录</span></el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
  <hr />
</template>

<script>
import { Search, Coin } from "@element-plus/icons-vue";
import request from "../../utils/request";
export default {
  data() {
    return {
      LoginUser: {},
      search: "",
      UserImg: "",
      userInfo: {},
      logined: false,
      history: [],
      update: [],
    };
  },
  components: { Search, Coin },
  created() {
    setTimeout(() => {
      this.load();
    });
  },
  methods: {
    load() {
      this.LoginUser = this.$store.getters.getUser;
      if (JSON.stringify(this.LoginUser) != "{}") {
        this.userInfo = this.LoginUser.userInfo;
        this.UserImg = this.userInfo.userImg;
      }
      if (
        sessionStorage.getItem("token") === "" ||
        sessionStorage.getItem("token") == null
      ) {
        this.logined = false;
      } else {
        this.logined = true;
      }
      if (this.logined) {
        request({
          url: "/course/history/1",
          method: "get",
          params: { userAccount: this.userInfo.userAccount, pageSize: 30 },
        }).then((res) => {
          this.history = res.data;
        });
        request({
          url: "/manage/subscribe/course/1",
          method: "get",
          params: { userAccount: this.userInfo.userAccount, pageSize: 30 },
        }).then((res) => {
          this.update = res.data;
        });
        request({
          url: "/user/subscribe/count",
          method: "get",
          params: { userAccount: this.userInfo.userAccount },
        }).then((res) => {
          this.userInfo.subscribes = res.data;
        });
      }
    },
    goLogin() {
      this.$router.push("/login");
    },
    goUser() {
      if (this.logined) this.$router.push("/user/info");
      else {
        this.$router.push("/login");
      }
    },
    searchCourse() {
      this.$router.push({
        path: "/search",
        query: {
          keyword: this.search,
        },
      });
    },
    logOut() {
      sessionStorage.setItem("token", "");
      this.load();
      this.UserImg = "";
    },
    goMain() {
      this.$router.push("/main");
    },
    join(item) {
      this.$router.push({
        path: "/course/video",
        query: {
          id: item.id,
        },
      });
    },
    goSubscribe() {
      this.$router.push("/user/subscribeList");
    },
    goUserSearch(){
      this.$router.push({
        path: "/user_search",
        query: {
          keyword: "",
        },
      });
    }
  },
};
</script>

<style>
.logo {
  margin-left: 5%;
  margin-right: 5%;
}
.head-btn {
  width: 130px;
}
.head-btn p {
  font-size: large;
  user-select: none;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.head-btn :hover {
  cursor: pointer;
  color: rgb(148, 223, 241, 0.8);
}
.record-card {
  cursor: pointer;
}
.record-card :hover span {
  color: rgb(148, 223, 241, 0.8);
}
.form input {
  border-radius: 20px;
}
.searchBtn {
  margin-left: -100%;
}
.el-dropdown-link {
  font-size: 16px;
}
.login-info {
  display: flex;
  width: 200px;
}
.login-info :hover {
  color: rgb(148, 223, 241, 0.8);
  cursor: pointer;
}
.login-info p {
  font-size: large;
  margin-top: 5%;
}
</style>
