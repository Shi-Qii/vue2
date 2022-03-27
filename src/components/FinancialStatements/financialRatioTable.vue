<template>
  <div class="col-12">
    {{ individualVueData.foreignNm }}
    <hr/>
    <div class="container-fluid">
      <b-input-group class="">
        <b-input-group-text>股票代號</b-input-group-text>
        <b-form-input type="text" class="col-2"
                      v-model="individualVueData.stockCode1"></b-form-input>
        <b-input-group-append>
          <b-button @click="search" variant="outline-success">送出</b-button>
          <!--          <b-button @click="clean" variant="danger">清除</b-button>-->
        </b-input-group-append>
      </b-input-group>
      <!--      <br/>-->
      <!--      <b-form-radio-group-->
      <!--          button-variant="outline-primary"-->
      <!--          v-model="selected"-->
      <!--          :options="options"-->
      <!--          buttons-->
      <!--          @change="changeFn()"-->
      <!--      ></b-form-radio-group>-->
      <br/>
      <field-season-select @update="changeEmit1"></field-season-select>
    </div>

    <hr/>
    <section class="col-12">
      <div class="col-12">
        <div v-for="financialRatio in financialRatios.items" :key="financialRatio ">
          <b-table
              id="table-transition-example"
              :tbody-transition-props="transProps"
              outlined
              sort
              striped
              bordered
              hover
              responsive="xl"
              sticky-header="800px"
              v-if="showState.showTable"
              :items="financialRatio['item']"
              :fields="financialRatio['field']"
              :per-page="individualVueData.perPage"
              :current-page="individualVueData.currentPage"
              class=" setTB col-12"
          >
          </b-table>
        </div>


        <div v-if="showState.showSpinner" class="text-center mb-3 d-flex justify-content-between">
          <b-spinner
              v-for="variant in individualVueData.spinnerVariants.value"
              :variant="variant"
              :key="variant"
          ></b-spinner>
        </div>
        <b-pagination
            v-if="showState.showPagination"
            size="sm"
            number-of-pages="10"
            base-url="#"
            align="center"
            class="mt-4 text-center"
            v-model="individualVueData.currentPage"
            :total-rows="rows"
            :per-page="individualVueData.perPage"
            aria-controls="my-table"
        >

          <template #first-text><span class="text-success">First</span></template>
          <template #prev-text><span class="text-danger">Prev</span></template>
          <template #next-text><span class="text-warning">Next</span></template>
          <template #last-text><span class="text-info">Last</span></template>
          <template #ellipsis-text>
            <b-spinner small type="grow"></b-spinner>
            <b-spinner small type="grow"></b-spinner>
            <b-spinner small type="grow"></b-spinner>
          </template>
          <template #page="{ page, active }">
            <b v-if="active">{{ page }}</b>
            <i v-else>{{ page }}</i>
          </template>
        </b-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import VueCompositionAPI, {computed, reactive} from "@vue/composition-api";
import Vue from 'vue'
import GetStockData from "@/services/getStockData";
import GetField from '@/services/getMoreTableField'
import fieldSeasonSelect from "@/components/model_using/fieldSeasonSelect";


Vue.use(VueCompositionAPI)
export default {
  name: "financialRatioTable",
  props: {
    idName: String
  },
  components: {fieldSeasonSelect},
  setup() {
    const individualVueData = reactive({
      selected: {value: 'financial_report'},
      foreignNm: '財務比率表',
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      stockCode1: '',
      stockCode2: {value: ''},
      items: {value: [], listed: [], cabinet: []},
      fields: {
        value: []
      },
      currentPage: 1,
      perPage: 20,
    })
    const showState = reactive({
      showTable: true,
      showSpinner: false,
      showBCardNm: false,
      showCollapse: false,
      showPagination: false,
    })
    const transProps = {
      // Transition name
      name: 'flip-list'
    }


    const rows = computed(() => {
      return individualVueData.items.value.length
    })
    const financialRatios = reactive({
      items: [],
    })


    const search = function () {
      showState.showSpinner = true
      showState.showPagination = false
      showState.showTable = true
      //def 預設查詢是累加 === accumulate 對應 Comprehensive_Income
      let def = 'Financial_Ratio';
      searchforRequest(def);


    }

    const searchforRequest = function (keyOne) {

      let selectKey = {
        idName: null,
        key1: keyOne.toString(),
        key2: individualVueData.stockCode1,
        key3: '1',
        key4: '1',
        key5: '1',
      }
      //financial ratio table
      selectKey.idName = individualVueData.selected.value
      showState.showSpinner = true;
      GetStockData.getUserBoard(selectKey).then(res => {
        showState.showSpinner = false;
        console.log(res)
        // if (res.data.length > 0) {
        //   showState.showSpinner = false
        //   showState.showPagination = true
        // }


        let formatData = res.data.filter((item, idx) => {
          return idx < 10
        })
        financialRatios.items=[];
        editFinancialRatio(formatData);

      })
    }


    const changeEmit1 = function (event) {
      console.log('changeEmit1', event)
      if ('single' === event) {
        showState.showSpinner = true
        showState.showPagination = false
        showState.showTable = true
        let def = 'Financial_Ratio_Season';
        searchforRequest(def);

      } else if ('accumulate' === event) {
        showState.showSpinner = true
        showState.showPagination = false
        showState.showTable = true
        let def = 'Financial_Ratio';
        searchforRequest(def);
      }
    }

    const editFinancialRatio = function (data) {
      let value = data;
      let profitability = GetField.setFieldProfitability(value);
      let ProfitYearGrow = GetField.setFieldProfitYearGrow(value);
      let VarAssetToTotAsset = GetField.setFieldVarAssetToTotAsset(value);
      let VarAssetQuarterGrow = GetField.setFieldVarAssetQuarterGrow(value);
      let VarAssetYearGrow = GetField.setFieldVarAssetYearGrow(value);
      let EquityDebtToTotAsset = GetField.setFieldEquityDebtToTotAsset(value);
      let EquityDebtQuaterGrow = GetField.setFieldEquityDebtQuaterGrow(value);
      let EquityDebtYearGrow = GetField.setFieldEquityDebtYearGrow(value);
      let Solvency = GetField.setFieldSolvency(value);
      let CashflowStatement = GetField.setFieldCashflowStatement(value);
      let OtherIndicators = GetField.setFieldOtherIndicators(value);


      financialRatios.items.push(profitability)
      financialRatios.items.push(ProfitYearGrow)
      financialRatios.items.push(VarAssetToTotAsset)
      financialRatios.items.push(VarAssetQuarterGrow)
      financialRatios.items.push(VarAssetYearGrow)
      financialRatios.items.push(EquityDebtToTotAsset)
      financialRatios.items.push(EquityDebtQuaterGrow)
      financialRatios.items.push(EquityDebtYearGrow)
      financialRatios.items.push(Solvency)
      financialRatios.items.push(CashflowStatement)
      financialRatios.items.push(OtherIndicators)
      // console.log(financialRatios.items)
    }
    return {
      showState,
      rows,
      individualVueData,
      transProps,
      search,
      changeEmit1,
      financialRatios,

    }
  }

}
</script>
<style>
.setTB {
  white-space: nowrap;

}


table#table-transition-example .flip-list-move {
  transition: transform 1s;
}

.table-danger, .table-danger > th, .table-danger > td {
  background-color: #ed0c24;
}

.table-success, .table-success > th, .table-success > td {
  background-color: #04661b;
}

.text-danger {
  color: #0909d9 !important;
  font-weight: bold;
  font-size:21px;
}


.text-success {
  color: #04661b !important;
  font-weight: bold;
}
.setwidth {
  width: 200px;
}
</style>