<template>
  <el-form
    style="
      max-width: 60%;
      height: 36%;
      margin: 0 auto;
      position: relative;
      top: 50px;
    "
    label-width="100px"
    label-position="top"
    :model="LoginUser"
  >
    <el-form-item label="用户名:" prop="username">
      <el-input v-model="userInfo.userAccount" type="text"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称:" prop="name">
      <el-input v-model="userInfo.userName" type="text"></el-input>
    </el-form-item>
    <label>硬币:</label>
    <p>{{userInfo.coins}}</p>
    <br>
    <el-button type="primary" size="default" @click="alter">修改</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      LoginUser: {},
      userInfo: {},
    };
  },
  created() {
    setTimeout(() => {
      this.LoginUser = this.$store.getters.getUser;
      this.userInfo = this.LoginUser.userInfo;
    });
  },
};
</script>

<style scoped>
</style>
