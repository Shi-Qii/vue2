<template>
  <div>


    <div class="input-group m-5">
      <span class="input-group-text">個股查詢:</span>
      <input class="form-control col-5" type="text" v-model="stockCode" list="my-list-id">
      <b-button class="col-2" @click="search" variant="primary">送出</b-button>
    </div>
    <hr/>
    <datalist id="my-list-id">
      <option>2330</option>
      <option v-for="size in sizes" :key="size">{{ size }}</option>
    </datalist>
    <b-table
        outlined
        sort
        striped
        bordered
        hover
        sticky-header="900px"
        v-if="showTable"
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
import VueCompositionAPI, {ref, reactive} from "@vue/composition-api";
import Vue from 'vue'
import GetStockData from "@/services/getStockData";

Vue.use(VueCompositionAPI)
export default {
  setup() {
    const stockCode = ref(null);
    const items = ref([]);
    const fields1 = [];
    const showSidebar = ref(true)
    const showTable = ref(false)
    const showSpinner = ref(false)
    const variants = reactive({
      value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']
    })
    const sizes = ref(['2618', '2615', '2303', '3008'])
    const search = function () {
      //newObj.thClass = 'text-center text-nowrap';
      // newObj.tdClass = 'text-center text-nowrap';
      fields1.push(
          {key: 'Processing_date', label: '日期', formatter: numberFormatter,thClass:'text-center',tdClass:'text-center', sortable: true},
          {key: 'Stock_num', label: '公司代號',thClass:'text-center',tdClass:'text-center', sortable: true},
          {key: 'Stock_name', label: '股票名稱',thClass:'text-center',tdClass:'text-center', sortable: true},
          {key: 'Dealer', label: '自營買賣超張數',thClass:'text-center',tdClass:'text-center', sortable: true},
          {key: 'Foreign_investors', label: '外資買賣超張數',thClass:'text-center',tdClass:'text-center', sortable: true},
          {key: 'Investment_trust', label: '投資買賣超張數',thClass:'text-center',tdClass:'text-center', sortable: true},
          {key: 'Total_buysell', label: '總買賣超張數',thClass:'text-center',tdClass:'text-center', sortable: true})
      let selectKey = {
        key1: 'Ind_Institutional_Investors_Day',
        key2: stockCode.value,
        key3: '10'
      }
      showSpinner.value = true
      showTable.value = true
      GetStockData.getUserBoard(selectKey).then(res => {
        items.value = res.data;
      }).then(() => {
        showSpinner.value = false
      }).catch(() => {
        showSpinner.value = true
      })
    }
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
    const numberFormatter = function (num) {
      if (typeof num === 'number') {
        console.log('判斷型態:', typeof num)
        let dd = new Date(num);
        return dd.getFullYear() + '-' + Number(dd.getMonth() + 1) + '-' + dd.getDate()
      }
    }

    return {
      items, fields1, showSidebar, showSpinner, variants, stockCode, search, showTable, sizes
    }
  }

}
</script>