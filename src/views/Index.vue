<template>
    <div>首页</div>
    <el-button type="primary" size="default" @click="goLogin">去登录</el-button>
    
</template>

<script>
export default {
    data(){

    },
    methods: {
        goLogin(){
            this.$router.push("/login");
        }
    },
}
</script>

<style scoped>

</style>
