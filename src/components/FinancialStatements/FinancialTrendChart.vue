<template>
  <div>
    <div class="container-fluid">
      <b-input-group prepend="個股查詢" class="mt-3">
        <b-form-input type="text" class="col-2" list="my-list-id" v-model="vueData.stockCode.value"
        ></b-form-input>
        <b-form-select
            class="col-2"
            v-model="vueData.selected2.value"
            :options="vueData.selectOptions.value"
            value-field="value"
            text-field="text"
            @change="changTalbe"
        ></b-form-select>
        <b-input-group-append>
          <b-button @click="search" variant="outline-success">送出</b-button>
          <!--          <b-button @click="clean" variant="danger">清除</b-button>-->

        </b-input-group-append>
      </b-input-group>
      <b-collapse visible id="collapse-3" v-if="showState.showCollapse">
        <b-card>
          <div class="row col-12">
            <b-input-group prepend="股票代號" class="col-3">
              <b-form-input type="text" class="col-5" disabled v-model="vueData.stockInfo.note"
              ></b-form-input>
            </b-input-group>
            <b-input-group prepend="公司名稱" class="col-3">
              <b-form-input type="text" class="col-5" disabled
                            v-model="vueData.stockInfo.name"></b-form-input>
            </b-input-group>
            <b-input-group prepend="選擇查詢月份數" class=" col-3">
              <b-form-select
                  class="col-5"
                  v-model="vueData.selectDay.value"
                  :options="vueData.selectDayOptions.value"
              ></b-form-select>
            </b-input-group>
            <b-input-group prepend="選擇單季或累季" class=" col-3">
              <b-form-select
                  class="col-5"
                  v-model="vueData.selected.value"
                  :options="vueData.selectedOptions.value"
              ></b-form-select>
            </b-input-group>
          </div>
        </b-card>
      </b-collapse>

      <b-table
          outlined
          sort
          striped
          bordered
          hover
          sticky-header
          v-if="showState.showTable"
          :items="vueData.items.value"
          :fields="vueData.fields.value"
          responsive="sm"
          :per-page="vueData.perPage"
          :current-page="vueData.currentPage"
          class="setTB"
      >

      </b-table>
      <div v-if="showState.showSpinner" class="text-center mb-3 d-flex justify-content-between">
        <b-spinner
            v-for="variant in  vueData.spinnerVariants.value"
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
import VueCompositionAPI, {reactive, ref,} from "@vue/composition-api";
import GetAppVueInit from "@/services/getAppVueInit";
import Vue from "vue";
import GetStockData from "@/services/getStockData";
import GetField from "@/services/getMoreTableField";

Vue.use(VueCompositionAPI)
export default {
  name: "FinancialTrendChart"
  , setup() {
    /*
    獲利能力
    獲利年成長率
    各項資產佔總資產比重
    資產季成長率
    資產年成長率
    負債&股東權益佔總資產
    負債&股東權益季增減率
    負債&股東權益年增減率
    償債能力
    經營能力
    現金流量狀況
    其他指標
*/

    const stockCode = ref('')

    const vueData = reactive({
      provisionalData: null,
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      selectDayOptions: {value: ['8', '16', '24', '32']},
      selectDay: {value: '8'},
      stockCode: {value: null},
      selected: {value: '累季'},
      selectedOptions: {value: ['單季', '累季']},
      stockInfo: {name: null, note: null},
      items: {value: []},
      fields: {value: []},
      currentPage: 1,
      perPage: 5,
      data: null,
      selected2: {value: null},
      selectOptions: {
        value: [{text: '獲利能力', value: '獲利能力'},
          {text: '獲利年成長率', value: '獲利年成長率'},
          {text: '各項資產佔總資產比重', value: '各項資產佔總資產比重'},
          {text: '資產季成長率', value: '資產季成長率'},
          {text: '資產年成長率', value: '資產年成長率'},
          {text: '負債&股東權益佔總資產', value: '負債&股東權益佔總資產'},
          {text: '負債&股東權益季增減率', value: '負債&股東權益季增減率'},
          {text: '負債&股東權益年增減率', value: '負債&股東權益年增減率'},
          {text: '償債能力', value: '償債能力'},
          {text: '經營能力', value: '經營能力'},
          {text: '現金流量狀況', value: '現金流量狀況'},
          {text: '其他指標', value: '其他指標'},]
      }
    })

    const search = function () {
      //Financial_Ratio
      console.log('stockCode.value:', vueData.stockCode.value)
      console.log('vueData.selected2.value', vueData.selected2.value)
      showState.showCollapse = true;


      showState.showSpinner = true
      showState.showPagination = false
      showState.showTable = true
      //def 預設查詢是累加 === accumulate 對應 Comprehensive_Income
      let def = 'Financial_Ratio';
      let def2 = 'Financial_Ratio_Season';
      searchforRequest(def);
      searchforRequest(def2);
    }
    const searchforRequest = function (keyOne) {
      let selectKey = {
        idName: 'financial_report',
        key1: keyOne.toString(),
        key2: vueData.stockCode.value.toLocaleString().substring(0, 4),
        key3: '1',
        key4: '1',
        key5: '1',
      }
      vueData.stockInfo.note = vueData.stockCode.value.toLocaleString().substring(0, 4);
      showState.showSpinner = true;
      GetStockData.getUserBoard(selectKey).then(res => {
        vueData.provisionalData = res.data;
        showState.showSpinner = false;
        console.log(res)
        let formatData = res.data.filter((item, idx) => {
          return idx < 9
        })
        financialRatios.itemsA.profitabilityArr = [];
        financialRatios.itemsA.ProfitYearGrowArr = [];
        financialRatios.itemsA.VarAssetToTotAssetArr = [];
        financialRatios.itemsA.VarAssetQuarterGrowArr = [];
        financialRatios.itemsA.VarAssetYearGrowArrArr = [];
        financialRatios.itemsA.EquityDebtToTotAssetArr = [];
        financialRatios.itemsA.EquityDebtQuaterGrowArr = [];
        financialRatios.itemsA.EquityDebtYearGrowArr = [];
        financialRatios.itemsA.SolvencyArr = [];
        financialRatios.itemsA.CashflowStatementArr = [];
        financialRatios.itemsA.OtherIndicatorsArr = [];

        financialRatios.itemsB.profitabilityArr = [];
        financialRatios.itemsB.ProfitYearGrowArr = [];
        financialRatios.itemsB.VarAssetToTotAssetArr = [];
        financialRatios.itemsB.VarAssetQuarterGrowArr = [];
        financialRatios.itemsB.VarAssetYearGrowArrArr = [];
        financialRatios.itemsB.EquityDebtToTotAssetArr = [];
        financialRatios.itemsB.EquityDebtQuaterGrowArr = [];
        financialRatios.itemsB.EquityDebtYearGrowArr = [];
        financialRatios.itemsB.SolvencyArr = [];
        financialRatios.itemsB.CashflowStatementArr = [];
        financialRatios.itemsB.OtherIndicatorsArr = [];

        editFinancialRatio(formatData, keyOne);
        console.log('financialRatios_A:', financialRatios.itemsA)
        console.log('financialRatios_B:', financialRatios.itemsB)
      })
    }

    const financialRatios = reactive({
      itemsA: {
        profitabilityArr: [],
        ProfitYearGrowArr: [],
        VarAssetToTotAssetArr: [],
        VarAssetQuarterGrowArr: [],
        VarAssetYearGrowArrArr: [],
        EquityDebtToTotAssetArr: [],
        EquityDebtQuaterGrowArr: [],
        EquityDebtYearGrowArr: [],
        SolvencyArr: [],
        CashflowStatementArr: [],
        OtherIndicatorsArr: [],
      },
      itemsB: {
        profitabilityArr: [],
        ProfitYearGrowArr: [],
        VarAssetToTotAssetArr: [],
        VarAssetQuarterGrowArr: [],
        VarAssetYearGrowArrArr: [],
        EquityDebtToTotAssetArr: [],
        EquityDebtQuaterGrowArr: [],
        EquityDebtYearGrowArr: [],
        SolvencyArr: [],
        CashflowStatementArr: [],
        OtherIndicatorsArr: [],
      },
    })
    const editFinancialRatio = function (data, keyOne) {
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
      if (keyOne === 'Financial_Ratio_Season') {
        financialRatios.itemsB.profitabilityArr.push(profitability)
        financialRatios.itemsB.ProfitYearGrowArr.push(ProfitYearGrow)
        financialRatios.itemsB.VarAssetToTotAssetArr.push(VarAssetToTotAsset)
        financialRatios.itemsB.VarAssetQuarterGrowArr.push(VarAssetQuarterGrow)
        financialRatios.itemsB.VarAssetYearGrowArrArr.push(VarAssetYearGrow)
        financialRatios.itemsB.EquityDebtToTotAssetArr.push(EquityDebtToTotAsset)
        financialRatios.itemsB.EquityDebtQuaterGrowArr.push(EquityDebtQuaterGrow)
        financialRatios.itemsB.EquityDebtYearGrowArr.push(EquityDebtYearGrow)
        financialRatios.itemsB.SolvencyArr.push(Solvency)
        financialRatios.itemsB.CashflowStatementArr.push(CashflowStatement)
        financialRatios.itemsB.OtherIndicatorsArr.push(OtherIndicators)
        setTableData(keyOne);
      } else if (keyOne === 'Financial_Ratio') {
        financialRatios.itemsA.profitabilityArr.push(profitability)
        financialRatios.itemsA.ProfitYearGrowArr.push(ProfitYearGrow)
        financialRatios.itemsA.VarAssetToTotAssetArr.push(VarAssetToTotAsset)
        financialRatios.itemsA.VarAssetQuarterGrowArr.push(VarAssetQuarterGrow)
        financialRatios.itemsA.VarAssetYearGrowArrArr.push(VarAssetYearGrow)
        financialRatios.itemsA.EquityDebtToTotAssetArr.push(EquityDebtToTotAsset)
        financialRatios.itemsA.EquityDebtQuaterGrowArr.push(EquityDebtQuaterGrow)
        financialRatios.itemsA.EquityDebtYearGrowArr.push(EquityDebtYearGrow)
        financialRatios.itemsA.SolvencyArr.push(Solvency)
        financialRatios.itemsA.CashflowStatementArr.push(CashflowStatement)
        financialRatios.itemsA.OtherIndicatorsArr.push(OtherIndicators)
        setTableData(keyOne);
      }


      // console.log(financialRatios.items)
    }
    const setTableData = function (keyOne) {
      showState.showTable = false;
      vueData.fields.value = [];
      vueData.items.value = [];
      switch (vueData.selected2.value) {
        case '獲利能力' :
          showState.showTable = true
          var fields1 = (keyOne == 'Financial_Ratio') ? financialRatios.itemsA.profitabilityArr[0]['field'] : financialRatios.itemsB.profitabilityArr[0]['field'];
          var items1 = (keyOne == 'Financial_Ratio') ? financialRatios.itemsA.profitabilityArr[0]['item'] : financialRatios.itemsB.profitabilityArr[0]['item'];
          vueData.fields.value = fields1;
          vueData.items.value = items1;
          break;
        case '獲利年成長率' :
          showState.showTable = true
          var fields2 = (keyOne == 'Financial_Ratio') ? financialRatios.itemsA.ProfitYearGrowArr[0]['field'] : financialRatios.itemsB.ProfitYearGrowArr[0]['field'];
          var items2 = (keyOne == 'Financial_Ratio') ? financialRatios.itemsA.ProfitYearGrowArr[0]['item'] : financialRatios.itemsB.ProfitYearGrowArr[0]['item'];
          vueData.fields.value = fields2;
          vueData.items.value = items2;
          break;
        case '各項資產佔總資產比重' :
          showState.showTable = true
          var fields3 = (keyOne == 'Financial_Ratio') ? financialRatios.itemsA.VarAssetToTotAssetArr[0]['field'] : financialRatios.itemsB.VarAssetToTotAssetArr[0]['field'];
          var items3 = (keyOne == 'Financial_Ratio') ? financialRatios.itemsA.VarAssetToTotAssetArr[0]['item'] : financialRatios.itemsB.VarAssetToTotAssetArr[0]['item'];
          vueData.fields.value = fields3;
          vueData.items.value = items3;
          break;
        case '資產季成長率' :
          break;
        case '資產年成長率' :
          break;
        case '負債&股東權益佔總資產' :
          break;
        case '負債&股東權益季增減率' :
          break;
        case '負債&股東權益年增減率' :
          break;
        case '償債能力' :
          break;
        case '經營能力' :
          break;
        case '現金流量狀況' :
          break;
        case '其他指標' :
          break;

      }
    }
    const changTalbe = function () {
      showState.showTable = false;
      vueData.fields.value = [];
      vueData.items.value = [];
      if (vueData.selected.value == '累季') {
        console.log('切換累季');
        switch (vueData.selected2.value) {
          case '獲利能力' :
            showState.showTable = true
            var fields1 = financialRatios.itemsA.profitabilityArr[0]['field'];
            var items1 = financialRatios.itemsA.profitabilityArr[0]['item'];
            vueData.fields.value = fields1;
            vueData.items.value = items1;
            break;
          case '獲利年成長率' :
            showState.showTable = true
            var fields2 = financialRatios.itemsA.ProfitYearGrowArr[0]['field'];
            var items2 = financialRatios.itemsA.ProfitYearGrowArr[0]['item'];
            vueData.fields.value = fields2;
            vueData.items.value = items2;
            break;
          case '各項資產佔總資產比重' :
            showState.showTable = true
            var fields3 = financialRatios.itemsB.VarAssetToTotAssetArr[0]['field'];
            var items3 = financialRatios.itemsB.VarAssetToTotAssetArr[0]['item'];
            vueData.fields.value = fields3;
            vueData.items.value = items3;
            break;
          case '資產季成長率' :
            break;
          case '資產年成長率' :
            break;
          case '負債&股東權益佔總資產' :
            break;
          case '負債&股東權益季增減率' :
            break;
          case '負債&股東權益年增減率' :
            break;
          case '償債能力' :
            break;
          case '經營能力' :
            break;
          case '現金流量狀況' :
            break;
          case '其他指標' :
            break;
        }
      } else if (vueData.selected.value == '單季') {
        console.log('切換單季');
        switch (vueData.selected2.value) {
          case '獲利能力' :
            showState.showTable = true
            var fields11 = financialRatios.itemsB.profitabilityArr[0]['field'];
            var items11 = financialRatios.itemsB.profitabilityArr[0]['item'];
            vueData.fields.value = fields11;
            vueData.items.value = items11;
            break;
          case '獲利年成長率' :
            showState.showTable = true
            var fields12 = financialRatios.itemsB.ProfitYearGrowArr[0]['field'];
            var items12 = financialRatios.itemsB.ProfitYearGrowArr[0]['item'];
            vueData.fields.value = fields12;
            vueData.items.value = items12;
            break;
          case '各項資產佔總資產比重' :
            showState.showTable = true
            var fields13 = financialRatios.itemsB.VarAssetToTotAssetArr[0]['field'];
            var items13 = financialRatios.itemsB.VarAssetToTotAssetArr[0]['item'];
            vueData.fields.value = fields13;
            vueData.items.value = items13;
            break;
          case '資產季成長率' :
            break;
          case '資產年成長率' :
            break;
          case '負債&股東權益佔總資產' :
            break;
          case '負債&股東權益季增減率' :
            break;
          case '負債&股東權益年增減率' :
            break;
          case '償債能力' :
            break;
          case '經營能力' :
            break;
          case '現金流量狀況' :
            break;
          case '其他指標' :
            break;
        }
      }

    }
    const showState = reactive({
      showTable: false,
      showSpinner: false,
      showBCardNm: false,
      showCollapse: false,
    })
    //********************************初始化下拉選單*******************
    //1.datalists 預選的清單
    const datalists = ref([])

    function initFn() {
      GetAppVueInit.getInitData().then((res) => {
        let data = res.data
        data.forEach(f => {
          datalists.value.push(f['Stock_nm'])
        })
      })
    }

    initFn();
    return {stockCode, search, datalists, vueData, showState, changTalbe}
  }


}


</script>

<style scoped>

</style>