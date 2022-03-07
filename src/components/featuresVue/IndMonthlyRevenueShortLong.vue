<template>
  <div>
    {{ '長短期月營收' }}
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
            <b-input-group prepend="選擇查詢月份數" class=" col-6">
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

      <LongShortSpline v-if="showState.showTable" :initChartData="initChartData"></LongShortSpline>
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

import LongShortSpline from "@/components/chartFolder/LongShortSpline";
// import GetAppVueInit from "@/services/getAppVueInit";

Vue.use(VueCompositionAPI)
export default {
  components: {
    LongShortSpline
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
      selectDayOptions: {value: ['12', '24', '36', '48', '60']},
      selectDay: {value: 12},
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
      console.log('data>>:', data)
      let num = defNumber


      let chartfilterData = data.filter((f, index) => {
        return num > index
      })
      let filterData = data.filter((f, index) => {
        return num > index
      })

      console.log('filterData>>:', filterData)
      initChartData.data = chartfilterData; // 圖表val
      let tableItemsArr = []
      let tableFieldsArr = []

      let itemsObj1 = {}
      let itemsObj2 = {}

      let fieldsObj1 = {}
      // let fieldsObj2 ={}

      filterData.forEach(f => {
        itemsObj1.fromatdate = '短期比率'
        itemsObj2.fromatdate = '長期比率'

        let fromatdate = (f.Year + '/' + f.Month).toString();
        let formatred1 = ''
        let formatred2 = ''
        formatred1 = f.Growth_short;
        formatred2 = f.Growth_long;
        itemsObj1[fromatdate] = formatred1.toLocaleString();
        itemsObj2[fromatdate] = formatred2.toLocaleString();

        let fieldsObj2 = {
          key: null,
          label: null,
          thClass: 'text-center',
          tdClass: 'text-center',
          sortable: true
        }
        fieldsObj2.key = fromatdate
        fieldsObj2.label = fromatdate
        tableFieldsArr.push(fieldsObj2)

        //=============================================================
        fieldsObj1.key = 'fromatdate'
        fieldsObj1.label = '日期'
        fieldsObj1.thClass = 'text-center'
        fieldsObj1.tdClass = 'text-center'
        fieldsObj1.sortable = true
        fieldsObj1.stickyColumn = true
        // stickyColumn: true,
      })
      tableItemsArr.push(itemsObj1)
      tableItemsArr.push(itemsObj2)

      tableFieldsArr.unshift(fieldsObj1)
      console.log('itemsObj1:', itemsObj1)
      console.log('itemsObj2:', itemsObj2)
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
      let chartNum = 12;
      let filterData = original.filter((f, index) => {
        return chartNum > index
      })
      console.log('filterData:', filterData)
      initChartData.data = filterData;
      showState.showTable = true
      showState.showCollapse = true
      formatTable(12);
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