<template>
  <div>
    <div>
      {{ '圖表' }}{{selectionsDay}}
      <highcharts :options="chartOptions"></highcharts>
    </div>

  </div>
</template>

<script>

import {Chart} from 'highcharts-vue';
import VueCompositionAPI, {reactive, ref, nextTick} from "@vue/composition-api";
import Vue from 'vue'


Vue.use(VueCompositionAPI)
export default {
  components: {
    highcharts: Chart,
  },
  props: {
    initChartData: Object,
    selectionsDay: Number
  },
  setup(prop) {
    const initChart = ref(prop.initChartData)
    let selectionsDay = ref(prop.selectionsDay)
    console.log('>>>day:', selectionsDay.value)
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

    nextTick(() => {
      const filterDataFunction = function () {
        chartOptionsData.allData = []
        chartOptionsData.allData = [...initChart.value['data']];
      }


      console.log('initChart2:', initChart.value.data)
      console.log('chartOptionsData.allData:', chartOptionsData.allData)
      filterDataFunction();
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

    })

    return {chartOptions, selectionsDay, initChart}
  }

}
</script>