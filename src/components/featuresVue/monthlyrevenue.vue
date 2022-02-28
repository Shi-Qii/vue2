<template>
  <div>

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

      <monthly-chart v-if="showState.showTable" :initChartData="initChartData"></monthly-chart>


    </div>
  </div>
</template>
<script>
import VueCompositionAPI, {onMounted, reactive, ref} from "@vue/composition-api";
import Vue from 'vue'
import GetStockData from "@/services/getStockData";
import MonthlyChart from "@/components/chartFolder/monthlyChart";
// import GetAppVueInit from "@/services/getAppVueInit";

Vue.use(VueCompositionAPI)
export default {
  components: {
    MonthlyChart
  },
  props: {
    isTypeData: Array
  },
  setup(props) {
    const pr = ref(props);
    console.log('pr', pr.value)
    const individualVueData = reactive({
      selected: {value: 'monthly_revenue'},
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


    const showState = reactive({
      showTable: false,
      showSpinner: false,
      showBCardNm: false,
      showCollapse: false,
    })
    const initChartData = reactive({data: []})

//==============function=================


    const changeSelectDay = function () {
      // initChartData.data = null;
      //individualVueData.selectDay.value選到的天數
      showState.showTable = false;
      initChartData.data = null;
      console.log('initChartData:', initChartData.data)
      // individualVueData.items.value = [];
      // search();
      // this.$emit('changevalue', individualVueData.selectDay.value)
      setTimeout(()=>{
        search();
      },300)
    }


    //近來畫面後 可以用下拉選單 再次更新data
    const search = function () {
      let Key = {
        idName: 'monthly_revenue',
        key1: 'Ind_Monthly_Revenue_Mon',
        key2: individualVueData.stockInfo.note,
        key3: individualVueData.selectDay.value.toString(),
        key4: '1',
        key5: '1',
      }
      showState.showSpinne = true
      showState.showTable = true
      showState.showCollapse = true
      console.log('Key', Key)
      GetStockData.getUserBoard(Key).then(res => {
        let original = res.data
        console.log('original.length:', original)

        individualVueData.stockInfo.name = original[0]['Stock_name'];
        individualVueData.stockInfo.note = original[0]['Stock_num'];
        initChartData.data = original;
      }).then(() => {
        showState.showTable = true;
        showState.showSpinner = false
        showState.showBCardNm = true
      }).catch(() => {
        showState.showSpinner = true
      })
    }
    onMounted(() => {
      console.log('onMounted<<')
      // showState.showSpinne = true
      showState.showTable = true
      showState.showCollapse = true
      let original = pr.value['isTypeData'];
      initChartData.data = original;
      individualVueData.stockInfo.name = original[0]['Stock_name'];
      individualVueData.stockInfo.note = original[0]['Stock_num'];

    })

    return {
      individualVueData,
      showState,
      search,
      initChartData,
      changeSelectDay,
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