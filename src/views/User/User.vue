<template>
<UserHeader/>
<div style="display:flex">
    <UserNavi/>
    <router-view></router-view>
</div>

</template>

<script>
import UserHeader from "../../components/User/UserHeader.vue"
import IndexHeader from "../../components/IndexPart/IndexHeader.vue"
import UserNavi from "../../components/User/UserNavi.vue"
export default {


    components:{
        UserHeader,
        UserNavi,
        IndexHeader
    }
}
</script>

<style scoped>

</style>
