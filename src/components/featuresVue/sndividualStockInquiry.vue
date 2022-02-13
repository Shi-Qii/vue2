<template>
  <div>
    <div>
      <b-input-group prepend="個股查詢" class="mt-3">
        <b-form-input type="text" class="col-2" v-model="individualVueData.stockCode.value" list="my-list-id"></b-form-input>
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
        </b-input-group-append>
      </b-input-group>
      <hr/>
      <datalist id="my-list-id">
        <option v-for="size in datalists" :key="size">{{ size }}</option>
      </datalist>
      <spline :initChartData="initChartData"></spline>
      <b-table
          outlined
          sort
          striped
          bordered
          hover
          sticky-header="900px"
          v-if="showState.showTable"
          :items="individualVueData.items.value"
          :fields="individualVueData.fields.value"
          responsive="sm"
      >
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
import VueCompositionAPI, {ref, reactive} from "@vue/composition-api";
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
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      stockCode: {value: null},
      items: {value: []},
      fields: {value: []},
    })
    const showState = reactive({
      showTable: false,
      showSpinner: false,
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
        return dd.getFullYear() + '-' + Number(dd.getMonth() + 1) + '-' + dd.getDate()
      }
      return num
    }
    const search = function () {
      //newObj.thClass = 'text-center text-nowrap';
      // newObj.tdClass = 'text-center text-nowrap';

      individualVueData.fields.value.push(
          {
            key: 'Processing_date',
            label: '日期',
            formatter: numberFormatter,
            thClass: 'text-center',
            tdClass: 'text-center',
            sortable: true
          },
          {key: 'Stock_num', label: '公司代號', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Stock_name', label: '股票名稱', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Dealer', label: '自營買賣超張數', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Foreign_investors', label: '外資買賣超張數', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Investment_trust', label: '投資買賣超張數', thClass: 'text-center', tdClass: 'text-center', sortable: true},
          {key: 'Total_buysell', label: '總買賣超張數', thClass: 'text-center', tdClass: 'text-center', sortable: true})
      let selectKey = {
        //Ind_Institutional_Investors_Day
        idName: null,
        key1: 'Ind_Institutional_Investors_Day',
        key2: individualVueData.stockCode.value.toLocaleString().substring(0, 4),
        key3: '10',
        key4: 'Foreign_investors',
        key5: '20',
        //objectHashMap.put("parameter4", "Foreign_investors");
        // objectHashMap.put("parameter5", "20");
      }
      showState.showSpinne = true
      showState.showTable = true
      selectKey.idName = individualVueData.activeNm.value

      GetStockData.getUserBoard(selectKey).then(res => {
        individualVueData.items = res.data;
        initChartData.data = res.data;
      }).then(() => {
        showState.showSpinner = false
      }).catch(() => {
        showState.showSpinner = true
      })
    }

    function initFn() {
      GetAppVueInit.getInitData().then((res) => {
        let da = res.data
        da.forEach(f => {
          datalists.value.push(f['Stock_nm'])
        })
      }).catch()
    }

    initFn();
    return {
      individualVueData,
      showState,
      selectOptions,
      search,
      datalists,
      initChartData
    }
  }

}
</script>