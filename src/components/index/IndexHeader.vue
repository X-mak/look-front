<template>
    <el-row>
        <p>首页</p>
        <el-button type="text" size="default" @click="goLogin">登录</el-button>
        <el-button type="text" size="default" @click="goUser">个人中心</el-button>
        
    </el-row>
</template>

<script>
export default {
    data(){
        return{
            LoginUser: {},
        }
    },
    mounted() {
        setTimeout(() => {
            this.LoginUser = this.$store.getters.getUser;
        });
    },
    methods: {
        goLogin(){
            this.$router.push("/login");
        },
        goUser(){
            this.$router.push("/user/info");
        }
    },
}
</script>

<style scoped>

</style>
