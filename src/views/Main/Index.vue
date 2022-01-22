<template>
    <IndexHeader/>
    <router-view></router-view>
</template>

<script>
import IndexHeader from "../../components/IndexPart/IndexHeader.vue";

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

    },
    components: { IndexHeader }
}
</script>

<style scoped>

</style>
