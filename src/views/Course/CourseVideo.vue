<template>
  <index-header></index-header>

  <div
    style="width: 80%; margin: 10px auto; display: flex; flex-direction: row"
  >
    <!-- 主题区域 -->
    <div style="width: 70%">
      <!-- 标题 -->
      <div style="margin: 20px 10px">
        <span style="font-size: 26px; font-weight: bold">{{
          this.course.courseName
        }}</span>
        <p style="color: rgb(153, 153, 153); font-size: 14px; margin-top: 4px">
          热度:{{ this.course.clicks }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          发布时间:{{ this.course.publishDate }}
        </p>
      </div>
      <!-- 视频区域 -->
      <div class="demo" style="width: 880px">
        <video-play
          v-if="haveGot"
          v-bind="this.options"
          ref="videoPlayer"
          @play="startWatching"
          @timeupdate="onPlayerTimeupdate($event)"
        ></video-play>
      </div>
    </div>

    <!-- 副区域 -->
    <div style="width: 30%; margin-top: 10px; height: auto">
      <!-- 作者简介 -->
      <div>
        <el-card class="box-card">
          <template #header>
            <div class="card-header" style="display: flex; align-items: center">
              <div
                style="width: 200px; display: flex; align-items: center"
                class="user-entrance"
                @click="watchUser"
              >
                <el-avatar :size="50" :src="this.publisher.userImg"></el-avatar>
                <div
                  style="
                    margin-left: 10%;
                    display: flex;
                    flex-direction: column;
                  "
                >
                  <p style="font-size: 20px">{{ this.publisher.userName }}</p>
                  <span style="font-size: small; color: rgb(153, 181, 215, 0.8)"
                    >粉丝数:{{ this.publisher.fans }}</span
                  >
                </div>
              </div>

              <el-button
                class="button"
                type="primary"
                style="margin-left: 25%; width: 90px"
                v-if="!this.subscribed"
                @click="subscribeYou"
                >关注</el-button
              >
              <el-button
                class="button"
                type="primary"
                style="margin-left: 25%; width: 90px"
                v-else
                plain
                @click="cancelSubscribe"
                >取消关注</el-button
              >
            </div>
          </template>
        </el-card>
      </div>
      <!-- 相关推荐 -->
      <div style="">
        <div
          style="
            background-color: rgb(244, 244, 244);
            height: 40px;
            margin: 10px 0;
          "
        >
          <p style="line-height: 40px; margin-left: 20px">相关推荐</p>
        </div>
        <div v-for="item in this.recommend">
          <div class="single-recommend" @click="join(item)">
            <el-image
              style="width: 100px; height: 80px; margin: 0px 15px"
              :src="item.courseImg"
              fit="contain"
            ></el-image>
            <div class="recommend-words">
              <span style="font-size: 20px" class="recommend-title">{{
                item.courseName
              }}</span>
              <div>
                <span style="color: rgb(153, 153, 153); font-size: small"
                  >发布人:{{ item.userName }}</span
                >&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="color: rgb(153, 153, 153); font-size: small"
                  >热度:{{ item.clicks }}</span
                >
              </div>
              <span style="color: rgb(153, 153, 153); font-size: small"
                >发布时间:{{ item.publishDate }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <comments-part
      :comment="this.comment"
      v-if="valid != 0"
      style="margin: 40px auto"
    ></comments-part>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="提示"
    width="30%"
    :before-close="handleClose"
  >
    <span>您已经观看了此课程一分钟,是否要购买此课程?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">返回课程页面</el-button>
        <el-button type="primary" @click="buy">
          <p>购买 {{ this.course.cost }}</p>
          <el-icon :size="15"><coin /></el-icon
        ></el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import IndexHeader from "../../components/IndexPart/IndexHeader.vue";
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";
import request from "../../utils/request";
import CommentsPart from "../../components/Course/CommentsPart.vue";
import { ElMessage } from "element-plus";
import { Coin } from "@element-plus/icons-vue";
const open = (msg, type) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: type,
  });
};
export default {
  name: "",
  components: { IndexHeader, videoPlay, CommentsPart, Coin },
  data() {
    return {
      dialogVisible: false,
      courseId: 0,
      course: {},
      valid: 0,
      comment: [],
      LoginUser: {},
      userInfo: {},
      publisher: {},
      recommend: [],
      haveGot: false,
      subscribed: false,
      options: {
        width: "820px", //播放器高度
        height: "462px", //播放器高度
        color: "#409eff", //主题色
        title: "j", //视频名称
        src: "", //视频源
        muted: true, //静音
        webFullScreen: false,
        speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
        loop: false, //循环播放
        mirror: false, //镜像画面
        ligthOff: false, //关灯模式
        volume: 0.3, //默认音量大小
        control: true, //是否显示控制器
        preload: "auto",
        poster: "",
      },
    };
  },
  created() {
    this.courseId = this.$route.query.id;
    setTimeout(() => {
      this.LoginUser = this.$store.getters.getUser;
      this.userInfo = this.LoginUser.userInfo;
      this.load();
      this.recommendLoad();
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
        this.options.src = res.data.courseVideo;
        this.options.title = res.data.courseName;
        this.options.poster = res.data.courseImg;
        this.haveGot = true;
        request({
          url: "/user/subscribe/valid",
          method: "get",
          params: {
            mainAccount: this.publisher.userAccount,
            followAccount: this.userInfo.userAccount,
          },
        }).then((res) => {
          if (res.code === "200") this.subscribed = true;
          else this.subscribed = false;
        });
      });
      request({
        url: "/manage/course/" + this.courseId,
        method: "get",
        params: { userAccount: this.userInfo.userAccount },
      }).then((res) => {
        if (res.code === "400") this.valid = -1;
        else this.valid = 1;
        this.comment.push(this.courseId, this.valid);
      });
    },
    recommendLoad() {
      request({
        url: "course/random",
        method: "get",
        params: { age: "", limit: 2 },
      }).then((res) => {
        this.recommend = res.data;
      });
    },
    startWatching() {
      request({
        url: "/course/history",
        method: "post",
        params: { id: this.courseId, userAccount: this.userInfo.userAccount },
      });
    },
    subscribeYou() {
      var sub = {
        mainAccount: this.publisher.userAccount,
        followAccount: this.userInfo.userAccount,
      };
      request({
        url: "/user/subscribe",
        method: "post",
        data: sub,
      }).then((res) => {
        if (res.code === "400") open(res.msg, "warning");
        else open(res.msg, "success");
        this.load();
      });
    },
    cancelSubscribe() {
      request({
        url: "/user/subscribe",
        method: "delete",
        params: {
          mainAccount: this.publisher.userAccount,
          followAccount: this.userInfo.userAccount,
        },
      }).then((res) => {
        if (res.code === "400") open(res.msg, "warning");
        else open(res.msg, "success");
        this.load();
      });
    },
    join(course) {
      this.$router.push({
        path: "/course",
        query: {
          id: course.id,
        },
      });
    },
    watchUser() {
      this.$router.push("/userPage/" + this.publisher.userAccount);
    },
    onPlayerTimeupdate(player) {
      var time = player.target.currentTime;
      if (time > 10 && this.valid == -1) {
        this.$refs.videoPlayer.pause();
        this.dialogVisible = true;
      }
    },
    handleClose() {
      this.$router.push({
        path: "/course",
        query: {
          id: this.courseId,
        },
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
      this.dialogVisible=false;
    },
  },
};
</script>

<style scoped>
.single-recommend {
  height: 120px;
  display: flex;
  flex-direction: row;
  border: 1px solid rgb(244, 244, 244);
  border-radius: 10px;
  margin: 20px 0;
  align-items: center;
  cursor: pointer;
}
.recommend-words {
  display: flex;
  flex-direction: column;
}
.single-recommend :hover .recommend-title {
  color: rgb(148, 223, 241, 0.8);
}

.user-entrance {
  cursor: pointer;
}
.user-entrance :hover p {
  color: rgb(148, 223, 241, 0.8);
}
</style>
