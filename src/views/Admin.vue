<template >
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px auto;
    "
  >
    <el-table
      :data="tableData"
      style="width: auto"
      stripe
      border
      :default-sort="{ prop: 'id' }"
    >
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
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-link
            type="primary"
            :underline="false"
            :href="scope.row.courseVideo"
            target="_blank"
            style="margin: auto 10px"
          >
            <el-button type="text" size="default">下载课程</el-button>
          </el-link>

          <el-button type="text" size="default" @click="update(scope.row)"
            >更新课程</el-button
          >
          <el-popconfirm
            title="即将通过课程审核,您已经剪辑过课程了吗"
            @confirm="access(scope.row)"
            confirmButtonText="确认"
            cancelButtonText="取消"
          >
            <template #reference>
              <el-button type="text" size="default">审核通过</el-button>
            </template>
          </el-popconfirm>
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
  <update-course
    v-if="this.visible"
    @changeVisible="changeVisible"
    :course="this.currentCourse"
  ></update-course>
</template>

<script>
import axios from "axios";
import { toRaw } from "vue";
import request from "../utils/request";
import { ElMessage } from "element-plus";
import UpdateCourse from "../components/Admin/UpdateCourse.vue";
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
      tableData: [],
      pageNum: 1,
      total: 0,
      currentCourse: {},
      visible: false,
      statisData:[],
    };
  },
  components: {
    UpdateCourse,
  },
  created() {
    setTimeout(() => {
      this.load();
    });
  },
  methods: {
    load() {
      request({
        url: "/course/status/" + this.pageNum,
        method: "get",
        params: { status: "0" },
      }).then((res) => {
        this.tableData = res.data;
        this.statisData = JSON.parse(JSON.stringify(res.data));
        this.total = parseInt(res.msg);
      });
    },
    changeVisible(v) {
      this.visible = v;
      this.tableData = JSON.parse(JSON.stringify(this.statisData));
    },
    changePage(page) {
      this.pageNum = page;
      this.load();
    },
    update(row) {
      this.visible = true;
      this.currentCourse = row;
    },
    access(row) {
      row = toRaw(row);
      var course = {
        id: row.id,
        status: 1,
      };
      request({
        url: "/course",
        method: "put",
        data: course,
      }).then((res) => {
        if (res.code === "400") {
          open(res.msg, "warning");
        } else {
          open(res.msg, "success");
        }
      });
      setTimeout(() => {
        this.load();
      });
    },
  },
};
</script>

<style scoped>
</style>
