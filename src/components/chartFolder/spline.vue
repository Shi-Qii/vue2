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
    console.log('data__:', initChart.value['data'])
    const chartOptionsData = reactive({
      date: null
      , seriesData1: null
      , seriesData2: null
      , seriesData3: null
      , seriesData4: null
      , seriesData5: null
    })
    onMounted(() => {

      chartOptionsData.date = []
      chartOptionsData.seriesData1 = []
      chartOptionsData.seriesData2 = []
      chartOptionsData.seriesData3 = []
      chartOptionsData.seriesData4 = []
      chartOptionsData.seriesData5 = []
      initChart.value['data'].forEach(f => {
        chartOptionsData.date.unshift(numberFormatter(f.Processing_date))
        chartOptionsData.seriesData1.unshift(f.Dealer)
        chartOptionsData.seriesData2.unshift(f.Foreign_investors)
        chartOptionsData.seriesData3.unshift(f.Investment_trust)
        chartOptionsData.seriesData4.unshift(f.Total_buysell)
        chartOptionsData.seriesData5.unshift(f.Close_price)
      })
      chartOptions.xAxis[0].categories = chartOptionsData.date;
      chartOptions.series[1].data = chartOptionsData.seriesData1;
      chartOptions.series[2].data = chartOptionsData.seriesData2;
      chartOptions.series[3].data = chartOptionsData.seriesData3;
      chartOptions.series[4].data = chartOptionsData.seriesData4;
      chartOptions.series[0].data = chartOptionsData.seriesData5;
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
      // console.log('data__:', initChartData1.value['data'])
      // chartOptionsData.date = []
      // chartOptionsData.seriesData1 = []
      // chartOptionsData.seriesData2 = []
      // chartOptionsData.seriesData3 = []
      // chartOptionsData.seriesData4 = []
      // newValue.data.forEach(f => {
      //   chartOptionsData.date.unshift(numberFormatter(f.Processing_date))
      //   chartOptionsData.seriesData1.unshift(f.Dealer)
      //   chartOptionsData.seriesData2.unshift(f.Foreign_investors)
      //   chartOptionsData.seriesData3.unshift(f.Investment_trust)
      //   chartOptionsData.seriesData4.unshift(f.Total_buysell)
      // })
      // chartOptions.xAxis[0].categories = chartOptionsData.date;
      // chartOptions.series[0].data = chartOptionsData.seriesData1;
      // chartOptions.series[1].data = chartOptionsData.seriesData2;
      // chartOptions.series[2].data = chartOptionsData.seriesData3;
      // chartOptions.series[3].data = chartOptionsData.seriesData4;
      // if (newValue.data !== null){
      //   console.log('newValue!== null:', newValue)
      //   console.log('chartOptionsData', chartOptionsData)
      //   state.value = true;
      // }

    })

    const numberFormatter = function (num) {
      if (typeof num === 'number') {
        console.log('判斷型態:', typeof num)
        let dd = new Date(num);
        return dd.toISOString().substring(0, 10);
      }
      return num
    }
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
      yAxis:
          [{ // Primary yAxis
            labels: {
              format: '{value}',
              style: {
                color: '#171515'
              }
            },
            title: {
              text: '張數',
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
          }]
      ,
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
        {
          name: '股價',
          type: 'column',
          yAxis: 1,
          data: [],
          tooltip: {
            valueSuffix: ' ',
            animation: true
          },
          color: 'rgba(245,202,92,0.58)'
        }, {
          name: '自營買賣超張數',
          color: 'rgb(231,0,30)',
          marker: {
            symbol: 'circle'
          },
          data: []

        }, {
          name: '外資買賣超張數',
          color: '#023ef3',
          marker: {
            symbol: 'circle'
          },
          data: []
        },
        {
          name: '投信買賣超張數',
          color: '#7f7897',
          marker: {
            symbol: 'circle'
          },
          data: []
        }, {
          name: '總買賣超張數',
          color: '#036c05',
          marker: {
            symbol: 'circle'
          },
          data: []
        },

      ],

    });
    return {chartOptions, initChart, chartOptionsData, state}
  }

}
</script>