<template>
<index-header></index-header>
{{this.courseId}}
</template>

<script>
import IndexHeader from "../../components/IndexPart/IndexHeader.vue";
export default {
  name:'',
  components:{IndexHeader},
  data(){
   return {
       courseId:0,
   }
  },
  created() {
      this.courseId = this.$route.query.id
  },
  methods: {
      
  },
}
</script>

<style scoped>

</style>
