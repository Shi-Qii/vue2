<template>
  <div>

    <div class="container-fluid ">
      <p>test git </p>
      <p>test rebase git </p>
      <!--      <dividendQueryColunmChart v-if="showState.showTable" :initChartData="initChartData"></dividendQueryColunmChart>-->
      <dividend-query-colunm-chart :initChartData="initChartData"></dividend-query-colunm-chart>
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
    let testData = [{"Stock_num":"2330","Year":111,"Price":622.914893617,"stock_name":"台積電","Retained_earnings_cash":2.75,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":2.75,"total_stock":2.75},{"Stock_num":"2330","Year":110,"Price":597.683127572,"stock_name":"台積電","Retained_earnings_cash":10.75,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":10.75,"total_stock":0.0},{"Stock_num":"2330","Year":109,"Price":378.6469387755,"stock_name":"台積電","Retained_earnings_cash":10.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":10.0,"total_stock":3.75},{"Stock_num":"2330","Year":108,"Price":261.7199170124,"stock_name":"台積電","Retained_earnings_cash":15.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":15.0,"total_stock":2.0},{"Stock_num":"2330","Year":107,"Price":237.4775510204,"stock_name":"台積電","Retained_earnings_cash":8.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":8.0,"total_stock":0.0},{"Stock_num":"2330","Year":106,"Price":210.1502057613,"stock_name":"台積電","Retained_earnings_cash":7.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":7.0,"total_stock":0.0},{"Stock_num":"2330","Year":105,"Price":166.4439834025,"stock_name":"台積電","Retained_earnings_cash":6.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":6.0,"total_stock":0.0},{"Stock_num":"2330","Year":104,"Price":139.8422131148,"stock_name":"台積電","Retained_earnings_cash":4.49987539,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":4.49987539,"total_stock":0.0},{"Stock_num":"2330","Year":103,"Price":122.463562753,"stock_name":"台積電","Retained_earnings_cash":3.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":3.0,"total_stock":0.0},{"Stock_num":"2330","Year":102,"Price":104.0868852459,"stock_name":"台積電","Retained_earnings_cash":2.9995522,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":2.9995522,"total_stock":0.0},{"Stock_num":"2330","Year":101,"Price":84.1170731707,"stock_name":"台積電","Retained_earnings_cash":2.99948071,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":2.99948071,"total_stock":0.0},{"Stock_num":"2330","Year":100,"Price":72.0882591093,"stock_name":"台積電","Retained_earnings_cash":2.99951,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":2.99951,"total_stock":0.0},{"Stock_num":"2330","Year":99,"Price":62.0232,"stock_name":"台積電","Retained_earnings_cash":2.99973,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.0,"Capital_surplus_stock":0.0,"total_cash":2.99973,"total_stock":0.0},{"Stock_num":"2330","Year":98,"Price":55.605465587,"stock_name":"台積電","Retained_earnings_cash":2.99989,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.01999,"Capital_surplus_stock":0.02999,"total_cash":2.99989,"total_stock":0.04998},{"Stock_num":"2330","Year":97,"Price":56.4423694779,"stock_name":"台積電","Retained_earnings_cash":3.02507,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.02016,"Capital_surplus_stock":0.03025,"total_cash":3.02507,"total_stock":0.05041},{"Stock_num":"2330","Year":96,"Price":65.504526749,"stock_name":"台積電","Retained_earnings_cash":2.9995,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.01999,"Capital_surplus_stock":0.02999,"total_cash":2.9995,"total_stock":0.04998},{"Stock_num":"2330","Year":95,"Price":61.3315789474,"stock_name":"台積電","Retained_earnings_cash":2.4991,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.14995,"Capital_surplus_stock":0.14995,"total_cash":2.4991,"total_stock":0.2999},{"Stock_num":"2330","Year":94,"Price":55.8005882353,"stock_name":"台積電","Retained_earnings_cash":1.9998,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.49997,"Capital_surplus_stock":0.0,"total_cash":1.9998,"total_stock":0.49997},{"Stock_num":"2330","Year":93,"Price":null,"stock_name":"台積電","Retained_earnings_cash":0.6,"Capital_surplus_cash":0.0,"Retained_earnings_stock":1.4,"Capital_surplus_stock":0.0,"total_cash":0.6,"total_stock":1.4},{"Stock_num":"2330","Year":92,"Price":null,"stock_name":"台積電","Retained_earnings_cash":0.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.8,"Capital_surplus_stock":0.0,"total_cash":0.0,"total_stock":0.8},{"Stock_num":"2330","Year":91,"Price":null,"stock_name":"台積電","Retained_earnings_cash":0.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":1.0,"Capital_surplus_stock":0.0,"total_cash":0.0,"total_stock":1.0},{"Stock_num":"2330","Year":90,"Price":null,"stock_name":"台積電","Retained_earnings_cash":0.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":4.0,"Capital_surplus_stock":0.0,"total_cash":0.0,"total_stock":4.0},{"Stock_num":"2330","Year":89,"Price":null,"stock_name":"台積電","Retained_earnings_cash":0.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":2.555,"Capital_surplus_stock":0.245,"total_cash":0.0,"total_stock":2.8},{"Stock_num":"2330","Year":88,"Price":null,"stock_name":"台積電","Retained_earnings_cash":0.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":2.3,"Capital_surplus_stock":0.0,"total_cash":0.0,"total_stock":2.3},{"Stock_num":"2330","Year":87,"Price":null,"stock_name":"台積電","Retained_earnings_cash":0.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":4.5,"Capital_surplus_stock":0.0,"total_cash":0.0,"total_stock":4.5},{"Stock_num":"2330","Year":86,"Price":null,"stock_name":"台積電","Retained_earnings_cash":0.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":5.0,"Capital_surplus_stock":0.0,"total_cash":0.0,"total_stock":5.0},{"Stock_num":"2330","Year":85,"Price":null,"stock_name":"台積電","Retained_earnings_cash":0.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":8.0,"Capital_surplus_stock":0.0,"total_cash":0.0,"total_stock":8.0},{"Stock_num":"2330","Year":84,"Price":null,"stock_name":"台積電","Retained_earnings_cash":0.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":8.0,"Capital_surplus_stock":0.0,"total_cash":0.0,"total_stock":8.0},{"Stock_num":"2330","Year":83,"Price":null,"stock_name":"台積電","Retained_earnings_cash":1.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":2.48,"Capital_surplus_stock":0.0,"total_cash":1.0,"total_stock":2.48},{"Stock_num":"2330","Year":82,"Price":null,"stock_name":"台積電","Retained_earnings_cash":0.0,"Capital_surplus_cash":0.0,"Retained_earnings_stock":1.04,"Capital_surplus_stock":0.0,"total_cash":0.0,"total_stock":1.04},{"Stock_num":"2330","Year":81,"Price":null,"stock_name":"台積電","Retained_earnings_cash":0.1,"Capital_surplus_cash":0.0,"Retained_earnings_stock":0.4,"Capital_surplus_stock":0.0,"total_cash":0.1,"total_stock":0.4}]
    console.log(testData)
    // VueData.items.value = testData;
    let data = pr.value['isTypeData']
    data.forEach(f => {
      f['Price'] = Math.round((f['Price'] + Number.EPSILON) * 100) / 100;
    });
    initChartData.data = data;
    VueData.items.value = data;
    return {VueData, showState, initChartData}
  }
}
</script>

<style scoped>

</style>