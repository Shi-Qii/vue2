<template>
  <div class="col-12">
    <main-foundation :params="params"></main-foundation>
  </div>
</template>

<script>
import VueCompositionAPI, { reactive} from "@vue/composition-api";
import Vue from 'vue'
import MainFoundation from "@/components/mainFunction/mainFoundation.vue";

Vue.use(VueCompositionAPI)
export default {
  name: "listedTrustBuy",
  components: {
    MainFoundation
  },
  setup() {
    const params =reactive({
      foreignNm: '投信買超',
      key1: 'Listed_Trust_Buy_Day',
    })
    return {params}
  }

}
</script>
<style>

</style>