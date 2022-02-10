<template>
  <div>
    <div v-if="state">
      <hr/>
      {{ '圖表' }}
      <highcharts  :options="chartOptions"></highcharts>

    </div>

  </div>
</template>

<script>

import {Chart} from 'highcharts-vue';
import VueCompositionAPI, {reactive, watch, ref} from "@vue/composition-api";
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
    watch(initChart.value, (newValue) => {
      /* ... */
      console.log('newValue:', newValue)
      // console.log('data__:', initChartData1.value['data'])
      chartOptionsData.date = []
      chartOptionsData.seriesData1 = []
      chartOptionsData.seriesData2 = []
      chartOptionsData.seriesData3 = []
      chartOptionsData.seriesData4 = []
      newValue.data.forEach(f => {
        chartOptionsData.date.push(numberFormatter(f.Processing_date))
        chartOptionsData.seriesData1.push(f.Dealer)
        chartOptionsData.seriesData2.push(f.Foreign_investors)
        chartOptionsData.seriesData3.push(f.Investment_trust)
        chartOptionsData.seriesData4.push(f.Total_buysell)
      })
      chartOptions.xAxis[0].categories = chartOptionsData.date;
      chartOptions.series[0].data = chartOptionsData.seriesData1;
      chartOptions.series[1].data = chartOptionsData.seriesData2;
      chartOptions.series[2].data = chartOptionsData.seriesData3;
      chartOptions.series[3].data = chartOptionsData.seriesData4;
      if (newValue.data !== null){
        console.log('newValue!== null:', newValue)
        console.log('chartOptionsData', chartOptionsData)
        state.value = true;
      }

    })

    const numberFormatter = function (num) {
      if (typeof num === 'number') {
        console.log('判斷型態:', typeof num)
        let dd = new Date(num);
        return dd.getFullYear() + '-' + Number(dd.getMonth() + 1) + '-' + dd.getDate()
      }
      return num
    }
    const chartOptions = reactive({
      chart: {
        type: 'spline'
      },
      title: {
        text: ' ',
        align: 'left'
      },
      subtitle: {
        text: ''
      },
      xAxis: [{
        categories: [],
        crosshair: true
      }],
      yAxis: {
        title: {
          text: '張數'
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [{
        name: '自營買賣超張數',
        color: 'rgba(250,231,137,0.92)',
        marker: {
          symbol: 'square'
        },
        data: []

      }, {
        name: '外資買賣超張數',
        color: '#e24a4a',
        marker: {
          symbol: 'diamond'
        },
        data: []
      },
        {
          name: '投資買賣超張數',
          color: '#95d25b',
          marker: {
            symbol: 'diamond'
          },
          data: []
        },{
          name: '總買賣超張數',
          color: '#58ace8',
          marker: {
            symbol: 'diamond'
          },
          data: []
        }
      ],

    });
    return {chartOptions, initChart, chartOptionsData,state}
  }

}
</script>