<template>
  <div>
    <div>
      {{ '圖表' }}
      <highcharts :options="chartOptions"></highcharts>

    </div>

  </div>
</template>

<script>

import {Chart} from 'highcharts-vue';
import VueCompositionAPI, {reactive} from "@vue/composition-api";
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
    const initChartData1 = prop.initChartData
    console.log('initChartData1:', initChartData1['aa'])
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
        categories: [
          '2021-12-29',
          '2021-12-30',
          '2021-12-31',
          '2022-01-03',
          '2022-01-04',
          '2022-01-05',
          '2022-01-06',
          '2022-01-07',
          '2022-01-10',
          '2022-01-11',
          '2022-01-12',
          '2022-01-13',
        ],
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
        color:'rgba(250,231,137,0.92)',
        marker: {
          symbol: 'square'
        },
        data: [345, -1005, 425, 1176, 1181, -281, 1195, 2133, 359, 923]

      }, {
        name: '外資買賣超張數',
        color:'#e24a4a',
        marker: {
          symbol: 'diamond'
        },
        data: [15115, 8261, -343, -10093, -11445, 4788, 29781, 32537, -46, 4949]
      }],

    });
    return {chartOptions}
  }

}
</script>