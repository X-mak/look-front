<template>
  <el-aside width="200px" style="flex-direction: column">
    <el-menu
      class="el-menu-vertical-demo"
      style="min-height: calc(100vh - 42px)"
      router
      :default-active="this.$route.path"
    >
      <el-sub-menu index="1">
        <template #title>
          <span>个人中心</span>
        </template>
        <el-menu-item index="/user/info">我的信息</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <span>课程中心</span>
        </template>
        <el-menu-item index="/user/course">我的课程</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
