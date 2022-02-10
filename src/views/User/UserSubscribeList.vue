<template>
  <div class="main-box">
    <div style="height: 50px">
      <span style="font-size: large; line-height: 50px; margin-left: 15px"
        >全部关注</span
      >
    </div>
    <hr />
    <div v-for="item in list">
      <!-- 关注栏 -->
      <div class="single-box">
        <el-avatar
          icon="el-icon-user-solid"
          :size="60"
          shape="circle"
          :src="item.userImg"
          fit="fill"
        ></el-avatar>
        <div @click="enterUserPage(item)">
          <div class="describe">
            <p style="font-size: 20px">{{ item.userName }}</p>
            <span style="color: rgba(59, 59, 59, 0.8); font-size: small"
              >粉丝数:{{ item.fans }}</span
            >
          </div>
        </div>
        <div style="">
          <el-button
            type="primary"
            size="default"
            @click="cancelSubscribe(item)"
            class="btn"
            plain
            >取消关注</el-button
          >
        </div>
      </div>
      <hr />
    </div>

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
import request from "../../utils/request";
import { ElMessage } from "element-plus";
const open = (msg, type) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: type,
  });
};
export default {
  name: "",
  data() {
    return {
      list: [],
      pageNum: 1,
      total: 0,
      LoginUser: {},
      userInfo: {},
    };
  },
  created() {
    setTimeout(() => {
      this.LoginUser = this.$store.getters.getUser;
      this.userInfo = this.LoginUser.userInfo;
      this.loadList();
    });
  },
  methods: {
    loadList() {
      request({
        url: "/user/subscribe/" + this.pageNum,
        method: "get",
        params: { userAccount: this.userInfo.userAccount, pageSize: 5 },
      }).then((res) => {
        this.list = res.data;
        this.total = parseInt(res.msg);
      });
    },
    changePage(page) {
      this.pageNum = page;
      this.loadList();
    },
    cancelSubscribe(item) {
      console.log(item);
      request({
        url: "/user/subscribe",
        method: "delete",
        params: {
          mainAccount: item.userAccount,
          followAccount: this.userInfo.userAccount,
        },
      }).then((res) => {
        if (res.code === "400") open(res.msg, "warning");
        else open(res.msg, "success");
        this.loadList();
      });
    },
    enterUserPage(item) {
      this.$router.push("/userPage/" + item.userAccount);
    },
  },
};
</script>

<style scoped>
.main-box {
  width: 80%;
  margin: 10px auto;
  background-color: rgba(211, 211, 211, 0.6);
  display: flex;
  flex-direction: column;
}
.single-box {
  display: flex;
  margin: 20px 30px;
  align-content: center;
}
.single-box :hover p {
  color: rgb(148, 223, 241, 0.8);
  cursor: pointer;
}
.describe {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin-left: 40px;
  margin-top: 6px;
}

.btn {
  position: absolute;
  right: 15%;
  margin-top: 12px;
}
</style>
