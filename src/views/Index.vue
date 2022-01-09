<template>
    <div>首页</div>
    <el-button v-if="isEmpty" type="text" size="default" @click="goLogin">登录</el-button>
    <el-button v-else type="text" size="default" @click="logOut">退出登录</el-button>
    <p>{{LoginUser}}</p>
</template>

<script>
export default {
    data(){
        return{
            LoginUser:{},
        }
    },
    created() {
        let str = sessionStorage.getItem("LoginUser") || "{}";
        this.LoginUser = JSON.parse(str);
    },
    methods: {
        goLogin(){
            this.$router.push("/login");
        },
        logOut(){
            sessionStorage.setItem("LoginUser","");
            this.LoginUser = {};
        }
    },
    computed: {
        isEmpty(){
            return JSON.stringify(this.LoginUser) == "{}"
        }
    },
}
</script>

<style scoped>

</style>
