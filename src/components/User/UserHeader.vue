<template>
    <el-header height="40px" style="flex-direction:row;display: flex;justify-content:space-between;align-items:center">
        <div>个人中心</div>
        <el-button type="text" size="default" style="line-height:40px" @click="goHome">返回首页</el-button>
       
    </el-header>
     <hr>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        goHome(){
            this.$router.push("/");
        }
    },
}
</script>

<style scoped>

</style>
