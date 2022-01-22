<template>
  <index-header></index-header>

  <el-card>
    <p style="text-align: center; font-size: 30px">
      {{ this.course.courseName }}
    </p>
    <!-- card body -->
    <div style="display: flex; align-items: center; justify-content: center">
      <el-avatar :src="this.publisher.userImg"></el-avatar>
      <span style="font-size: 20px; margin: 0 30px">{{
        this.publisher.userName
      }}</span>
    </div>
  </el-card>
  <div class="demo" style="margin: 0 auto; width: 800px">
    <video-play
      v-if="haveGot"
      v-bind="this.options"
      ref="videoPlayer"
    ></video-play>
  </div>
</template>

<script>
import IndexHeader from "../../components/IndexPart/IndexHeader.vue";
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";
import request from "../../utils/request";
export default {
  name: "",
  components: { IndexHeader, videoPlay },
  data() {
    return {
      courseId: 0,
      course: {},
      valid: false,
      LoginUser: {},
      userInfo: {},
      publisher: {},
      haveGot: false,
      options: {
        width: "800px", //播放器高度
        height: "450px", //播放器高度
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
      });
      request({
        url: "/manage/course/" + this.courseId,
        method: "get",
        params: { userAccount: this.userInfo.userAccount },
      }).then((res) => {
        if (res.code === "400") this.valid = false;
        else this.valid = true;
      });
    },
  },
};
</script>

<style scoped>
</style>
