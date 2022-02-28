<template>
  <div>
    {{ '法人' }}
    <div class="container-fluid">
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
      <spline v-if="showState.showTable" :initChartData="initChartData"></spline>
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
      >
        <template #cell()="data">
          <span v-html="data.value"></span>
        </template>
      </b-table>
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
import VueCompositionAPI, {computed, onMounted, reactive, ref} from "@vue/composition-api";
import Vue from 'vue'
import Spline from "../chartFolder/spline.vue"
// import GetAppVueInit from "@/services/getAppVueInit";

Vue.use(VueCompositionAPI)
export default {
  components: {
    Spline
  },
  props: {
    isTypeData: Array
  },
  setup(props) {
    const pr = ref(props);
    console.log('pr', pr.value['isTypeData'])
    const individualVueData = reactive({
      selected: {value: 'institutional_investors'},
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
      data: null,
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
      showState.showTable = false;
      initChartData.data = null;
      individualVueData.items.value = [];
      setTimeout(() => {
        formatTable(individualVueData.selectDay.value);
      }, 300)

    }

    const formatTable = (defNumber) => {

      let data = individualVueData.data

      let num = defNumber


      let chartfilterData = data.filter((f, index) => {
        return num > index
      })
      let filterData = data.filter((f, index) => {
        return num > index
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
      showState.showTable = true;
      console.log('individualVueData', individualVueData)
    }


    // const hrefId = ref(null)

    // function GetRequest() {
    //   var url = location.search;
    //   var strs = url.split("=");//获取url中"?"符后的字串
    //   hrefId.value = strs[1]
    // }

    onMounted(() => {
      let original = pr.value['isTypeData'];
      individualVueData.data = pr.value['isTypeData'];
      individualVueData.stockInfo.name = original[0]['Stock_name'];
      individualVueData.stockInfo.note = original[0]['Stock_num'];
      let chartNum = 7;
      let filterData = original.filter((f, index) => {
        return chartNum > index
      })

      initChartData.data = filterData;
      showState.showTable = true
      showState.showCollapse = true
      formatTable(7);
      // GetRequest();
      // if (hrefId.value === undefined) {
      //   console.log('hrefId:', hrefId.value)
      // } else if (hrefId.value !== undefined) {
      //
      //
      //   search();
      // }


      // console.log('GetRequest:',GetRequest())

    })


    return {
      individualVueData,
      showState,
      datalists,
      initChartData,
      changeSelectDay,
      rows,
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