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
import VueCompositionAPI, {reactive, ref, watch} from "@vue/composition-api";
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
    const initChart = ref(prop.initChartData)
    const chartOptionsData = reactive({
      date: null
      , seriesData1: null
      , seriesData2: null
      , seriesData3: null
      , seriesData4: null
    })
    watch(initChart.value, (newval) => {
      console.log('newval:', newval)
      chartOptionsData.seriesData1 = []
      chartOptionsData.seriesData2 = []
      //series[0]  是月營收
      //series[1]  是月均價(股價)

      newval.data.forEach(f => {
        // chartOptionsData.seriesData1.unshift(f.Mon_earn)
        // chartOptionsData.seriesData2.unshift(f.Price)
        chartOptions.series[0].data.unshift(f.Mon_earn)
        chartOptions.series[1].data.unshift(f.Price)
      })
      console.log('chartOptionsData:', chartOptions)

    })
    const chartOptions = reactive({
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: ' Monthly '
      },
      subtitle: {
        text: ''
      },
      xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}元',
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
          format: '{value}',
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
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
          valueSuffix: ' '
        },
        color: '#f8c839'
      }, {
        name: '月均價',
        type: 'spline',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
          valueSuffix: ' '
        },

        color: '#e33232'

      }]
    });
    return {chartOptions, initChart}
  }

}
</script>