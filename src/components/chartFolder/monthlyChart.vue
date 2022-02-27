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

    })
    watch(initChart.value, (newval) => {
      console.log('newval:', newval)
      chartOptionsData.date = []
      chartOptionsData.seriesData1 = []
      chartOptionsData.seriesData2 = []
      //series[0]  是月營收
      //series[1]  是月均價(股價)
      let formatDate = ''
      newval.data.forEach(f => {
        formatDate = f.Year + '年' + f.Month + '月';
        // formatDate = f.Year + '/' + f.Month ;
        chartOptionsData.date.unshift(formatDate);
        chartOptionsData.seriesData1.unshift(f.Mon_earn);
        chartOptionsData.seriesData2.unshift(f.Price);
      })
      chartOptions.series[0].data = chartOptionsData.seriesData1;
      chartOptions.series[1].data = chartOptionsData.seriesData2;
      chartOptions.xAxis[0].categories = chartOptionsData.date;
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
          valueSuffix: ' '
        },
        color: '#f8c839'
      },
        {
          name: '月均價',
          type: 'spline',
          yAxis: 1,
          data: [],
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