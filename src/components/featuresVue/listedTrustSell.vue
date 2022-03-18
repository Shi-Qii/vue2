<template>
  <div class="col-12">
    <main-foundation :params="params"></main-foundation>
  </div>
</template>

<script>
import VueCompositionAPI, { reactive} from "@vue/composition-api";
import Vue from 'vue'
import MainFoundation from "@/components/mainFunction/mainFoundationSell.vue";

Vue.use(VueCompositionAPI)
export default {
  name: "listedTrustSell",
  components: {
    MainFoundation
  },
  setup() {
    const params =reactive({
      foreignNm: '投信賣超',
      key1: 'Listed_Trust_Sell_Day',
      key4: 'Investment_Trust',
    })
    return {params}
  }

}
</script>
<style>

</style>