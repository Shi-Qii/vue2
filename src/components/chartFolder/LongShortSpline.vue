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
import VueCompositionAPI, {reactive, watch, ref,onMounted} from "@vue/composition-api";
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

      initChart.value['data'].forEach(f => {
      let fromatdate =  (f.Year+'/'+f.Month).toString();
        chartOptionsData.date.unshift(fromatdate)
        chartOptionsData.seriesData1.unshift(f.Growth_short)
        chartOptionsData.seriesData2.unshift(f.Growth_long)

      })
      chartOptions.xAxis[0].categories = chartOptionsData.date;
      chartOptions.series[0].data = chartOptionsData.seriesData1;
      chartOptions.series[1].data = chartOptionsData.seriesData2;

      if (initChart.value['data'].data !== null){
        console.log('newValue!== null:', initChart.value['data'])
        console.log('chartOptionsData', chartOptionsData)
        state.value = true;
      }
    })
    watch(initChart.value['data'], (newValue,oldVal) => {
      /* ... */
      console.log('newValue:', newValue)
      console.log('oldVal:', oldVal)


    })


    const chartOptions = reactive({
      chart: {
        // type: 'spline',
        // inverted: true
        type: 'spline',
        scrollablePlotArea: {
          minWidth: 600,
          scrollPositionX: 1
        }
      },
      navigation: {
        menuItemStyle: {
          fontSize: '10px'
        }
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
          lineWidth: 2,
          states: {
            hover: {
              lineWidth: 3
            }
          },
          marker: {
            radius:3,
            enabled: true
          }
        }
      },
      series: [{
        name: '短期年增率',
        color: 'rgba(253,108,10,0.95)',
        marker: {
          symbol: 'circle'
        },
        data: []

      }, {
        name: '長期年增率',
        color: '#0a78ce',
        marker: {
          symbol: 'circle'
        },
        data: []
      },

      ],

    });
    return {chartOptions, initChart, chartOptionsData,state}
  }

}
</script>