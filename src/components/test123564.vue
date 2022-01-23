<template>
  <div>
    <b-table
        :items="items"
        :fields="fields1"
        responsive="sm"
    >

    </b-table>
  </div>
</template>

<script>
import GetStockData from '../services/getStockData';
import VueCompositionAPI, {onMounted, ref} from "@vue/composition-api";
import Vue from 'vue'

Vue.use(VueCompositionAPI)
export default {
  setup() {
    const items = ref([]);
    onMounted(() => {
      GetStockData.getUserBoard().then(res => {
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
              {key: 'Processing_date', label: 'Type 1'},
              {key: 'Total_buysell', label: '總買賣超張數'})

          console.log('items:', items)
        }

      })


    })
    const test1 = ref('123')


    const fields1 = ref([]);

    return {
      test1, items, fields1
    }
  }

}
</script>