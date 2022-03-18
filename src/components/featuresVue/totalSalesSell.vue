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
  name: "totalSalesSell",
  components: {
    MainFoundation
  },
  //total sales
  setup() {
    const params =reactive({
      foreignNm: '總買賣',
      key1: 'Listed_Total_Sell_Day',
      key4: 'Total_Buysell',
    })
    return {params}
  }

}
</script>
<style>

</style>