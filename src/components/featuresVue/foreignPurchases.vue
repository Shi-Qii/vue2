<template>
  <div>
    {{ '外資買超' }}
    <div>
      <!--      <b-form-select v-model="allData.selected"-->
      <!--                     :options="allData.options"-->
      <!--                     size="sm" class="mt-3 col-2"></b-form-select>-->
      <!--      <b-form-select v-model="allData.selected"-->
      <!--                     :options="allData.options"-->
      <!--                     size="sm" class="mt-3 col-2"></b-form-select>-->
    </div>
    <!--    等後端轉圈-->
    <div v-if="showSpinner" class="text-center mb-3 d-flex justify-content-between">
      <b-spinner
          v-for="variant in variants.value"
          :variant="variant"
          :key="variant"
      ></b-spinner>
    </div>

    <b-table
        sort
        :items="items"
        :fields="fields"
        responsive="sm"
    >
    </b-table>


  </div>
</template>

<script>
import VueCompositionAPI, {onMounted, ref, reactive} from "@vue/composition-api";
import Vue from 'vue'
import GetStockData from "@/services/getStockData";

Vue.use(VueCompositionAPI)
export default {
  setup() {
    const items = ref([]);
    const fields = ref([]);
    const showSidebar = ref(true)
    const showSpinner = ref(true)
    const variants = reactive({
      value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']
    })
    onMounted(() => {
      let selectKey = {
        key1: 'Listed_Foreign_Buy',
        key2: '上市',
        key3: 'buy'
      }
      //上市
      //buy
      GetStockData.getUserBoard(selectKey).then(res => {
        items.value = res.data;
        // for (let i = 0; i < stockData.Dealer.length; i++) {
        //   let obj = {
        //     Processing_date: null,
        //     Stock_num: null,
        //     Stock_name: null,
        //     Foreign_investors: null,
        //     Investment_trust: null,
        //     Dealer: null,
        //     Total_buysell: null,
        //   }
        //   obj.Processing_date = stockData.Processing_date[i]
        //   obj.Stock_num = stockData.Stock_num[i]
        //   obj.Stock_name = stockData.Stock_name[i]
        //   obj.Foreign_investors = stockData.Foreign_investors[i]
        //   obj.Investment_trust = stockData.Investment_trust[i]
        //   obj.Dealer = stockData.Dealer[i]
        //   obj.Total_buysell = stockData.Total_buysell[i]
        //   items.value.push(obj)
        fields.value.push(
            {key: 'Stock_num', label: '公司代號'},
            {key: 'Stock_name', label: '股票名稱'},
            {key: 'Dealer', label: '自營買賣超張數'},
            {key: 'Foreign_investors', label: '外資買賣超張數'},
            {key: 'Investment_trust', label: '投資買賣超張數'},
            {key: 'Processing_date', label: '日期'},
            {key: 'Total_buysell', label: '總買賣超張數'})
        // console.log('items:', items)
        // }
      }).then(() => {
        showSpinner.value = false
      }).catch(() => {
        showSpinner.value = true
      })
    })
    const allData = reactive({
      selected: null,
      options: [
        {value: null, text: 'Please select an option'},
        {value: 'a', text: 'This is First option'},
        {value: 'b', text: 'Selected Option'},
        {value: {C: '3PO'}, text: 'This is an option with object value'},
        {value: 'd', text: 'This one is disabled', disabled: true}
      ]
    })

    return {
      items, fields, showSidebar, showSpinner, variants, allData
    }
  }

}
</script>