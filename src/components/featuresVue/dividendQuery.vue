<template>
  <div>
    <div class="container-fluid">
      <!--      <dividendQueryColunmChart v-if="showState.showTable" :initChartData="initChartData"></dividendQueryColunmChart>-->
      <dividend-query-colunm-chart   :initChartData="initChartData"></dividend-query-colunm-chart>
      <b-table
          outlined
          sort
          striped
          bordered
          hover
          sticky-header

          :items="VueData.items.value"
          :fields="VueData.fields.value"
          :per-page="VueData.perPage"
          :current-page="VueData.currentPage"
          class="setTB"
      >
        <template #thead-top>
          <b-tr>
            <b-th colspan="2"></b-th>
            <b-th variant="text-center" colspan="2">現金股利</b-th>
            <b-th variant="text-center" colspan="2">股票股利</b-th>
          </b-tr>
        </template>
      </b-table>

      <!--    <div v-if="showState.showSpinner" class="text-center mb-3 d-flex justify-content-between">-->
      <!--      <b-spinner-->
      <!--          v-for="variant in individualVueData.spinnerVariants.value"-->
      <!--          :variant="variant"-->
      <!--          :key="variant"-->
      <!--      ></b-spinner>-->
      <!--    </div>-->
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "@vue/composition-api/dist/vue-composition-api";
import DividendQueryColunmChart from "@/components/chartFolder/dividendQueryColunmChart";


export default {
  name: "dividendQuery",
  components: {DividendQueryColunmChart},
  props: {
    isTypeData: Array
  },
  setup(props) {
    const initChartData = {data: null}
    const showState = reactive({
      showTable: false,
      showSpinner: false,
      showBCardNm: false,
      showCollapse: false,
    })

    //現金股利跟股票股利 圖表
    const pr = ref(props);
    console.log('pr', pr.value['isTypeData'])

    const VueData = reactive({
      selected: {value: 'institutional_investors'},
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      selectDayOptions: {value: ['12', '24', '36', '48', '60']},
      selectDay: {value: 12},
      stockCode: {value: null},
      stockInfo: {name: null, note: null},
      items: {value: []},
      // 年度
      // Year
      // 年均價
      // Price
      // 現金股利
      // 盈餘分配
      // Retained_earnings_cash
      // 資本公積
      // Capital_surplus_cash
      // 股票股利
      // 盈餘分配
      // Retained_earnings_stock
      // 資本公積
      // Capital_surplus_stock
      // 加總現金股利
      // 加總股票股利
      fields: {
        value: [
          {key: 'Year', label: '年度', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Price', label: '年均價', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {
            key: 'Retained_earnings_cash',
            label: '盈餘分配',
            thClass: 'text-center ',
            tdClass: 'text-center',
            sortable: true
          },
          {key: 'Capital_surplus_cash', label: '資本公積', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {
            key: 'Retained_earnings_stock',
            label: '盈餘分配',
            thClass: 'text-center ',
            tdClass: 'text-center',
            sortable: true
          },
          {
            key: 'Capital_surplus_stock',
            label: '資本公積',
            thClass: 'text-center ',
            tdClass: 'text-center',
            sortable: true
          },
          {key: 'total_cash', label: '加總現金股利', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'total_stock', label: '加總股票股利', thClass: 'text-center ', tdClass: 'text-center', sortable: true},

        ]
      },
      currentPage: 1,
      perPage: 50,
      data: null,
    })
    let testData = [{
      "Stock_num": "2330",
      "Year": 111,
      "Price": 622.914893617,
      "stock_name": "台積電",
      "Retained_earnings_cash": 2.75,
      "Capital_surplus_cash": 0.0,
      "Retained_earnings_stock": 0.0,
      "Capital_surplus_stock": 0.0,
      "total_cash": 2.75,
      "total_stock": 0.0
    }, {
      "Stock_num": "2330",
      "Year": 110,
      "Price": 597.683127572,
      "stock_name": "台積電",
      "Retained_earnings_cash": 10.75,
      "Capital_surplus_cash": 0.0,
      "Retained_earnings_stock": 0.0,
      "Capital_surplus_stock": 0.0,
      "total_cash": 10.75,
      "total_stock": 0.0
    },]
    console.log(testData)
    // VueData.items.value = testData;
    pr.value['isTypeData'].forEach(f => {
      f['Price'] = Math.round((f['Price'] + Number.EPSILON) * 100) / 100;
    });
    initChartData.data = testData;
    VueData.items.value = testData;
    return {VueData, showState, initChartData}
  }
}
</script>

<style scoped>

</style>