<template>
  <div>
    <div class="container-fluid">
      <b-input-group prepend="個股查詢" class="mt-3">
        <b-form-input type="text" class="col-2" v-model="mainVueData.stockCode.value"
                      list="my-list-id"></b-form-input>
        <b-form-select
            class="col-2"
            v-model="mainVueData.selected.value"
            :options="mainVueData.selectOptions.value"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
        ></b-form-select>
        <b-input-group-append>
          <b-button @click="search" variant="outline-success">送出</b-button>
          <b-button @click="clean" variant="danger">清除</b-button>

        </b-input-group-append>
      </b-input-group>
      <br>
      <component :is="isType" :isTypeData="isTypeData">
      </component>


      <div v-if="showState.showSpinner" class="text-center mb-3 d-flex justify-content-between">
        <b-spinner
            v-for="variant in mainVueData.spinnerVariants.value"
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
import VueCompositionAPI from "@vue/composition-api";
import {reactive, ref, watch, onMounted} from "@vue/composition-api";
import Vue from "vue";
import GetAppVueInit from "@/services/getAppVueInit";
import basicCompanyInformation from "@/components/featuresVue/basicCompanyInformation";
import dividendQuery from "@/components/featuresVue/dividendQuery";
import sndividualStockInquiry from "@/components/featuresVue/sndividualStockInquiry";
import monthlyrevenue from "@/components/featuresVue/monthlyrevenue";
import indMonthlyRevenueShortLong from "@/components/featuresVue/IndMonthlyRevenueShortLong";
import GetStockData from "@/services/getStockData";

Vue.use(VueCompositionAPI)
export default {
  name: "mainStockSearch",
  /*
  ********對應各個節點*********
  * |單一查詢   | sndividualStockInquiry
  * |月營收    | monthlyrevenue
  * |長短期月營收    | monthlyrevenue
  * |公司基本資料    | monthlyrevenue

   */
  components: {
    sndividualStockInquiry,
    monthlyrevenue,
    indMonthlyRevenueShortLong,
    basicCompanyInformation,
    dividendQuery
  },
  setup() {


    //*************************************************************
    //1.整個mainVueData在此包裝避免過多return
    //2.每個物件都要加value統一辨別
    const mainVueData = reactive({
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      selected: {value: null},
      stockCode: {value: null},
      selectOptions: {
        value: [{
          item: {
            idName: 'institutional_investors',
            functionKey: 'Ind_Institutional_Investors_Day',
            key2: '來自輸入框的值',
            key3: '60',
            key4: 'Foreign_investors',
            key5: '20',
            entrance: 'sndividualStockInquiry'
          }, name: '法人'
        },
          //  月營收預設顯示12個月-key3
          {
            item: {
              idName: 'monthly_revenue',
              functionKey: 'Ind_Monthly_Revenue_Mon',
              key2: '來自輸入框的值',
              key3: '60',
              key4: '1',
              key5: '1',
              entrance: 'monthlyrevenue'
            }, name: '月營收'
          },
          {
            item: {
              idName: 'monthly_revenue',
              functionKey: 'Ind_Monthly_Revenue_Short_Long',
              key2: '來自輸入框的值',
              key3: '1',
              key4: '1', //預設撈60個月，預設顯示12個月
              key5: '1',
              entrance: 'indMonthlyRevenueShortLong'
            }, name: '長短期月營收'
          },
          {
            item: {
              // 個股_基本資料	Basic_Info	Basic_info	basic_info.py	Check代碼	股票代碼
              // 個股_重要子公司	Important_Subsidiary	Important_subsidiary	basic_info.py	Check代碼	股票代碼
              // 個股_海外子公司	Oversea_Company	Oversea_company	basic_info.py	Check代碼	股票代碼
              idName: 'basic_info',
              functionKey: 'Oversea_Company',
              key2: '來自輸入框的值',
              key3: '1',
              key4: '1',
              key5: '1',
              entrance: 'basicCompanyInformation'
            }, name: '公司基本資料'
          },
          //股利查詢
          {
            item: {
              idName: 'financial_report',
              functionKey: 'Stock_Dividen',
              key2: '來自輸入框的值',
              key3: '1',
              key4: '1',
              key5: '1',
              entrance: 'dividendQuery'
            }
            , name: '股利查詢'
          }
          ]
      }
    })
//*************************************changevaluefoSeach***********************
    //1.來自子元件的值再送一次請求
    // const changevaluefoSeach = function (event) {
    //   console.log('event:', event)
    //   clean();
    //   showState.showSpinner = true
    //   isTypeData.value = null;
    //   setTimeout(()=>{
    //     let  Key = {
    //       idName: mainVueData.selected.value.idName,
    //       key1: mainVueData.selected.value.functionKey,
    //       key2: mainVueData.stockCode.value.toLocaleString().substring(0, 4),
    //       key3: event.toString(),
    //       key4: mainVueData.selected.value.key4,
    //       key5: mainVueData.selected.value.key5,
    //     }
    //     console.log('mainVueData.selected.value:', mainVueData.selected.value)
    //     console.log('selectKey:', Key)
    //
    //     GetStockData.getUserBoard(Key)
    //         .then(res => {
    //           isType.value = 'monthlyrevenue';
    //           isTypeData.value = res.data;
    //           console.log('res:', res)
    //           showState.showSpinner = false
    //
    //         })
    //   },500)
    //
    // }
    //********************************isType對應個元件切換的種類*******************
    //1.送出之前要決定哪一種查詢，統一由search function查詢後再回塞給componentdata
    const isType = ref(null);
    const isTypeData = ref(null);
    const search = function () {
      isType.value = null;
      if (isType.value === null) {
        showState.showSpinner = true
        if (mainVueData.selected.value.functionKey === 'Ind_Monthly_Revenue_Short_Long') {
          let selectKey = {
            idName: mainVueData.selected.value.idName,
            key1: mainVueData.selected.value.functionKey,
            key2: mainVueData.stockCode.value.toLocaleString().substring(0, 4),
            key3: mainVueData.selected.value.key3,
            key4: mainVueData.selected.value.key4,
            key5: mainVueData.selected.value.key5,
          }
          console.log('mainVueData.selected.value:', mainVueData.selected.value)

          GetStockData.getQueryData(selectKey)
              .then(res => {
                isType.value = mainVueData.selected.value.entrance;
                isTypeData.value = res.data;
                console.log('res:', res)
                showState.showSpinner = false

              })
        }else if (mainVueData.selected.value.functionKey === 'Ind_Monthly_Revenue_Mon'){
          let selectKey = {
            idName: mainVueData.selected.value.idName,
            key1: mainVueData.selected.value.functionKey,
            key2: mainVueData.stockCode.value.toLocaleString().substring(0, 4),
            key3: mainVueData.selected.value.key3,
            key4: mainVueData.selected.value.key4,
            key5: mainVueData.selected.value.key5,
          }
          console.log('mainVueData.selected.value_Ind_Monthly_Revenue_Mon:', mainVueData.selected.value)

          GetStockData.getQueryData(selectKey)
              .then(res => {
                isType.value = mainVueData.selected.value.entrance;
                isTypeData.value = res.data;
                console.log('res>>Ind_Monthly_Revenue_Mon:', res)
                showState.showSpinner = false

              })

        }else if (mainVueData.selected.value.functionKey === 'Oversea_Company'){
          isType.value = mainVueData.selected.value.entrance;
          let inputValue= mainVueData.stockCode.value.toLocaleString().substring(0, 4);
          isTypeData.value = inputValue;
          showState.showSpinner = false
          // let selectKey = {
          //   idName: mainVueData.selected.value.idName,
          //   key1: mainVueData.selected.value.functionKey,
          //   key2: mainVueData.stockCode.value.toLocaleString().substring(0, 4),
          //   key3: mainVueData.selected.value.key3,
          //   key4: mainVueData.selected.value.key4,
          //   key5: mainVueData.selected.value.key5,
          // }
          // console.log('mainVueData.selected.value_Oversea_Company:', mainVueData.selected.value)
          //
          // GetStockData.getUserBoard(selectKey)
          //     .then(res => {
          //       isType.value = mainVueData.selected.value.entrance;
          //       isTypeData.value = res.data;
          //       console.log('res>>Oversea_Company:', res)
          //       showState.showSpinner = false
          //
          //     })

        }else if (mainVueData.selected.value.functionKey === 'Stock_Dividen') {
          let selectKey = {
            idName: mainVueData.selected.value.idName,
            key1: mainVueData.selected.value.functionKey,
            key2: mainVueData.stockCode.value.toLocaleString().substring(0, 4),
            key3: mainVueData.selected.value.key3,
            key4: mainVueData.selected.value.key4,
            key5: mainVueData.selected.value.key5,
          }
          console.log('mainVueData.selected.value:', mainVueData.selected.value)

          GetStockData.getQueryData(selectKey)
              .then(res => {
                isType.value = mainVueData.selected.value.entrance;
                isTypeData.value = res.data;
                console.log('res:', res)
                showState.showSpinner = false

              })
        }else {
          let selectKey = {
            idName: mainVueData.selected.value.idName,
            key1: mainVueData.selected.value.functionKey,
            key2: mainVueData.stockCode.value.toLocaleString().substring(0, 4),
            key3: mainVueData.selected.value.key3,
            key4: mainVueData.selected.value.key4,
            key5: mainVueData.selected.value.key5,
          }
          console.log('mainVueData.selected.value:', mainVueData.selected.value)

          GetStockData.getQueryData(selectKey)
              .then(res => {
                isType.value = mainVueData.selected.value.entrance;
                isTypeData.value = res.data;
                console.log('res:', res)
                showState.showSpinner = false

              })
        }
      }


    }
    const clean = function () {
      isType.value = null;
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
    //*****************Watch********

    watch(isTypeData, (newval, oldval) => {
      console.log('newval:', newval);
      console.log('oldval:', oldval);
    })
    onMounted(() => {
      const url = location.href;
      let isUrl;
      isUrl = url.split('?')[1];
      if (isUrl !== 'undefined') {
        let id = "";
        let params1 = "";
        let type1 = "";
        //在此直接將各自的參數資料切割放進ary中
        let ary = url.split('?')[1].split('&');
        //下迴圈去搜尋每個資料參數
        for (let i = 0; i <= ary.length - 1; i++) {
          //如果資料名稱為id的話那就把他取出來
          if (ary[i].split('=')[0] == 'id') {
            id = ary[i].split('=')[1];
          } else if (ary[i].split('=')[0] == 'params') {
            params1 = ary[i].split('=')[1];
          }else if (ary[i].split('=')[0] == 'type') {
            type1 = ary[i].split('=')[1];
          }
        }
        console.log('type1',type1)
        if ('institutional_investors' === params1) {
          mainVueData.selected.value = {
            "idName": "institutional_investors",
            "functionKey": "Ind_Institutional_Investors_Day",
            "key2": "來自輸入框的值",
            "key3": "60",
            "key4": "Foreign_investors",
            "key5": "20",
            "entrance": "sndividualStockInquiry"
          }
        } else if ('monthly_revenue' === params1&& type1 !=='Ind_Monthly_Revenue_Short_Long') {
          mainVueData.selected.value = {
            "idName": "monthly_revenue",
            "functionKey": "Ind_Monthly_Revenue_Mon",
            "key2": "來自輸入框的值",
            "key3": "60",
            "key4": "1",
            "key5": "1",
            "entrance": "monthlyrevenue"
          }
        }else if ('monthly_revenue' === params1 && type1 ==='Ind_Monthly_Revenue_Short_Long'){
          mainVueData.selected.value = {
            "idName": "monthly_revenue",
            "functionKey": "Ind_Monthly_Revenue_Short_Long",
            "key2": "來自輸入框的值",
            "key3": "1",
            "key4": "1",
            "key5": "1",
            "entrance": "indMonthlyRevenueShortLong"
          }
        }
        mainVueData.stockCode.value = id;
        search();






      }


    })
    return {
      mainVueData, datalists, search, clean, isType, isTypeData, showState
    }
  }
}
</script>

<style scoped>

</style>