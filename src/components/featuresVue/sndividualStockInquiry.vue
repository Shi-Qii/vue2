<template>
  <div>
    <div class="container-fluid">
      <!--      <div class="row">-->
      <!--        <div class="col-md-4">-->
      <!--          <b-card v-if="showState.showBCardNm" bg-variant="info" text-variant="white" header="當前選擇" class="text-center">-->
      <!--            <b-card-text>{{'股票資訊:'+ individualVueData.stockCode.value }}</b-card-text>-->
      <!--            <b-card-text>{{'選擇顯示天數:'+individualVueData.stockCode.value }}</b-card-text>-->
      <!--          </b-card>-->
      <!--        </div>-->

      <!--      </div>-->
      <b-input-group prepend="個股查詢" class="mt-3">
        <b-form-input type="text" class="col-2" v-model="individualVueData.stockCode.value"
                      list="my-list-id"></b-form-input>
        <b-form-select
            class="col-2"
            v-model="individualVueData.activeNm.value"
            :options="selectOptions"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
        ></b-form-select>
        <b-input-group-append>
          <b-button @click="search" variant="outline-success">送出</b-button>
          <b-button @click="clean" variant="danger">清除</b-button>
          <!--          <b-button v-b-toggle.collapse-3>Toggle Collapse</b-button>-->
        </b-input-group-append>
      </b-input-group>
      <hr/>
      <datalist id="my-list-id">
        <option v-for="size in datalists" :key="size">{{ size }}</option>
      </datalist>

      <b-collapse visible id="collapse-3" v-if="showState.showCollapse">
        <b-card>
          <div class="row col-12">
            <b-input-group prepend="股票代號" class="col-3">
              <b-form-input type="text" class="col-5" disabled v-model="individualVueData.stockInfo.note"
              ></b-form-input>
            </b-input-group>
            <b-input-group prepend="公司名稱" class="col-3">
              <b-form-input type="text" class="col-5" disabled
                            v-model="individualVueData.stockInfo.name"></b-form-input>
            </b-input-group>
            <b-input-group prepend="選擇查詢天數" class=" col-6">
              <b-form-select
                  class="col-5"
                  v-model="individualVueData.selectDay.value"
                  :options="individualVueData.selectDayOptions.value"
                  @change="changeSelectDay"
                  disabled-field="notEnabled"
              ></b-form-select>

            </b-input-group>
          </div>
        </b-card>
      </b-collapse>
      <spline ne v-if="showState.showTable" :initChartData="initChartData"></spline>
      <b-table
          outlined
          sort
          striped
          bordered
          hover
          sticky-header
          v-if="showState.showTable"
          :items="individualVueData.items.value"
          :fields="individualVueData.fields.value"
          responsive="sm"
          :per-page="individualVueData.perPage"
          :current-page="individualVueData.currentPage"
          class="setTB"
          :tbody-tr-class="rowClass"
      >
        <template #cell()="data">
          <span v-html="data.value"></span>
        </template>
      </b-table>
      <!--      <div>-->
      <!--        <b-button-group>-->
      <!--          <b-button class="setPageBt mt-1 mr-1" @click="pagination.pagination1">1</b-button>-->
      <!--          <b-button class="setPageBt mt-1 mr-1" @click="pagination.pagination2">2</b-button>-->
      <!--          <b-button class="setPageBt mt-1 mr-1" @click="pagination.pagination3">3</b-button>-->
      <!--        </b-button-group>-->
      <!--      </div>-->
      <!--      <b-pagination-->
      <!--          v-if="!showState.showSpinner"-->
      <!--          size="sm"-->
      <!--          number-of-pages="10"-->
      <!--          base-url="#"-->
      <!--          align="center"-->
      <!--          class="mt-4 text-center"-->
      <!--          v-model="individualVueData.currentPage"-->
      <!--          :total-rows="rows"-->
      <!--          :per-page="individualVueData.perPage"-->
      <!--          aria-controls="my-table"-->
      <!--      >-->
      <!--        <template #first-text><span class="text-success">First</span></template>-->
      <!--        <template #prev-text><span class="text-danger">Prev</span></template>-->
      <!--        <template #next-text><span class="text-warning">Next</span></template>-->
      <!--        <template #last-text><span class="text-info">Last</span></template>-->
      <!--        <template #ellipsis-text>-->
      <!--          <b-spinner small type="grow"></b-spinner>-->
      <!--          <b-spinner small type="grow"></b-spinner>-->
      <!--          <b-spinner small type="grow"></b-spinner>-->
      <!--        </template>-->
      <!--        <template #page="{ page, active }">-->
      <!--          <b v-if="active">{{ page }}</b>-->
      <!--          <i v-else>{{ page }}</i>-->
      <!--        </template>-->
      <!--      </b-pagination>-->

      <div v-if="showState.showSpinner" class="text-center mb-3 d-flex justify-content-between">
        <b-spinner
            v-for="variant in individualVueData.spinnerVariants.value"
            :variant="variant"
            :key="variant"
        ></b-spinner>
      </div>

    </div>
  </div>
</template>
<script>
import VueCompositionAPI, {ref, reactive, computed, onMounted} from "@vue/composition-api";
import Vue from 'vue'
import GetStockData from "@/services/getStockData";
import Spline from "../chartFolder/spline.vue"
import GetAppVueInit from "@/services/getAppVueInit";

Vue.use(VueCompositionAPI)
export default {
  components: {
    Spline
  },
  setup() {
    const individualVueData = reactive({
      activeNm: {value: 'institutional_investors'},
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      selectDayOptions: {value: ['7', '10', '20', '30', '60']},
      selectDay: {value: 7},
      stockCode: {value: null},
      stockInfo: {name: null, note: null},
      items: {value: []},
      fields: {value: []},
      currentPage: 1,
      perPage: 5,
    })
    const rows = computed(() => {

      // return individualVueData.fields.value.length
      return individualVueData.selectDay.value
    })
    const showState = reactive({
      showTable: false,
      showSpinner: false,
      showBCardNm: false,
      showCollapse: false,
    })
    const datalists = ref([])
    const initChartData = {data: null}
    const selectOptions = [
      {item: 'institutional_investors', name: '法人'},
      {item: 'B', name: '個股'},
      {item: 'B', name: '個股-1'},
      {item: 'B', name: '個股-2'},
      {item: 'B', name: '個股-3'},

    ]
//==============function=================
    const numberFormatter = function (num) {
      if (typeof num === 'number') {
        console.log('判斷型態:', typeof num)
        let dd = new Date(num);
        return dd.toISOString().substring(0, 10);
      }
      return num
    }


    const changeSelectDay = function () {
      initChartData.data = null;
      individualVueData.items.value = [];
      let num = individualVueData.selectDay.value;
      formatTable(num, 0)
      console.log('rows:', rows.value)
    }

    const formatTable = (defNumber, cutTableNum) => {
      let data = individualVueData.originalData.value
      console.log('data.length:', data.length)
      let num1 = defNumber
      let cuttb = cutTableNum
      // let num = null
      let num = 7
      let chartNum = 7
      console.log('num1', num1)
      // if (num1 > 7 && cuttb > 0) {
      if (num1 > 7) {
        console.log('cuttb', cuttb)
        chartNum = num1
      } else {
        num = 7
      }

      console.log('num', num)
      let filterData = data.filter((f, index) => {
        return chartNum > index
      })
      let chartfilterData = data.filter((f, index) => {
        return chartNum > index
      })
      initChartData.data = chartfilterData; // 圖表val
      let tableItemsArr = []
      let tableFieldsArr = []

      let itemsObj1 = {}
      let itemsObj2 = {}
      let itemsObj3 = {}
      let itemsObj4 = {}
      let fieldsObj1 = {}
      // let fieldsObj2 ={}

      filterData.forEach(f => {
        itemsObj1.Processing_date = '外資買賣超張數'
        itemsObj2.Processing_date = '投信買賣超張數'
        itemsObj3.Processing_date = '自營買賣超張數'
        itemsObj4.Processing_date = '總買賣超張數'
        // console.log(typeof f.Processing_date)
        if (typeof f.Processing_date === 'number') {
          let dateformat = numberFormatter(f.Processing_date);
          let formatred1 = ''
          let formatred2 = ''
          let formatred3 = ''
          let formatred4 = ''
          if (f.Foreign_investors < 0
          ) {
            formatred1 = '<span style="color:red">' + f.Foreign_investors + '</span>'
          } else {
            formatred1 = f.Foreign_investors;
          }
          //=============================================================
          if (f.Investment_trust < 0) {
            formatred2 = '<span style="color:red">' + f.Investment_trust + '</span>'
          } else {
            formatred2 = f.Investment_trust;
          }
          //=============================================================
          if (f.Dealer < 0) {
            formatred3 = '<span style="color:red">' + f.Dealer + '</span>'
          } else {
            formatred3 = f.Dealer;
          }
          //=============================================================
          if (f.Total_buysell < 0) {
            formatred4 = '<span style="color:red">' + f.Total_buysell + '</span>'
          } else {
            formatred4 = f.Total_buysell;
          }
          itemsObj1[dateformat] = formatred1.toLocaleString();
          itemsObj2[dateformat] = formatred2.toLocaleString();
          itemsObj3[dateformat] = formatred3.toLocaleString();
          itemsObj4[dateformat] = formatred4.toLocaleString();
          let fieldsObj2 = {
            key: null,
            label: null,
            thClass: 'text-center',
            tdClass: 'text-center',
            sortable: true
          }
          fieldsObj2.key = dateformat
          fieldsObj2.label = dateformat
          tableFieldsArr.push(fieldsObj2)
        } else {
          let dateformat = f.Processing_date.toString();
          let formatred1 = ''
          let formatred2 = ''
          let formatred3 = ''
          let formatred4 = ''
          if (f.Foreign_investors < 0
          ) {
            formatred1 = '<span style="color:red">' + f.Foreign_investors + '</span>'
          } else {
            formatred1 = f.Foreign_investors;
          }
          //=============================================================
          if (f.Investment_trust < 0) {
            formatred2 = '<span style="color:red">' + f.Investment_trust + '</span>'
          } else {
            formatred2 = f.Investment_trust;
          }
          //=============================================================
          if (f.Dealer < 0) {
            formatred3 = '<span style="color:red">' + f.Dealer + '</span>'
          } else {
            formatred3 = f.Dealer;
          }
          //=============================================================
          if (f.Total_buysell < 0) {
            formatred4 = '<span style="color:red">' + f.Total_buysell + '</span>'
          } else {
            formatred4 = f.Total_buysell;
          }
          itemsObj1[dateformat] = formatred1.toLocaleString();
          itemsObj2[dateformat] = formatred2.toLocaleString();
          itemsObj3[dateformat] = formatred3.toLocaleString();
          itemsObj4[dateformat] = formatred4.toLocaleString();
          let fieldsObj2 = {
            key: null,
            label: null,
            thClass: 'text-center',
            tdClass: 'text-center',
            sortable: true
          }
          fieldsObj2.key = dateformat
          fieldsObj2.label = dateformat
          tableFieldsArr.push(fieldsObj2)
        }
        //=============================================================
        fieldsObj1.key = 'Processing_date'
        fieldsObj1.label = '日期'
        fieldsObj1.thClass = 'text-center'
        fieldsObj1.tdClass = 'text-center'
        fieldsObj1.sortable = true
        fieldsObj1.stickyColumn = true
        // stickyColumn: true,
      })
      tableItemsArr.push(itemsObj1)
      tableItemsArr.push(itemsObj2)
      tableItemsArr.push(itemsObj3)
      tableItemsArr.push(itemsObj4)
      tableFieldsArr.unshift(fieldsObj1)
      // console.log('tableItemsArr:',tableItemsArr)
      // console.log('tableFieldsArr:',tableFieldsArr)
      individualVueData.items.value = tableItemsArr
      individualVueData.fields.value = tableFieldsArr
      //  text-danger
      console.log('individualVueData', individualVueData)
    }


    function initFn() {
      GetAppVueInit.getInitData().then((res) => {
        let da = res.data
        da.forEach(f => {
          datalists.value.push(f['Stock_nm'])
        })
      }).catch()
    }

    function clean() {
      showState.showTable = false
      showState.showCollapse = false
    }

    initFn();
    // pagination3

    const pagination = reactive({
      pagination1: () => {
        if (Number(rows.value) >= 10) {
          let a = Number(rows.value)
          let num = 7
          let filterData = []
          let chartData = []
          console.log('a:', a)
          // console.log('1:', individualVueData.fields.value)
          // console.log('2:', individualVueData.originalData.value)
          for (let i = 0; i <= num; i++) {
            // let filterData = individualVueData.originalData.value[i]
            console.log('i:', i)
            console.log('filterData:', individualVueData.originalData.value[i])
            chartData.push(individualVueData.originalData.value[i])
            filterData.unshift(individualVueData.originalData.value[i])
          }


          // let filterData = data.filter((f, index) => {
          //   return num > index
          // })
          // initChartData.data = chartData; // 圖表val
          let tableItemsArr = []
          let tableFieldsArr = []
          let itemsObj1 = {}
          let itemsObj2 = {}
          let itemsObj3 = {}
          let itemsObj4 = {}
          let fieldsObj1 = {}
          // let fieldsObj2 ={}

          filterData.forEach(f => {
            itemsObj1.Processing_date = '外資買賣超張數'
            itemsObj2.Processing_date = '投信買賣超張數'
            itemsObj3.Processing_date = '自營買賣超張數'
            itemsObj4.Processing_date = '總買賣超張數'
            // console.log(typeof f.Processing_date)
            if (typeof f.Processing_date === 'number') {
              let dateformat = numberFormatter(f.Processing_date);
              itemsObj1[dateformat] = f.Foreign_investors
              itemsObj2[dateformat] = f.Investment_trust
              itemsObj3[dateformat] = f.Dealer
              itemsObj4[dateformat] = f.Total_buysell
              let fieldsObj2 = {
                key: null,
                label: null,
                thClass: 'text-center',
                tdClass: 'text-center',
                sortable: true
              }
              fieldsObj2.key = dateformat
              fieldsObj2.label = dateformat
              tableFieldsArr.push(fieldsObj2)
            } else {
              let dateformat = f.Processing_date.toString();
              itemsObj1[dateformat] = f.Foreign_investors
              itemsObj2[dateformat] = f.Investment_trust
              itemsObj3[dateformat] = f.Dealer
              itemsObj4[dateformat] = f.Total_buysell

              let fieldsObj2 = {
                key: null,
                label: null,
                thClass: 'text-center',
                tdClass: 'text-center',
                sortable: true
              }
              fieldsObj2.key = dateformat
              fieldsObj2.label = dateformat
              tableFieldsArr.push(fieldsObj2)
            }
            //=============================================================
            fieldsObj1.key = 'Processing_date'
            fieldsObj1.label = '日期'
            fieldsObj1.thClass = 'text-center'
            fieldsObj1.tdClass = 'text-center'
            fieldsObj1.sortable = true
          })
          tableItemsArr.push(itemsObj1)
          tableItemsArr.push(itemsObj2)
          tableItemsArr.push(itemsObj3)
          tableItemsArr.push(itemsObj4)
          tableFieldsArr.unshift(fieldsObj1)
          // console.log('tableItemsArr:',tableItemsArr)
          // console.log('tableFieldsArr:',tableFieldsArr)
          individualVueData.items.value = tableItemsArr
          individualVueData.fields.value = tableFieldsArr
        }
      },
      pagination2: () => {
        if (Number(rows.value) >= 10) {
          let a = Number(rows.value)
          let num = 7
          let filterData = []
          let chartData = []
          console.log('a:', a)
          // console.log('1:', individualVueData.fields.value)
          // console.log('2:', individualVueData.originalData.value)
          for (let i = num; i <= a; i++) {
            // let filterData = individualVueData.originalData.value[i]
            console.log('i:', i)
            console.log('filterData:', individualVueData.originalData.value[i])
            chartData.push(individualVueData.originalData.value[i])
            filterData.unshift(individualVueData.originalData.value[i])
          }


          // let filterData = data.filter((f, index) => {
          //   return num > index
          // })
          // initChartData.data = chartData; // 圖表val
          let tableItemsArr = []
          let tableFieldsArr = []
          let itemsObj1 = {}
          let itemsObj2 = {}
          let itemsObj3 = {}
          let itemsObj4 = {}
          let fieldsObj1 = {}
          // let fieldsObj2 ={}

          filterData.forEach(f => {
            itemsObj1.Processing_date = '外資買賣超張數'
            itemsObj2.Processing_date = '投信買賣超張數'
            itemsObj3.Processing_date = '自營買賣超張數'
            itemsObj4.Processing_date = '總買賣超張數'
            // console.log(typeof f.Processing_date)
            if (typeof f.Processing_date === 'number') {
              //<span style="color:red">content</span>
              let dateformat = numberFormatter(f.Processing_date);
              itemsObj1[dateformat] = f.Foreign_investors
              itemsObj2[dateformat] = f.Investment_trust
              itemsObj3[dateformat] = f.Dealer
              itemsObj4[dateformat] = f.Total_buysell
              // console.log('*',f.Foreign_investors)
              let fieldsObj2 = {
                key: null,
                label: null,
                thClass: 'text-center',
                tdClass: 'text-center',
                sortable: true
              }
              fieldsObj2.key = dateformat
              fieldsObj2.label = dateformat
              tableFieldsArr.push(fieldsObj2)
            } else {
              let dateformat = f.Processing_date.toString();
              itemsObj1[dateformat] = f.Foreign_investors
              itemsObj2[dateformat] = f.Investment_trust
              itemsObj3[dateformat] = f.Dealer
              itemsObj4[dateformat] = f.Total_buysell

              let fieldsObj2 = {
                key: null,
                label: null,
                thClass: 'text-center',
                tdClass: 'text-center',
                sortable: true
              }
              fieldsObj2.key = dateformat
              fieldsObj2.label = dateformat
              tableFieldsArr.push(fieldsObj2)
            }
            //=============================================================
            fieldsObj1.key = 'Processing_date'
            fieldsObj1.label = '日期'
            fieldsObj1.thClass = 'text-center'
            fieldsObj1.tdClass = 'text-center'
            fieldsObj1.sortable = true
          })
          tableItemsArr.push(itemsObj1)
          tableItemsArr.push(itemsObj2)
          tableItemsArr.push(itemsObj3)
          tableItemsArr.push(itemsObj4)
          tableFieldsArr.unshift(fieldsObj1)
          // console.log('tableItemsArr:',tableItemsArr)
          // console.log('tableFieldsArr:',tableFieldsArr)
          individualVueData.items.value = tableItemsArr
          individualVueData.fields.value = tableFieldsArr

        }
        // formatTable(rows.value,2)
      },
      pagination3: () => {

      }
    })

    function rowClass(item) {
      // console.log(item, '<-_______->', type)

      Object.keys(item).forEach(f => {
        // console.log('*',item[f])
        let hasNegative = item[f]
        if (Number(hasNegative) < 0) {
          // console.log('**', item[f])
          // return 'text-danger'
        }
      })
    }

    const hrefId = ref(null)

    function GetRequest() {
      var url = location.search;
      var strs = url.split("=");//获取url中"?"符后的字串
      hrefId.value = strs[1]
    }

    onMounted(() => {

      GetRequest();
      if (hrefId.value === undefined) {
        console.log('hrefId:', hrefId.value)
      } else if (hrefId.value !== undefined) {


        search();
      }


      // console.log('GetRequest:',GetRequest())

    })


    // search();
    const search = function () {
      if (individualVueData.stockCode.value !== null){
        location.search='id='+individualVueData.stockCode.value.toLocaleString().substring(0, 4)
      }
      if (hrefId.value === undefined) {
        console.log('hrefId.value === undefined:')
        individualVueData.selectDay.value = 7;
        let selectKey = {
          //Ind_Institutional_Investors_Day
          idName: null,
          key1: 'Ind_Institutional_Investors_Day',
          key2: individualVueData.stockCode.value.toLocaleString().substring(0, 4),
          key3: '60',
          key4: 'Foreign_investors',
          key5: '20',
          //objectHashMap.put("parameter4", "Foreign_investors");
          // objectHashMap.put("parameter5", "20");
        }
        showState.showSpinne = true
        showState.showTable = true
        showState.showCollapse = true

        selectKey.idName = individualVueData.activeNm.value
        // } else {
        //   selectKey.idName = hrefId.value;
        // }

        GetStockData.getUserBoard(selectKey).then(res => {
          let original = res.data
          console.log('original.length:', original.length)
          individualVueData.originalData.value = res.data //把全部資料裝到裡面
          individualVueData.stockInfo.name = original[0]['Stock_name'];
          individualVueData.stockInfo.note = original[0]['Stock_num'];
          let defSelectDay = 7 // 預設初選天數為七天
          formatTable(defSelectDay, 0);
        }).then(() => {
          showState.showSpinner = false
          showState.showBCardNm = true
        }).catch(() => {
          showState.showSpinner = true
        })
      } else if (hrefId.value !== undefined) {
        console.log('hrefId.value !== undefined:')
        individualVueData.selectDay.value = 7;
        let selectKey = {
          //Ind_Institutional_Investors_Day
          idName: null,
          key1: 'Ind_Institutional_Investors_Day',
          key2: hrefId.value.toString(),
          key3: '60',
          key4: 'Foreign_investors',
          key5: '20',
          //objectHashMap.put("parameter4", "Foreign_investors");
          // objectHashMap.put("parameter5", "20");
        }
        showState.showSpinne = true
        showState.showTable = true
        showState.showCollapse = true
        selectKey.idName = individualVueData.activeNm.value


        GetStockData.getUserBoard(selectKey).then(res => {
          let original = res.data
          console.log('original.length:', original.length)
          individualVueData.originalData.value = res.data //把全部資料裝到裡面
          individualVueData.stockInfo.name = original[0]['Stock_name'];
          individualVueData.stockInfo.note = original[0]['Stock_num'];
          let defSelectDay = 7 // 預設初選天數為七天
          formatTable(defSelectDay, 0);
        }).then(() => {
          showState.showSpinner = false
          showState.showBCardNm = true


        }).catch(() => {
          showState.showSpinner = true
        })
      }
    }


    return {
      rowClass,
      pagination,
      individualVueData,
      showState,
      selectOptions,
      search,
      datalists,
      initChartData,
      changeSelectDay,
      rows,
      clean,
    }
  }

}
</script>
<style scoped>
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}

.td {
  color: #3a8ee6;
}

.setTB {
  white-space: nowrap;
}

.setPageBt {
  border-radius: 50rem !important;
  margin-left: 0.25rem;
  line-height: 1;

}


</style>