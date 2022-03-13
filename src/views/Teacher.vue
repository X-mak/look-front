<template>
  <upload-course
    v-if="this.dialogVisible"
    @changeVisible="changeVisible"
    :userInfo="this.userInfo"
  ></upload-course>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px auto;
    "
  >
    <el-button
      type="primary"
      size="default"
      @click="uploadClass"
      style="align-self: flex-start"
      >上传课程</el-button
    >

    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px auto;
      "
    >
      <el-table :data="tableData" style="width: auto" stripe border>
        <el-table-column prop="id" label="课程编号" width="140" sortable />
        <el-table-column prop="courseName" label="课程封面" width="250">
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.courseImg"
              fit="contain"
              :preview-src-list="[scope.row.courseImg]"
              :initial-index="1"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="courseName" label="课程标题" width="250" />
        <el-table-column label="状态" width="300">
          <template #default="scope" >
            <el-button type="success" round v-if="scope.row.status === 1" style="margin:0 35%"
              >已发布</el-button
            >
            <el-button type="warning" round v-else style="margin:0 35%">审核中</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="3"
        :pager-count="7"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
import { ElMessage } from "element-plus";
import UploadCourse from "../components/Teacher/UploadCourse.vue";
const open = (msg, type) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: type,
  });
};
export default {
  data() {
    return {
      dialogVisible: false,
      userInfo: {},
      tableData: [],
      pageNum: 1,
      total: 0,
    };
  },
  created() {
    setTimeout(() => {
      this.userInfo = this.$store.getters.getUser.userInfo;
      this.load();
    });
  },
  components: {
    UploadCourse,
  },
  methods: {
    load() {
      request({
        url:
          "/course/publish/" + this.userInfo.userAccount + "/" + this.pageNum,
        method: "get",
        params: { status: "",pageSize:3 },
      }).then((res) => {
        console.log(res.data);
        this.tableData = res.data;
        this.total = parseInt(res.msg);
      });
    },
    uploadClass() {
      this.dialogVisible = true;
    },
    changeVisible(v) {
      this.dialogVisible = v;
      this.load();
    },
    changePage(page) {
      this.pageNum = page;
      this.load();
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>
