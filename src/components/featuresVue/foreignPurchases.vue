<template>
  <div>
    {{ individualVueData.foreignNm }}
    <hr/>
    <div>
      <b-table
          outlined
          sort
          striped
          bordered
          hover
          :tbody-tr-class="rowClass"
          sticky-header="500px"
          v-if="showState.showTable"
          :items="individualVueData.items.value"
          :fields="individualVueData.fields.value"
          responsive="sm"
          :per-page="individualVueData.perPage"
          :current-page="individualVueData.currentPage"
          class="setTB"
      >
        <template #cell()="data">
          <span v-html="data.value"></span>
        </template>
      </b-table>
      <div v-if="showState.showSpinner" class="text-center mb-3 d-flex justify-content-between">
        <b-spinner
            v-for="variant in individualVueData.spinnerVariants.value"
            :variant="variant"
            :key="variant"
        ></b-spinner>
      </div>
      <b-pagination
          v-if="showState.showPagination"
          size="sm"
          number-of-pages="10"
          base-url="#"
          align="center"
          class="mt-4 text-center"
          v-model="individualVueData.currentPage"
          :total-rows="rows"
          :per-page="individualVueData.perPage"
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
import VueCompositionAPI, {computed, onMounted, reactive} from "@vue/composition-api";
import Vue from 'vue'
import GetStockData from "@/services/getStockData";
import {router} from "@/router";

router
Vue.use(VueCompositionAPI)
export default {
  props: {
    idName: String
  },
  setup(props) {
    console.log('props:', props)
    const params1 = reactive({
      parentUrl: computed(() => {
        return router
      }),
    });
    console.log('params1:', params1)
    const rows = computed(() => {
      return individualVueData.items.value.length
    })
    const individualVueData = reactive({
      activeNm: {value: 'institutional_investors'},
      foreignNm: '外資買超',
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      selectDayOptions: {value: ['7', '10', '20', '30', '60']},
      selectDay: {value: 7},
      stockCode: {value: null},
      stockInfo: {name: null, note: null},
      items: {value: []},
      fields: {
        value: [{
          key: 'Processing_date',
          label: '日期',
          formatter: numberFormatter,
          thClass: 'text-center',
          tdClass: 'text-center',
          sortable: true
        },
          {key: 'Industry_sector', label: '股票產業別', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Stock_num', label: '公司代號', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Stock_name', label: '股票名稱', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Open_price', label: '開盤價', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Close_price', label: '收盤價', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Up_down', label: '漲跌', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Up_down_pct', label: '漲跌幅', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {
            key: 'Foreign_investors',
            label: '外資買賣超張數',
            thClass: 'text-center',
            tdClass: 'text-center',
            sortable: true
          },
          {key: 'Investment_trust', label: '投資買賣超張數', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Dealer', label: '自營買賣超張數', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Total_buysell', label: '總買賣超張數', thClass: 'text-center', tdClass: 'text-center', sortable: true}]
      },
      currentPage: 1,
      perPage: 10,
    })
    const showState = reactive({
      showTable: true,
      showSpinner: true,
      showBCardNm: false,
      showCollapse: false,
      showPagination: false,
    })
    onMounted(() => {
      let selectKey = {
        idName: null,
        key1: 'Listed_Foreign_Buy',
        key2: '上市',
        key3: 'buy',
        key4: 'Foreign_investors',
        key5: '1',

      }
      selectKey.idName = individualVueData.activeNm.value
      //上市
      //buy
      GetStockData.getUserBoard(selectKey).then(res => {
        console.log('res', res.data)
        if (res.data.length > 0) {
          showState.showSpinner = false
          showState.showPagination = true
        }
        //名次
        // 股票產業別
        // 公司代號
        // 股票名稱
        // 開盤價
        // 收盤價
        // 漲跌
        // 漲跌幅
        // 外資買賣超張數
        // 投資買賣超張數
        // 自營買賣超張數
        // 總買賣超張數
        individualVueData.items.value = res.data;
        // individualVueData.fields.push(
        //     ,
        // )

      }).then(() => {


      }).catch(() => {
        // showState.showSpinner = true
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

    function rowClass(item) {
      // console.log(item, '<-_______->', type)

      Object.keys(item).forEach(f => {
        // console.log('*',item[f])
        let hasNegative = item[f]
        if (Number(hasNegative) < 0) {
          // console.log('**', item[f])
          // return 'text-danger'
        }
      })
    }

    return {
      showState, allData, rows, individualVueData, rowClass
    }
  }

}
</script>
<style scoped>
.setTB {
  white-space: nowrap;
}
</style>