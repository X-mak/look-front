<template>
  <el-row style="display: flex; flex-direction: row">
    <p>首页</p>
    <el-button type="text" size="default" @click="goLogin">登录</el-button>
    <el-button type="text" size="default" @click="goUser">个人中心</el-button>
    <el-form ref="form" label-width="180px" :inline="true" size="normal" @submit.native.prevent>
      <el-form-item label="look:">
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
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      LoginUser: {},
      search: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.LoginUser = this.$store.getters.getUser;
    });
  },
  methods: {
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
  },
};
</script>

<style scoped>
</style>
