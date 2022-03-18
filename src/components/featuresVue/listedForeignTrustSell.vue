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
      foreignNm: '自營+投信賣超',
      key1: 'Listed_Trust_Dealer_Buy_Day',
      key4: 'Dealer+Investment_trust',
    })
    return {params}
  }

}
</script>
<style>

</style>