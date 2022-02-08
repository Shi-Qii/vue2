<template>
  <div>
    {{ '外資買超' }}
    <hr/>


    <div>
      <b-table
          outlined
          sort
          striped
          bordered
          :items="items"
          responsive="sm"
          :per-page="perPage"
          :current-page="currentPage"
          sticky-header="900px"
      >
      </b-table>
      <div v-if="showSpinner" class="text-center mb-3 d-flex justify-content-between">
        <b-spinner
            v-for="variant in variants.value"
            :variant="variant"
            :key="variant"
        ></b-spinner>
      </div>
      <b-pagination
          v-if="!showSpinner"
          size="sm"
          number-of-pages="10"
          base-url="#"
          align="center"
          class="mt-4 text-center"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
      >
        <template #first-text><span class="text-success">First</span></template>
        <template #prev-text><span class="text-danger">Prev</span></template>
        <template #next-text><span class="text-warning">Next</span></template>
        <template #last-text><span class="text-info">Last</span></template>
        <template #ellipsis-text>
          <b-spinner small type="grow"></b-spinner>
          <b-spinner small type="grow"></b-spinner>
          <b-spinner small type="grow"></b-spinner>
        </template>
        <template #page="{ page, active }">
          <b v-if="active">{{ page }}</b>
          <i v-else>{{ page }}</i>
        </template>
      </b-pagination>


    </div>
  </div>
</template>

<script>
import VueCompositionAPI, {onMounted, ref, reactive, computed} from "@vue/composition-api";
import Vue from 'vue'
import GetStockData from "@/services/getStockData";

Vue.use(VueCompositionAPI)
export default {

  setup() {
    const rows = computed(() => {
      return items.value.length
    })
    const items = ref([]);
    const fields = ref([]);
    const showSidebar = ref(true)
    const showSpinner = ref(true)
    const variants = reactive({
      value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']
    })
    const perPage = ref(10)
    const currentPage = ref(1)
    // perPage: 3,
    //     currentPage: 1,
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
        fields.push(
            {
              key: 'Processing_date',
              label: '日期',
              formatter: numberFormatter,
              thClass: 'text-center',
              tdClass: 'text-center',
              sortable: true
            },
            {key: 'Stock_num', label: '公司代號', thClass: 'text-center', tdClass: 'text-center', sortable: true},
            {key: 'Stock_name', label: '股票名稱', thClass: 'text-center', tdClass: 'text-center', sortable: true},
            {key: 'Dealer', label: '自營買賣超張數', thClass: 'text-center', tdClass: 'text-center', sortable: true},
            {key: 'Foreign_investors', label: '外資買賣超張數', thClass: 'text-center', tdClass: 'text-center', sortable: true},
            {key: 'Investment_trust', label: '投資買賣超張數', thClass: 'text-center', tdClass: 'text-center', sortable: true},
            {key: 'Total_buysell', label: '總買賣超張數', thClass: 'text-center', tdClass: 'text-center', sortable: true})

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
    const numberFormatter = function (num) {
      if (typeof num === 'number') {
        console.log('判斷型態:', typeof num)
        let dd = new Date(num);
        return dd.getFullYear() + '-' + Number(dd.getMonth() + 1) + '-' + dd.getDate()
      }
      return num
    }
    return {
      items, fields, showSidebar, showSpinner, variants, allData, perPage, currentPage, rows
    }
  }

}
</script>