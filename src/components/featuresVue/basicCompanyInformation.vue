<template>
  <div>
    {{ '基本公司資訊' }}
    <div class="container-fluid">


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
          class="setTB"
      >

      </b-table>
      <b-table
          outlined
          sort
          striped
          bordered
          hover
          sticky-header
          v-if="showState.showTable"
          :items="individualVueData.items1.value"
          :fields="individualVueData.fields1.value"
          responsive="sm"
          class="setTB"
      >

      </b-table>
      <b-table
          outlined
          sort
          striped
          bordered
          hover
          sticky-header
          v-if="showState.showTable"
          :items="individualVueData.items2.value"
          :fields="individualVueData.fields2.value"
          responsive="sm"
          class="setTB"
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
import VueCompositionAPI, {computed, onMounted, reactive, ref} from "@vue/composition-api";
import Vue from 'vue'
// import GetStockData from "@/services/getStockData";

Vue.use(VueCompositionAPI)
export default {

  props: {
    isTypeData: String
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
      items1: {value: []},
      fields1: {value: []},
      items2: {value: []},
      fields2: {value: []},
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
//     const numberFormatter = function (num) {
//       if (typeof num === 'number') {
//         console.log('判斷型態:', typeof num)
//         let dd = new Date(num);
//         return dd.toISOString().substring(0, 10);
//       }
//       return num
//     }


    const changeSelectDay = function () {
      showState.showTable = false;
      initChartData.data = null;
      individualVueData.items.value = [];
      // setTimeout(() => {
      //   formatTable(individualVueData.selectDay.value);
      // }, 300)

    }

    // const formatTable = (defNumber) => {


    // const hrefId = ref(null)

    // function GetRequest() {
    //   var url = location.search;
    //   var strs = url.split("=");//获取url中"?"符后的字串
    //   hrefId.value = strs[1]
    // }

    // Basic_Info
    // Important_Subsidiary
    // Oversea_Company
    const getBasicInfo = function (stockNum) {
      let value=[{"Stock_num":"2330","Company_name":"台灣積體電路製造股份有限公司","Stock_name":"台積電","Industry_sector":"半導體業","Adress":"新竹科學園區力行六路8號","Chairman":"劉德音","President":"總裁: 魏哲家","Spokesman":"黃仁昭","Funding_date":"1987-02-21  (成立35年)","Listed_date":"1994-09-05  (上市28年)","Per_value":10.0,"Paid_in_capital":2593.1767458,"Outstanding_shares":25931767458.0,"Private_shares":0.0,"Special_shares":0.0,"Financal_report_type":"合併","Assign_share_fre":"每季","English_name":"TSMC","Company_web":"https:www.tsmc.com","Market_type":"上市","Processing_date":"2022-03-21","Main_business":"依客戶之訂單與其提供之產品設計說明，以從事製造與銷售積體電路以及其他晶圓半導體裝置。提供前述產品之封裝與測試服務、積體電路之電腦輔助設計技術服務。提供製造光罩及其設計服務。","Current_equity":151960.15730388}]
      let field = setField(value);
      console.log('field:',field)
      // individualVueData.items['value']=[]
      // individualVueData.items['value']= [{"Stock_num":"2330","Company_name":"台灣積體電路製造股份有限公司","Stock_name":"台積電","Industry_sector":"半導體業","Adress":"新竹科學園區力行六路8號","Chairman":"劉德音","President":"總裁: 魏哲家","Spokesman":"黃仁昭","Funding_date":"1987-02-21  (成立35年)","Listed_date":"1994-09-05  (上市28年)","Per_value":10.0,"Paid_in_capital":2593.1767458,"Outstanding_shares":25931767458.0,"Private_shares":0.0,"Special_shares":0.0,"Financal_report_type":"合併","Assign_share_fre":"每季","English_name":"TSMC","Company_web":"https:www.tsmc.com","Market_type":"上市","Processing_date":"2022-03-21","Main_business":"依客戶之訂單與其提供之產品設計說明，以從事製造與銷售積體電路以及其他晶圓半導體裝置。提供前述產品之封裝與測試服務、積體電路之電腦輔助設計技術服務。提供製造光罩及其設計服務。","Current_equity":151960.15730388}]
      // individualVueData.fields['value']=[]
      // individualVueData.fields['value']= [
      //
      //   {key: 'Revenue_YoY', label: '營收年成長率', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
      //   {key: 'Gross_YoY', label: '毛利年成長率', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
      //   {key: 'Profit_YoY', label: '營業利益年成長率', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
      //   {key: 'Pre_tax_income_YoY', label: '稅前淨利年成長率', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
      //   {key: 'Net_income_margin_YoY', label: '稅後淨利年成長率', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
      //   {key: 'Net_income_margin_pa_YoY', label: '稅後淨利年成長率(母公司)', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
      //   {key: 'EPS_YoY', label: '每股稅後盈餘年成長率', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
      // ]
      showState.showSpinner = false
      console.log(stockNum)
      // let selectKey = {
      //   idName: 'basic_info',
      //   key1: 'Basic_Info',
      //   key2: stockNum,
      //   key3: '1',
      //   key4: '1',
      //   key5: '1',
      // }
      // console.log('selectKey', selectKey)
      // GetStockData.getUserBoard(selectKey)
      //     .then(res => {
      //       console.log('res>>Oversea_Company:', res)
      //       showState.showSpinner = false
      //     })
    }
    const getImportantSubsidiary = function (stockNum) {
      console.log(stockNum)
      individualVueData.items1['value']=[]
      individualVueData.items1['value']= [{"Stock_num":"2330","Happen_date":"2004-04-16","Subsidiary":"台灣積體電路(北美)公司","ccc":"積體電路及其他半導體裝置之銷售業務","Region":"U.S.A美國","Market_type":"上市"},{"Stock_num":"2330","Happen_date":"2017-02-16","Subsidiary":"TSMC Global Ltd.","Bussiness":"一般投資業務","Region":"British Virgin IS.英屬維京群島","Market_type":"上市"}]
      individualVueData.fields1['value']=[]
      individualVueData.fields1['value']= [
        //登錄日期	子公司名稱	主要經營業務	地區
        {key: 'Happen_date', label: '登錄日期', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {key: 'Subsidiary', label: '子公司名稱', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {key: 'Bussiness', label: '主要經營業務', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {key: 'Region', label: '地區', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        ]
      // let selectKey = {
      //   idName: 'basic_info',
      //   key1: 'Important_Subsidiary',
      //   key2: stockNum,
      //   key3: '1',
      //   key4: '1',
      //   key5: '1',
      // }
      // console.log('selectKey', selectKey)
      // GetStockData.getUserBoard(selectKey)
      //     .then(res => {
      //       console.log('res>>Oversea_Company:', res)
      //       showState.showSpinner = false
      //     })
    }
    const getOverseaCompany = function (stockNum) {
      console.log(stockNum)
      // let selectKey = {
      //   idName: 'basic_info',
      //   key1: 'Oversea_Company',
      //   key2: stockNum,
      //   key3: '1',
      //   key4: '1',
      //   key5: '1',
      // }
      // console.log('selectKey', selectKey)
      // GetStockData.getUserBoard(selectKey)
      //     .then(res => {
      //       console.log('res>>Oversea_Company:', res)
      //       showState.showSpinner = false
      //     })
      individualVueData.items2['value']=[]
      individualVueData.items2['value']= [{"Stock_num":"2330","Oversea_company_name":"VTAF III","Oversea_company":"Growth Fund","Region":"開曼群島","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC Europe","Region":"荷蘭","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC Global","Region":"英屬維京群島","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC Partners","Region":"英屬維京群島","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"TSMC Partners","Oversea_company":"TSMC Technology","Region":"美國","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"TSMC Partners","Oversea_company":"TSMC Development","Region":"美國","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC North America","Region":"美國","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC Arizona","Region":"美國","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"TSMC Development","Oversea_company":"WaferTech","Region":"美國","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC Korea","Region":"南韓","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"TSMC Partners","Oversea_company":"TSMC Canada","Region":"加拿大","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"JASM","Region":"日本","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC 3DIC","Region":"日本","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC Japan","Region":"日本","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC JDC","Region":"日本","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"Emerging Fund","Region":"開曼群島","Hold_equity":99.9},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"VTAF II","Region":"開曼群島","Hold_equity":98.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"VTAF III","Region":"開曼群島","Hold_equity":98.0}]
      individualVueData.fields2['value']=[]
      individualVueData.fields2['value']= [
        {key: 'Oversea_company_name', label: '重要子公司', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {key: 'Oversea_company', label: '重要子公司名稱', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {key: 'Region', label: '地區', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        {key: 'Hold_equity', label: '持股比率', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        ] }

    onMounted(() => {
      let original = pr.value['isTypeData'];
      showState.showTable = true;
      getBasicInfo(original);
      getImportantSubsidiary(original);
      getOverseaCompany(original);


      // showState.showTable = true
      // showState.showCollapse = true
      // formatTable(7);


    })

   function setField(data) {

      let value = data;
      let tableItemsArr = []
      let tableFieldsArr = []
      let itemsObj1 = {}
      let itemsObj2 = {}
      let itemsObj3 = {}
      let itemsObj4 = {}
      let itemsObj5 = {}
      let itemsObj6 = {}
      let itemsObj7 = {}
      let fieldsObj1 = {}
      value.forEach(f => {
        //{"Stock_num":"2330","Company_name":"台灣積體電路製造股份有限公司","Stock_name":"台積電","Industry_sector":"半導體業","Adress":"新竹科學園區力行六路8號","Chairman":"劉德音","President":"總裁: 魏哲家","Spokesman":"黃仁昭","Funding_date":"1987-02-21  (成立35年)","Listed_date":"1994-09-05  (上市28年)","Per_value":10.0,"Paid_in_capital":2593.1767458,"Outstanding_shares":25931767458.0,"Private_shares":0.0,"Special_shares":0.0,"Financal_report_type":"合併","Assign_share_fre":"每季","English_name":"TSMC","Company_web":"https:www.tsmc.com","Market_type":"上市","Processing_date":"2022-03-21","Main_business":"依客戶之訂單與其提供之產品設計說明，以從事製造與銷售積體電路以及其他晶圓半導體裝置。提供前述產品之封裝與測試服務、積體電路之電腦輔助設計技術服務。提供製造光罩及其設計服務。","Current_equity":151960.15730388}
        let dateformat = (f['Year'] + '年' + f['Season'] + '季').toString();
        itemsObj1['date'] = '公司代號'

        itemsObj1[dateformat] = Math.round((f['Revenue_YoY'] + Number.EPSILON) * 100) / 100;
        itemsObj2[dateformat] = Math.round((f['Gross_YoY'] + Number.EPSILON) * 100) / 100;
        itemsObj3[dateformat] = Math.round((f['Profit_YoY'] + Number.EPSILON) * 100) / 100;
        itemsObj4[dateformat] = Math.round((f['Pre_tax_income_YoY'] + Number.EPSILON) * 100) / 100;
        itemsObj5[dateformat] = Math.round((f['Net_income_margin_YoY'] + Number.EPSILON) * 100) / 100;
        itemsObj6[dateformat] = Math.round((f['Net_income_margin_pa_YoY'] + Number.EPSILON) * 100) / 100;
        itemsObj7[dateformat] = Math.round((f['EPS_YoY'] + Number.EPSILON) * 100) / 100;
        let fieldsObj2 = {
          key: null,
          label: null,
          thClass: 'text-center',
          tdClass: 'text-center',
          sortable: true
        }
        fieldsObj2['key'] = dateformat
        fieldsObj2['label'] = dateformat
        tableFieldsArr.push(fieldsObj2)

        fieldsObj1['key'] = 'date'
        fieldsObj1['label'] = '獲利季成長率'
        fieldsObj1['thClass'] = 'text-center  text-danger setwidth'
        fieldsObj1['tdClass'] = 'text-center '
        fieldsObj1['sortable'] = true
        fieldsObj1['stickyColumn'] = true
      })
      tableItemsArr.push(itemsObj1)
      tableItemsArr.push(itemsObj2)
      tableItemsArr.push(itemsObj3)
      tableItemsArr.push(itemsObj4)

      tableFieldsArr.unshift(fieldsObj1)
      let bigObj = {item: tableItemsArr, field: tableFieldsArr}
      return bigObj;
    }
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
