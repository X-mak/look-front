<template>
<UserHeader/>
<div style="display:flex">
    <UserNavi/>
    <router-view></router-view>
</div>

</template>

<script>
import UserHeader from "../../components/User/UserHeader.vue"
import UserNavi from "../../components/User/UserNavi.vue"
export default {


    components:{
        UserHeader,
        UserNavi
    }
}
</script>

<style scoped>

</style>
