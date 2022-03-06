<template>
  <div>

    <div class="container-fluid">


      <b-collapse visible id="collapse-3" v-if="showState.showCollapse">
        <b-card>
          <div class="row col-12">
            <b-input-group prepend="股票代號" class="col-3">
              <b-form-input type="text" class="col-5" disabled v-model="individualVueData.stockInfo.note"
              ></b-form-input>
            </b-input-group>
            <b-input-group prepend="公司名稱" class="col-3">
              <b-form-input type="text" class="col-5" disabled
                            v-model="individualVueData.stockInfo.name"></b-form-input>
            </b-input-group>
            <b-input-group prepend="選擇查詢天數" class=" col-6">
              <b-form-select
                  class="col-5"
                  v-model="individualVueData.selectDay.value"
                  :options="individualVueData.selectDayOptions.value"
                  @change="changeSelectDay"
                  disabled-field="notEnabled"
              ></b-form-select>

            </b-input-group>
          </div>
        </b-card>
      </b-collapse>

      <monthly-chart v-if="showState.showTable" :initChartData="initChartData"></monthly-chart>

      <section class="col-12">
        <div class="col-12">
          <b-table
              id="table-transition-example"
              :tbody-transition-props="transProps"
              outlined
              sort
              striped
              bordered
              hover
              responsive="xl"
              :tbody-tr-class="rowClass"
              sticky-header="800px"

              :items="individualVueData.items.value"
              :fields="individualVueData.fields.value"
              :per-page="individualVueData.perPage"
              :current-page="individualVueData.currentPage"
              class=" setTB col-12"
          >

            <template #cell(Stock_num)="data">
              <a :href="`/${'sndividualStockInquiry?id='+data.value}`">{{ data.value }}</a>
            </template>
            <template #cell()="data">
              <span v-html="data.value"></span>
            </template>
            <template #foot()="data">
              <i>{{ data.label }}</i>
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
      </section>
    </div>
  </div>
</template>
<script>
import VueCompositionAPI, {onMounted, reactive, ref} from "@vue/composition-api";
import Vue from 'vue'
import GetStockData from "@/services/getStockData";
import MonthlyChart from "@/components/chartFolder/monthlyChart";
// import GetAppVueInit from "@/services/getAppVueInit";

Vue.use(VueCompositionAPI)
export default {
  components: {
    MonthlyChart
  },
  props: {
    isTypeData: Array
  },
  setup(props) {
    const pr = ref(props);
    console.log('pr', pr.value)
    const individualVueData = reactive({
      selected: {value: 'monthly_revenue'},
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      selectDayOptions: {value: ['12', '24', '36', '48', '60']},
      selectDay: {value: 12},
      stockCode: {value: null},
      stockInfo: {name: null, note: null},
      items: {value: []},
      fields: {value: []},
      currentPage: 1,
      perPage: 5,
    })


    const showState = reactive({
      showTable: true,
      showSpinner: true,
      showBCardNm: false,
      showCollapse: false,
      showPagination: false,
    })
    const initChartData = reactive({data: []})

//==============function=================


    const changeSelectDay = function () {
      // initChartData.data = null;
      //individualVueData.selectDay.value選到的天數
      showState.showTable = false;
      initChartData.data = null;
      console.log('initChartData:', initChartData.data)
      // individualVueData.items.value = [];
      // search();
      // this.$emit('changevalue', individualVueData.selectDay.value)
      setTimeout(()=>{
        search();
      },300)
    }


    //近來畫面後 可以用下拉選單 再次更新data
    const search = function () {
      let Key = {
        idName: 'monthly_revenue',
        key1: 'Ind_Monthly_Revenue_Mon',
        key2: individualVueData.stockInfo.note,
        key3: individualVueData.selectDay.value.toString(),
        key4: '1',
        key5: '1',
      }
      showState.showSpinne = true
      showState.showTable = true
      showState.showCollapse = true
      console.log('Key', Key)

      GetStockData.getUserBoard(Key).then(res => {
        let original = res.data
        console.log('original.length:', original.length)

        individualVueData.stockInfo.name = original[0]['Stock_name'];
        individualVueData.stockInfo.note = original[0]['Stock_num'];

      }).then(() => {
        showState.showTable = true;
        showState.showSpinner = false
        showState.showBCardNm = true
      }).catch(() => {
        showState.showSpinner = true
      })
    }
    onMounted(() => {
      console.log('onMounted<<')
      // showState.showSpinne = true
      showState.showTable = true
      showState.showCollapse = true
      let original = pr.value['isTypeData'];
      initChartData.data = original;
      individualVueData.stockInfo.name = original[0]['Stock_name'];
      individualVueData.stockInfo.note = original[0]['Stock_num'];
      initChartData.data = original;
      if (original.length > 0) {
        showState.showSpinner = false
        showState.showPagination = true
      }
      allFunction.editHTMLcolorClassification(original);
      individualVueData.fields.value = [{
        key: 'Year',
        label: '年份',
        thClass: 'text-center ',
        tdClass: 'text-center ',
        sortable: true
      }, {
        key: 'Month',
        label: '月份',
        thClass: 'text-center ',
        tdClass: 'text-center ',
        sortable: true
      },
        {key: 'Stock_num', label: '公司代號', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {key: 'Stock_name', label: '股票名稱', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {key: 'Price', label: '平均月股價', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {key: 'Mon_earn', label: '當月營收', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {key: 'Last_mon_earn', label: '上月營收', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {key: 'Growth_mon', label: '上月比較增減(%)', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {key: 'Last_year_mon_earn', label: '去年同月營收', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {
          key: 'Growth_year',
          label: '去年同月增減(%)',
          thClass: 'text-center ',
          tdClass: 'text-center ',
          sortable: true
        },
        {key: 'Total_earn', label: '當月累計營收', thClass: 'text-center ', tdClass: 'text-center ', sortable: true},
        {key: 'Last_total_earn', label: '去年累計營收', thClass: 'text-center ', tdClass: 'text-center ', sortable: true},
        {key: 'Grow_total_earn', label: '前期比較增減(%)', thClass: 'text-center', tdClass: 'text-center ', sortable: true},
        {key: 'Comment', label: '註記', thClass: 'text-center', tdClass: 'text-center ', sortable: true}
      ]
    })
    const allFunction = reactive({
      editHTMLcolorClassification: (res) => {
        individualVueData.items.value = res
        individualVueData.items.value.forEach((f, index, arr) => {
          let Growth_mon = f['Growth_mon']; //上月比較增減(%)
          let Growth_year = f['Growth_year']; //去年同月增減(%)
          let Grow_total_earn = f['Growth_year']; //前期比較增減(%)
          // 對應漲跌  + 紅色
          //          - 綠色
          if (Growth_mon > 0 || Growth_year > 0 || Grow_total_earn > 0) {
            arr[index]['Growth_mon'] =
                '<Strong><span style="color:red">' + arr[index]['Growth_mon'] + '</span></Strong>';
            arr[index]['Growth_year'] =
                '<Strong><span style="color:red">' + arr[index]['Growth_year'] + '</span></Strong>';
            arr[index]['Grow_total_earn'] =
                '<Strong><span style="color:red">' + arr[index]['Grow_total_earn'] + '</span></Strong>';
          } else if (Growth_mon < 0 || Growth_year < 0) {
            arr[index]['Growth_mon'] =
                '<Strong><span style="color:darkgreen">' + arr[index]['Growth_mon'] + '</span></Strong>';
            arr[index]['Growth_year'] =
                '<Strong><span style="color:darkgreen">' + arr[index]['Growth_year'] + '</span></Strong>';
            arr[index]['Grow_total_earn'] =
                '<Strong><span style="color:darkgreen">' + arr[index]['Grow_total_earn'] + '</span></Strong>';
          }


        })
        // console.log('individualVueData.items.value:',individualVueData.items.value)
      }

    })
    function rowClass(item) {
      Object.keys(item).forEach(f => {
        // console.log('*',item[f])
        let hasNegative = item[f]
        if (Number(hasNegative) < 0) {
          // console.log('**', item[f])
          // return 'text-danger'
        }
      })
    }
    const transProps = {
      // Transition name
      name: 'flip-list'
    }
    return {
      allFunction,
      individualVueData,
      showState,
      search,
      initChartData,
      changeSelectDay,
      rowClass,
      transProps
    }
  }

}
</script>
<style scoped>
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}

.td {
  color: #3a8ee6;
}

.setTB {
  white-space: nowrap;
}

.setPageBt {
  border-radius: 50rem !important;
  margin-left: 0.25rem;
  line-height: 1;

}


</style>