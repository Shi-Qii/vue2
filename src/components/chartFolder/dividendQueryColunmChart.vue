<template>
  <div>
    <b-collapse visible id="collapse-3" v-if="state">
      <b-card>
        <div class="row col-12">
          <b-input-group prepend="股票代號" class="col-3">
            <b-form-input type="text" class="col-5" disabled v-model="stockInfo.note"
            ></b-form-input>
          </b-input-group>
          <b-input-group prepend="公司名稱" class="col-3">
            <b-form-input type="text" class="col-5" disabled
                          v-model="stockInfo.name"></b-form-input>
          </b-input-group>

          <b-input-group prepend="選擇查詢月份數" class=" col-6">
            <b-form-select
                class="col-5"
                v-model="selectDay"
                :options="stockInfo.selectDayOptions"
                disabled-field="notEnabled"
            ></b-form-select>
          </b-input-group>
        </div>
      </b-card>
    </b-collapse>


    <div v-if="state">
      <hr/>
      <br>
      <highcharts :options="chartOptions"></highcharts>

    </div>

  </div>
</template>

<script>

import {Chart} from 'highcharts-vue';
import VueCompositionAPI, {reactive, watch, ref, onMounted} from "@vue/composition-api";
import Vue from 'vue'

Vue.use(VueCompositionAPI)
export default {
  components: {
    highcharts: Chart,
  },
  props: {
    initChartData: Object
  },
  setup(prop) {

    let state = ref(false);
    const initChart = ref(prop.initChartData)
    // console.log('data__:', initChart.value['data'])
    let globalData = ref(null);
    let selectDay = ref('5')
    const stockInfo = reactive({
      note: '',
      name: '',
      selectDayOptions: ['5', '10', '15', '20', '30'],

    })
    const chartOptionsData = reactive({
      date: null
      , seriesData1: null
      , seriesData2: null
      , seriesData3: null
      , seriesData4: null
    })
    const setChart = (data) => {
      chartOptionsData.date = []
      chartOptionsData.seriesData1 = []
      chartOptionsData.seriesData2 = []
      chartOptions.xAxis.categories = []
      chartOptions.series[0].data = []
      chartOptions.series[1].data = []

      data.forEach(f => {
        let fromatdate = (f.Year).toString();
        chartOptionsData.date.unshift(fromatdate)
        chartOptionsData.seriesData1.unshift(f.total_cash)
        chartOptionsData.seriesData2.unshift(f.total_stock)

      })
      chartOptions.xAxis.categories = chartOptionsData.date;
      chartOptions.series[0].data = chartOptionsData.seriesData1;
      chartOptions.series[1].data = chartOptionsData.seriesData2;
    }
    const filterData = (num) => {
      stockInfo.name = globalData.value[0]['Stock_name'];
      stockInfo.note = globalData.value[0]['Stock_num'];
      console.log('globalData.value', globalData.value)
      let filterResult = globalData.value.filter((fi, idx) => {
        return idx < num;
      })
      setChart(filterResult);
    }
    onMounted(() => {
      globalData.value = initChart.value['data'];
      filterData(5);

      if (initChart.value['data'].data !== null) {
        state.value = true;
      }
    })
    watch(selectDay, (newValue, oldVal) => {
      /* ... */
      console.log('newValue:', newValue, 'oldVal:', oldVal)
      filterData(Number(newValue));
    })


    const chartOptions = reactive({
      chart: {
        type: 'column'
      },

      title: {
        text: ''
      },

      xAxis: {
        categories: []
      },

      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Number of fruits'
        }
      },

      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },

      series: [{
        name: '現金股利',
        data: [],
        color: '#00E3E3'

      }, {
        name: '股票股利',
        data: [],
        color: '#FF60AF'
      }]
    });

    const showState = reactive({
      showCollapse: false,
    })
    return {chartOptions, initChart, chartOptionsData, state, showState, selectDay, stockInfo}
  }

}
</script>