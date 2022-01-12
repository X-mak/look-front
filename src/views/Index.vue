<template>
    <IndexHeader/>
    <p>{{LoginUser}}</p>
    
</template>

<script>
import IndexHeader from "../components/index/IndexHeader.vue";

export default {
    data() {
        return {
            LoginUser: {},
        };
    },
    mounted() {
        setTimeout(() => {
            this.LoginUser = this.$store.getters.getUser;
        });
    },
    methods: {
        goLogin() {
            this.$router.push("/login");
        },
        logOut() {
            sessionStorage.setItem("token", "");
            this.LoginUser = {};
        },
    },
    computed: {
        isEmpty() {
            return JSON.stringify(this.LoginUser) == "{}";
        }
    },
    components: { IndexHeader }
}
</script>

<style scoped>

</style>
