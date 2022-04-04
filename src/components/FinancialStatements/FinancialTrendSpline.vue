<template>
  <div>
    <div v-if="state">
      <hr/>
      {{ '圖表' }}
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
    const chartOptionsData = reactive({
      date: null
      , seriesData1: null
      , seriesData2: null
      , seriesData3: null
      , seriesData4: null
    })
    const reloadChart = function () {
      console.log('圖表')
      chartOptionsData.date = []
      chartOptions.xAxis[0].categories = []
      chartOptionsData.seriesData1 = []
      chartOptions.series = []
      initChart.value['data']['fields']['value'].filter(f => {
        if ('date' !== f['key']) {
          chartOptionsData.date.push(f['key']);
        }
      })
      initChart.value['data']['items']['value'].filter((x) => {
        chartOptionsData.seriesData1.push(Object.values(x))
      })

      chartOptions.xAxis[0].categories = chartOptionsData.date;
      for (let i = 0; i < initChart.value['data']['items']['value'].length; i++) {
        chartOptions.series.push({
          marker: {symbol: 'circle'},
          name: chartOptionsData.seriesData1[i].shift(),
          data: chartOptionsData.seriesData1[i].filter((f, idx) => {
            return idx < (initChart.value['data']['fields']['value'].length -1)
          })
        });
      }


      if (initChart.value['data']['fields']['value'] !== null) {
        console.log('newValue!== null:', initChart.value['data'])
        console.log('chartOptionsData', chartOptionsData)
        state.value = true;
      }
    }
    onMounted(() => {
      reloadChart();
      // console.log('chartOptions.series[0].data:',chartOptions.series[0].data.shift())
      // console.log('chartOptions.series[0].data:',chartOptions.series[1].data.shift())
    })
    watch(initChart.value['data'], (newValue, oldVal) => {
      /* ... */
      console.log('newValue:', newValue)
      console.log('oldVal:', oldVal)
      reloadChart();

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
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: '#171515'
          }
        },
        title: {
          text: '比率',
          style: {
            color: '#151515'
          }
        }
      },
        //   { // Secondary yAxis
        //   title: {
        //     text: '股價',
        //     style: {
        //       color: '#0c0c0c'
        //     }
        //   },
        //   labels: {
        //     format: '{value}元',
        //     style: {
        //       color: '#050505'
        //     }
        //   },
        //   opposite: true
        // }
      ],
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
            radius: 3,
            enabled: true
          }
        }
      },
      series: [
        //     {
        //   name: '股價',
        //   type: 'spline',
        //   dashStyle: 'shortdot',
        //   yAxis: 1,
        //   data: [],
        //   tooltip: {
        //     valueSuffix: ' ',
        //     animation: true
        //   },
        //   color: 'rgb(246,2,2)'
        // },
        // {
        //   name: '短期年增率',
        //   color: 'rgba(253,108,10,0.95)',
        //   marker: {
        //     symbol: 'circle'
        //   },
        //   data: []
        //
        // }, {
        //   name: '長期年增率',
        //   color: '#0a78ce',
        //   marker: {
        //     symbol: 'circle'
        //   },
        //   data: []
        // },

      ],

    });
    return {chartOptions, initChart, chartOptionsData, state}
  }

}
</script>