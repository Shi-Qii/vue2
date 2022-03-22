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
            <b-input-group prepend="查詢月份數" class=" col-6">
              <b-form-select
                  class="col-5"
                  v-model="selectDay.value"
                  :options="individualVueData.selectDayOptions.value"
                  @change="changeSelectDay"
                  disabled-field="notEnabled"
              ></b-form-select>

            </b-input-group>
          </div>
        </b-card>
      </b-collapse>
      <div>
        {{ '圖表' }}
        <highcharts :options="chartOptions"></highcharts>
        <hr/>
      </div>
      <section class="col-12">
        <div class="col-12">
          <b-table
              id="table-transition-example"
              outlined
              sort
              striped
              bordered
              hover
              responsive="xl"

              sticky-header="800px"

              :items="individualVueData.items.value"
              :fields="individualVueData.fields.value"
              :per-page="individualVueData.perPage"
              :current-page="individualVueData.currentPage"
              class=" setTB col-12"
          >
            <template #cell(Growth_mon)="data" >
            <span
                :class="''+(data.value > 0 && data.value < 99.9 ? 'text-danger bold ': '' )+(data.value < 0  && data.value > (-99.9)? 'text-success bold  ': '' )+(data.value >= 100 ||data.value <= (-100)  ? 'text-light bold ': '' ) ">
              {{ data.value }}</span>
            </template>
            <template #cell(Growth_year)="data">
            <span
                :class="''+(data.value > 0 && data.value < 99.9 ? 'text-danger bold ': '' )+(data.value < 0  && data.value > (-99.9)? 'text-success bold  ': '' )+(data.value >= 100 ||data.value <= (-100)  ? 'text-light bold ': '' ) ">
              {{ data.value }}</span>
            </template>
            <template #cell(Grow_total_earn)="data">
            <span
                :class="''+(data.value > 0 && data.value < 99.9 ? 'text-danger bold ': '' )+(data.value < 0  && data.value > (-99.9)? 'text-success bold  ': '' )+(data.value >= 100 ||data.value <= (-100)  ? 'text-light bold ': '' ) ">
              {{ data.value }}</span>
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
import {Chart} from "highcharts-vue";


Vue.use(VueCompositionAPI)
export default {
  components: {
    highcharts: Chart,
  },
  props: {
    isTypeData: Array
  },
  setup(props) {
    const pr = ref(props);
    console.log('pr_Ind_Monthly_Revenue_Mon', pr.value['isTypeData'])

    const selectDay = reactive({value: 12})
    const individualVueData = reactive({
      selected: {value: 'monthly_revenue'},
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      selectDayOptions: {value: ['12', '24', '36', '48', '60']},

      stockCode: {value: null},
      stockInfo: {name: null, note: null},
      items: {value: [], allData: []},
      fields: {value: []},
      currentPage: 1,
      perPage: 12,
    })

    const dataFilter = function () {
      individualVueData.items.allData = [...pr.value['isTypeData']];
      let dataFilter = individualVueData.items.allData.filter((f, idx) => {
        return idx < 12;
      })
      individualVueData.items.value = [...dataFilter]
      console.log('dataFilter:', dataFilter)
    }
    dataFilter();
    const showState = reactive({
      showTable: true,
      showSpinner: true,
      showBCardNm: false,
      showCollapse: false,
      showPagination: false,
    })
    const initChartData = reactive({data: []})
    const selectionsDay = ref(12)

//==============function=================

    const changeSelectDay = function () {
      individualVueData.items.value = []
      let dataFilter = individualVueData.items.allData.filter((f, idx) => {
        return idx < selectDay.value;
      })
      individualVueData.items.value = [...dataFilter]
      individualVueData.perPage = selectDay.value;
      selectionsDay.value = Number(selectDay.value);
      setChartData();
    }


    const allFunction = reactive({
      editHTMLcolorClassification: (res) => {
        individualVueData.items.value = res
        individualVueData.items.value.forEach((f) => {
          let Growth_mon = f['Growth_mon']; //上月比較增減(%)
          let Growth_year = f['Growth_year']; //去年同月增減(%)
          let Grow_total_earn = f['Growth_year']; //前期比較增減(%)
        //   // 對應漲跌  + 紅色
        //   //          - 綠色
          let obj = {}
          if (Growth_mon > 100) {
            obj['Growth_mon'] = 'danger'
          }
          if (Growth_mon <= (-100)) {
            obj['Growth_mon'] = 'success'
          }
          if (Growth_year > 100) {
            obj['Growth_year'] = 'danger'
          }
          if (Growth_year <= (-100)) {
            obj['Growth_year'] = 'success'
          }
          if (Grow_total_earn > 100) {
            obj['Grow_total_earn'] = 'danger'
          }
          if (Grow_total_earn <= (-100)) {
            obj['Grow_total_earn'] = 'success'
          }
          f['_cellVariants'] = obj

        })
        // console.log('individualVueData.items.value:',individualVueData.items.value)
      },
      setField: () => {
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
          // {key: 'Stock_num', label: '公司代號', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          // {key: 'Stock_name', label: '股票名稱', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
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




    const chartOptionsData = reactive({
      date: null
      , seriesData1: null
      , seriesData2: null
      , filterData: null
      , allData: null

    })


    const chartOptions = reactive({
      chart: {
        zoomType: 'xy'
      },
      loading: {
        hideDuration: 1000,
        showDuration: 3000
      },
      title: {
        text: ' Monthly '
      },
      subtitle: {
        text: ''
      },
      xAxis: [{
        categories: [],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: '#171515'
          }
        },
        title: {
          text: '千元',
          style: {
            color: '#151515'
          }
        }
      }, { // Secondary yAxis
        title: {
          text: '股價',
          style: {
            color: '#0c0c0c'
          }
        },
        labels: {
          format: '{value}元',
          style: {
            color: '#050505'
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor:
        // theme
            'rgba(255,255,255,0.25)'
      },
      series: [{
        name: '每月營收',
        type: 'column',
        data: [],
        tooltip: {
          valueSuffix: ' ',
          animation: true
        },
        color: '#f8c839',
        marker: {
          enabled: true
        },
      },
        {
          name: '月均價',
          type: 'spline',
          yAxis: 1,
          data: [],
          tooltip: {
            valueSuffix: ' ',
            animation: true
          },
          color: '#e33232'
        }]
    });

    const setChartData = function () {

      chartOptionsData.allData = []
      chartOptionsData.allData = [...initChartData.data];
      chartOptionsData.filterData = []
      chartOptionsData.filterData = chartOptionsData.allData.filter((f, idx) => {
        return idx < selectionsDay.value
      })
      console.log('chartOptionsData.allData:', chartOptionsData.filterData)
      chartOptionsData.date = []
      chartOptionsData.seriesData1 = []
      chartOptionsData.seriesData2 = []

      let formatDate = ''

      chartOptionsData.filterData.forEach(f => {
        formatDate = f.Year + '年' + f.Month + '月';
        // formatDate = f.Year + '/' + f.Month ;
        chartOptionsData.date.unshift(formatDate);
        chartOptionsData.seriesData1.unshift(f.Mon_earn);
        chartOptionsData.seriesData2.unshift(f.Price);
      })
      chartOptions.series[0].data = chartOptionsData.seriesData1;
      chartOptions.series[1].data = chartOptionsData.seriesData2;
      chartOptions.xAxis[0].categories = chartOptionsData.date

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

      if (original.length > 0) {
        showState.showSpinner = false
        showState.showPagination = true
      }
      allFunction.editHTMLcolorClassification(original);
      allFunction.setField();
      setChartData();
    })


    return {
      allFunction,
      individualVueData,
      showState,
      initChartData,
      selectionsDay,
      changeSelectDay,
      rowClass,
      dataFilter,
      selectDay,
      chartOptions
    }
  }

}
</script>

<style>
.setTB {
  white-space: nowrap;

}


table#table-transition-example .flip-list-move {
  transition: transform 1s;
}

.table-danger, .table-danger > th, .table-danger > td {
  background-color: #ed0c24;
}

.text-danger {
  color: #e50a0a !important;
  font-weight: bold;
}


.text-success {
  color: #04661b !important;
  font-weight: bold;
}
</style>