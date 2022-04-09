<template>
  <div>
    <div v-if="state">
      <hr/>
      {{ '圖表1' }}
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
    console.log('data__:', initChart.value['data'])
    const chartOptionsData = reactive({
      date: null
      , seriesData1: null
      , seriesData2: null
      , seriesData3: null
      , seriesData4: null
    })
    onMounted(() => {

      chartOptionsData.date = []
      chartOptionsData.seriesData1 = []
      chartOptionsData.seriesData2 = []
      chartOptionsData.seriesData3 = []

      initChart.value['data'].forEach(f => {
        let fromatdate = (f.Year).toString();
        chartOptionsData.date.unshift(fromatdate)
        chartOptionsData.seriesData1.unshift(f.total_cash)
        chartOptionsData.seriesData2.unshift(f.total_stock)


      })
      chartOptions.xAxis.categories = chartOptionsData.date;
      chartOptions.series[0].data = chartOptionsData.seriesData1;
      chartOptions.series[1].data = chartOptionsData.seriesData2;


      if (initChart.value['data'].data !== null) {
        console.log('newValue!== null:', initChart.value['data'])
        console.log('chartOptionsData', chartOptionsData)
        state.value = true;
      }
    })
    watch(initChart.value['data'], (newValue, oldVal) => {
      /* ... */
      console.log('newValue:', newValue)
      console.log('oldVal:', oldVal)


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

      }, {
        name: '股票股利',
        data: [],

      }]
    });
    return {chartOptions, initChart, chartOptionsData, state}
  }

}
</script>