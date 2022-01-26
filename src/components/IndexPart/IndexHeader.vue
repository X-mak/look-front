<template>
  <el-header
    height="60px"
    style="flex-direction: row; display: flex; align-items: center"
  >
    <div @click="goMain" class="logo">
      <el-row>
        <img src="../../assets/img/look_logo.jpg" alt="" style="width: 60px" />
      </el-row>
    </div>
    <div
      style="
        display: flex;
        flex-direction: row;
        margin-top: 2%;
        margin-left: 35%;
      "
    >
      <el-form
        ref="form"
        label-width="180px"
        :inline="true"
        size="normal"
        @submit.native.prevent
      >
        <el-form-item>
          <el-input
            type="text"
            v-model="this.search"
            @keyup.enter="searchCourse"
          >
            <template #prefix>
              <el-icon :size="20" style="margin-top: 30%"><search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchCourse">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dropdown style="margin-left: 30%" v-if="logined">
      <span class="el-dropdown-link"> 观看记录 </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-scrollbar max-height="400px">
            <div v-for="item in history" :key="item">
              <el-card
                class="record-card"
                style="width: 200px"
                @click="join(item)"
              >
                <div style="display: flex; align-items: center">
                  <el-avatar :size="50" :src="item.courseImg"></el-avatar>
                  <span style="font-size: large; margin-left: 20%">{{
                    item.courseName
                  }}</span>
                </div>
              </el-card>
            </div>
          </el-scrollbar>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dropdown style="position: absolute; right: 2%">
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="UserImg"></el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goLogin" v-if="!logined"
            >登录</el-dropdown-item
          >

          <el-dropdown-item @click="goUser" v-if="logined"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item v-if="logined">
            <el-icon :size="12"><coin /></el-icon>
            <span>硬币:{{ this.userInfo.coins }}</span>
          </el-dropdown-item>
          <el-dropdown-item @click="logOut" v-if="logined"
            >退出登录</el-dropdown-item
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
      userInfo: "",
      logined: false,
      history: [],
    };
  },
  components: { Search, Coin },
  mounted() {
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
      }
    },
    goLogin() {
      this.$router.push("/login");
    },
    goUser() {
      this.$router.push("/user/info");
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
  },
};
</script>

<style>
.logo {
  cursor: pointer;
}
.record-card {
  cursor: pointer;
}
.record-card :hover span {
  color: rgb(148, 223, 241, 0.8);
}
</style>
