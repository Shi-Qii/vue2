<template>
  <div>
    {{ '個股查詢' }}
    <b-table
        :items="items"
        :fields="fields1"
        responsive="sm"
    >
    </b-table>

    <div v-if="showSpinner" class="text-center mb-3 d-flex justify-content-between">
      <b-spinner
          v-for="variant in variants.value"
          :variant="variant"
          :key="variant"
      ></b-spinner>
    </div>

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
    const showSidebar = ref(true)
    const showSpinner = ref(true)
    const variants = reactive({
      value:['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']
    })
    onMounted(() => {
      let selectKey='Ind_Institutional_Investors_Day'
      GetStockData.getUserBoard(selectKey).then(res => {
        const stockData = res.data;
        // this.items=res.data;

        console.log(stockData)
        // const data = res.data;


        for (let i = 0; i < stockData.Dealer.length; i++) {
          let obj = {
            Processing_date: null,
            Stock_num: null,
            Stock_name: null,
            Foreign_investors: null,
            Investment_trust: null,
            Dealer: null,
            Total_buysell: null,
          }
          obj.Processing_date = stockData.Processing_date[i]
          obj.Stock_num = stockData.Stock_num[i]
          obj.Stock_name = stockData.Stock_name[i]
          obj.Foreign_investors = stockData.Foreign_investors[i]
          obj.Investment_trust = stockData.Investment_trust[i]
          obj.Dealer = stockData.Dealer[i]
          obj.Total_buysell = stockData.Total_buysell[i]
          items.value.push(obj)
          fields1.value.push(
              {key: 'Stock_num', label: '公司代號'},
              {key: 'Stock_name', label: '股票名稱'},
              {key: 'Dealer', label: '自營買賣超張數'},
              {key: 'Foreign_investors', label: '外資買賣超張數'},
              {key: 'Investment_trust', label: '投資買賣超張數'},
              {key: 'Processing_date', label: '日期'},
              {key: 'Total_buysell', label: '總買賣超張數'})

          console.log('items:', items)
        }

      }).then(() => {
        showSpinner.value = false
      }).catch(() => {
        showSpinner.value = true
      })


    })
    const test1 = ref('123')


    const fields1 = ref([]);

    return {
      test1, items, fields1, showSidebar, showSpinner, variants
    }
  }

}
</script>