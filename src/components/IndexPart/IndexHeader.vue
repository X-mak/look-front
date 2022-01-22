<template>
  <el-header
    height="60px"
    style="
      flex-direction: row;
      display: flex;
      align-items: center;
      justify-content: space-between;
    "
  >
    <div @click="goMain" class="logo">
      <el-row style="
      flex-direction: row;
      display: flex;
      align-items: center;
      justify-content: space-between;
    ">
        <img src="../../assets/img/look_logo.jpg" alt="" style="width: 60px"/>
      </el-row>
    </div>

    <el-icon :size="20"><search /></el-icon>

    <el-form
      ref="form"
      label-width="180px"
      :inline="true"
      size="normal"
      @submit.native.prevent
      style="margin-top: 1.5%; margin-left: -34%"
    >
      <el-form-item>
        <el-input
          type="text"
          v-model="this.search"
          @keyup.enter="searchCourse"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchCourse">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-dropdown>
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
export default {
  data() {
    return {
      LoginUser: {},
      search: "",
      UserImg: "",
      userInfo: "",
      logined: false,
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
      this.UserImg="";
    },
    goMain() {
      this.$router.push("/main");
    },
  },
};
</script>

<style>
.logo {
  cursor: pointer;
}
</style>
