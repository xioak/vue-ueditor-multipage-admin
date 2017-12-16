<template>
   <xenon-nvg :items="items"></xenon-nvg>
</template>

<script>
import Vue from 'vue'
// import xenonscc from 'js/xenoncss'
import xenonNvg from '../../components/common/xenon-nvg.vue'
export default{
  components: {
      xenonNvg
  },
  data () {
      return {
        items: ['首页', '新闻管理', '新闻列表']
      }
    }
}

</script>
