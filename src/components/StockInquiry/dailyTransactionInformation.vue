<template>
  <div>


    <div class="container-fluid ">
      <b-input-group prepend="類股查詢" class="mt-3">
        <b-form-input type="text" class="col-2" v-model="individualVueData.stockCode.value"
                      list="my-list-id"></b-form-input>
        <b-form-select
            class="col-2"
            v-model="individualVueData.selected.value"
            :options="individualVueData.selectOptions.value"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
        ></b-form-select>
        <b-input-group-append>
          <b-button @click="search" variant="outline-success">送出</b-button>


        </b-input-group-append>
      </b-input-group>

      <b-table
          outlined
          sort
          striped
          bordered
          hover
          sticky-header="100%"
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
      <datalist id="my-list-id">
        <option v-for="size in datalists" :key="size">{{ size }}</option>
      </datalist>
    </div>
  </div>
</template>
<script>
import VueCompositionAPI, { reactive, ref} from "@vue/composition-api";
import Vue from 'vue'
import GetStockData from "@/services/getStockData";
import GetAppVueInit from "@/services/getAppVueInit";

Vue.use(VueCompositionAPI)
export default {

  setup() {

    const individualVueData = reactive({
      selected: {value: '上市'},
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      selectOptions: {value: ['上市','上櫃']},
      selectDay: {value: 7},
      stockCode: {value: null},
      stockInfo: {name: null, note: null},
      items: {value: []},
      fields: {value: []},
      items1: {value: []},
      fields1: {value: []},
      items2: {value: []},
      fields2: {value: []},
      currentPage: 1,
      perPage: 5,
      data: null,
    })

    const showState = reactive({
      showTable: false,
      showSpinner: false,
      showBCardNm: false,
      showCollapse: false,
    })

    const initChartData = {data: null}

//==============function=================



    const getMainQuery = function () {




      let selectKey = {
        idName: 'every_transaction',
        key1: 'Industry_Sector_Every_Transaction',
        key2: individualVueData.stockCode.value.toLocaleString(),
        key3: individualVueData.selected.value.toLocaleString(),
        key4: '1',
        key5: '1',
      }
      console.log('selectKey', selectKey)
      GetStockData.getQueryData(selectKey)
          .then(res => {
            individualVueData.items['value'] = []
            individualVueData.items['value'] = res.data
            individualVueData.fields['value'] = []
            individualVueData.fields['value'] = [
              //登錄日期	子公司名稱	主要經營業務	地區
              {key: 'Processing_date', label: '日期', thClass: 'text-center setthfront', tdClass: 'text-center setfront', sortable: true},
              {key: 'Stock_num', label: '公司代號', thClass: 'text-center setthfront', tdClass: 'text-center setfront', sortable: true},
              {key: 'Stock_name', label: '股票名稱', thClass: 'text-center setthfront', tdClass: 'text-center setfront', sortable: true},
              {key: 'Close_price', label: '收盤價', thClass: 'text-center setthfront', tdClass: 'text-center setfront', sortable: true},
              {key: 'Open_price', label: '開盤價', thClass: 'text-center setthfront', tdClass: 'text-center setfront', sortable: true},
              {key: 'High_price', label: '最高價', thClass: 'text-center setthfront', tdClass: 'text-center setfront', sortable: true},
              {key: 'Low_price', label: '最低價', thClass: 'text-center setthfront', tdClass: 'text-center setfront', sortable: true},
              {key: 'Trading_volume', label: '成交股數', thClass: 'text-center setthfront', tdClass: 'text-center setfront', sortable: true},
              {key: 'Yield_rate', label: '殖利率', thClass: 'text-center setthfront', tdClass: 'text-center setfront', sortable: true},
              {key: 'Yield_year', label: '股利年度', thClass: 'text-center setthfront', tdClass: 'text-center setfront', sortable: true},
              {key: 'PE_rate', label: '本益比', thClass: 'text-center setthfront', tdClass: 'text-center setfront', sortable: true},
              {key: 'PB_rate', label: '股價淨值比', thClass: 'text-center setthfront', tdClass: 'text-center setfront', sortable: true},

            ]

            console.log('res>>Oversea_Company:', res)
            showState.showSpinner = false
          })
    }




    const search = function () {

      showState.showTable = true;
      getMainQuery();

    }
    //1.datalists 預選的清單
    const datalists = ref([])

    function initFn() {
      GetAppVueInit.getGetIndustrySectNameInitData().then((res) => {
        let data = res.data
        data.forEach(f => {
          datalists.value.push(f['Industry_sector'])
        })
      })
    }

    initFn();
    return {
      individualVueData,
      showState,
      datalists,
      initChartData,
      search
    }
  }

}
</script>
<style>
.setColor{
  color: #070707;
  background:radial-gradient(circle farthest-side at center, #b5c6f6, rgba(36, 94, 191, 0.79));
  font-weight: bolder;
  font-size:21px;
}

.setwidth{
  color: red;
  width: 450px;
}
.setbg{
  color: #070707;
  background:radial-gradient(circle farthest-side at center, #b5c6f6, rgba(36, 94, 191, 0.79));
  font-weight: bolder;
  font-size:160%;
}

.setfront{
  font-size:150%;
  font-weight: initial;
  color: #030303;
}

.setthfront{
  font-size:150%;
  font-weight: bold;
  color: #030303;
}

</style>
