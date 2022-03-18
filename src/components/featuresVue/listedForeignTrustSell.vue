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
  name: "listedTrustDealerSell",
  components: {
    MainFoundation
  },
  setup() {
    const params =reactive({
      foreignNm: '外資+投信賣超',
      key1: 'Listed_Foreign_Trust_Sell_Day',
      key4: 'Foreign_Investors +Investment_trust',
    })
    return {params}
  }

}
</script>
<style>

</style>