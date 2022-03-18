<template>
  <div class="col-12">
    <main-foundation :params="params"></main-foundation>
  </div>
</template>

<script>
import VueCompositionAPI, { reactive} from "@vue/composition-api";
import Vue from 'vue'
import MainFoundation from "@/components/mainFunction/mainFoundationBuy.vue";

Vue.use(VueCompositionAPI)
export default {
  name: "listedDealerBuy",
  components: {
    MainFoundation
  },
  setup() {
    const params =reactive({
      foreignNm: '自營買超',
      key1: 'Listed_Dealer_Buy_Day',
      key4: 'Dealer',
    })
    return {params}
  }

}
</script>
<style>

</style>