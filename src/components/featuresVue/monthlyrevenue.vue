<template>
  <div>
    <div class="container-fluid">

      <b-input-group prepend="個股查詢" class="mt-3">
        <b-form-input type="text" class="col-2" v-model="individualVueData.stockCode.value"
                      list="my-list-id"></b-form-input>
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

      <monthly-chart v-if="showState.showTable" :initChartData="initChartData"></monthly-chart>
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
import VueCompositionAPI, {computed, reactive, ref} from "@vue/composition-api";
import Vue from 'vue'
import GetStockData from "@/services/getStockData";
import MonthlyChart from "@/components/chartFolder/monthlyChart";
import GetAppVueInit from "@/services/getAppVueInit";

Vue.use(VueCompositionAPI)
export default {
  components: {
    MonthlyChart
  },
  setup() {
    const individualVueData = reactive({
      activeNm: {value: 'monthly_revenue'},
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      selectDayOptions: {value: ['12', '24', '36', '48', '60']},
      selectDay: {value: 12},
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
    const initChartData = {data: []}
    const selectOptions = [
      {item: 'institutional_investors', name: '法人'},
      {item: 'B', name: '個股'},
      {item: 'B', name: '個股-1'},
      {item: 'B', name: '個股-2'},
      {item: 'B', name: '個股-3'},

    ]
//==============function=================


    const changeSelectDay = function () {
      // initChartData.data = null;
      individualVueData.items.value = [];


      console.log('rows:', rows.value)
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


    const search = function () {

      individualVueData.selectDay.value = 12;

      let selectKey = {
        //Ind_Institutional_Investors_Day
        idName: null,
        key1: 'Ind_Monthly_Revenue_Mon',
        key2: individualVueData.stockCode.value.toLocaleString().substring(0, 4),
        key3: '12',
        key4: '1',
        key5: '1',
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
        console.log('original.length:', original)
        individualVueData.originalData.value = res.data //把全部資料裝到裡面
        individualVueData.originalData.value = res.data //把全部資料裝到裡面
        individualVueData.stockInfo.name = original[0]['Stock_name'];
        individualVueData.stockInfo.note = original[0]['Stock_num'];
        initChartData.data = res.data;

      }).then(() => {
        showState.showSpinner = false
        showState.showBCardNm = true
      }).catch(() => {
        showState.showSpinner = true
      })
    }


    return {
      rowClass,
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