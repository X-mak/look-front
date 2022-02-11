<template>
  <div class="main">
    <!-- 搜索栏 -->
    <div class="row search">
      <div>
        <img
          src="../../assets/img//small_logo.jpg"
          alt=""
          style="width: 100px"
        />
      </div>
      <div class="row">
        <el-input
          v-model="keyword"
          size="default"
          style="width: 200px"
          placeholder="请输入查询的作者"
        ></el-input>
        <el-button type="primary" @click="search" round
          ><el-icon :size="20"><search /></el-icon
        ></el-button>
      </div>
    </div>

    <!-- 主体 -->
    <div>
      <!-- 排序order -->
      <!-- <div class="row">
        <el-button type="text" size="default" @click="orderDown"
          >粉丝数从多到少</el-button
        >
        <el-button type="text" size="default" @click="orderUp"
          >粉丝数从少到多</el-button
        >
      </div> -->

      <!-- 用户列表 -->
      <div class="column">
        <div v-for="item in userList" class="rw single-user">
          <!-- 用户头像 -->
          <div>
            <el-avatar :size="100" :src="item.userImg"></el-avatar>
          </div>
          <!-- 主要信息 -->
          <div>
            <div class="maininfo">
              <p
                style="
                  font-size: larger;
                  margin: 5px 20px;
                  display: inline-block;
                "
                @click="enterUserPage(item)"
              >
                {{ item.userName }}
              </p>
              <div>
                <p class="subinfo">粉丝:{{ item.fans }}</p>
              </div>
            </div>
            <!-- 近期视频 -->
            <div class="row" style="margin: 0 0 10px -100px; min-height: 55px">
              <div
                v-for="course in item.recentCourse"
                class="row"
                style="margin-left: 40px"
              >
                <el-image
                  style="width: 100px; height: 100px"
                  :src="course.courseImg"
                  fit="scale-down"
                ></el-image>
                <div style="margin-left: 14px" class="maininfo">
                  <p
                    style="font-size: large; margin: 20px 0 0 0"
                    @click="joinCourse(course)"
                  >
                    {{ course.courseName }}
                  </p>
                  <p
                    style="
                      color: rgba(184, 184, 184);
                      font-size: small;
                      margin: 10px 0 0 0;
                    "
                  >
                    {{ course.publishDate.substring(0, 10) }}
                  </p>
                </div>
              </div>
            </div>
            <hr style="width: 800px" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="3"
        :pager-count="7"
        @current-change="changePage"
        class="row"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
import { Search } from "@element-plus/icons-vue";
export default {
  name: "",
  components: { Search },
  data() {
    return {
      pageNum: 1,
      total: 0,
      userList: [],
      keyword: "",
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.load();
  },
  methods: {
    load() {
      request({
        url: "/user/list/" + this.pageNum,
        method: "get",
        params: { pageSize: 10, keyword: this.keyword },
      }).then((res) => {
        this.userList = res.data;
        this.total = parseInt(res.msg);
      });
    },
    search(){this.load();},
    changePage(page) {
      this.pageNum = page;
      this.load();
    },
    enterUserPage(item) {
      this.$router.push("/userPage/" + item.userAccount);
    },
    joinCourse(course) {
      this.$router.push({
        path: "/course",
        query: {
          id: course.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.rw {
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
}
.search {
  justify-content: center;
  margin: 2% auto 1%;
  height: auto;
  width: auto;
  align-content: center;
}
.search .row div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 0 20px;
}
.search .row button {
  margin: 12px;
}
.main {
  width: 60%;
  margin: 0 auto;
}
.single-user {
  margin: 10px;
}
.subinfo {
  color: rgba(184, 184, 184);
  font-size: small;
  margin-left: 20px;
}
.maininfo :hover {
  color: rgb(148, 223, 241, 0.8);
  cursor: pointer;
}
</style>
