<template>
  <div>


    <div class="container-fluid ">
      <b-input-group prepend="個股查詢" class="mt-3">
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
          <b-button @click="clean" variant="danger">清除</b-button>

        </b-input-group-append>
      </b-input-group>
      <br/>
      <b-table
          bordered
          hover
          v-if="showState.showTable"
          :items="individualVueData.items.value"
          :fields="individualVueData.fields.value"

          class="setWidth"
      >
        <!--        <template #thead-top>-->
        <!--          <b-tr>-->
        <!--            <b-td variant="primary text-center" rowspan="1" >公司基本資料</b-td>-->
        <!--&lt;!&ndash;            <b-th variant="primary text-center" colspan="2">公司基本資料</b-th>&ndash;&gt;-->
        <!--          </b-tr>-->
        <!--        </template>-->
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

      >
        <template #thead-top>
          <b-tr>
            <b-th class="setbg text-center" colspan="4">重要子公司基本資料</b-th>
          </b-tr>
        </template>

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

      >
        <template #thead-top>
          <b-tr>
            <b-th variant=" text-center" class="setColor" colspan="4">海外子公司基本資料</b-th>
          </b-tr>
        </template>
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
      selected: {value: '公司基本資料'},
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      selectOptions: {value: ['公司基本資料']},
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
//     const numberFormatter = function (num) {
//       if (typeof num === 'number') {
//         console.log('判斷型態:', typeof num)
//         let dd = new Date(num);
//         return dd.toISOString().substring(0, 10);
//       }
//       return num
//     }



    const getBasicInfo = function () {
      // let value=[{"Stock_num":"2330","Company_name":"台灣積體電路製造股份有限公司","Stock_name":"台積電","Industry_sector":"半導體業","Adress":"新竹科學園區力行六路8號","Chairman":"劉德音","President":"總裁: 魏哲家","Spokesman":"黃仁昭","Funding_date":"1987-02-21  (成立35年)","Listed_date":"1994-09-05  (上市28年)","Per_value":10.0,"Paid_in_capital":2593.1767458,"Outstanding_shares":25931767458.0,"Private_shares":0.0,"Special_shares":0.0,"Financal_report_type":"合併","Assign_share_fre":"每季","English_name":"TSMC","Company_web":"https:www.tsmc.com","Market_type":"上市","Processing_date":"2022-03-21","Main_business":"依客戶之訂單與其提供之產品設計說明，以從事製造與銷售積體電路以及其他晶圓半導體裝置。提供前述產品之封裝與測試服務、積體電路之電腦輔助設計技術服務。提供製造光罩及其設計服務。","Current_equity":151960.15730388}]
      // let field = setField(value);
      // console.log('field:',field)
      // individualVueData.items['value']=[]
      // individualVueData.items['value']=field['item']
      // // individualVueData.items['value']= [{"Stock_num":"2330","Company_name":"台灣積體電路製造股份有限公司","Stock_name":"台積電","Industry_sector":"半導體業","Adress":"新竹科學園區力行六路8號","Chairman":"劉德音","President":"總裁: 魏哲家","Spokesman":"黃仁昭","Funding_date":"1987-02-21  (成立35年)","Listed_date":"1994-09-05  (上市28年)","Per_value":10.0,"Paid_in_capital":2593.1767458,"Outstanding_shares":25931767458.0,"Private_shares":0.0,"Special_shares":0.0,"Financal_report_type":"合併","Assign_share_fre":"每季","English_name":"TSMC","Company_web":"https:www.tsmc.com","Market_type":"上市","Processing_date":"2022-03-21","Main_business":"依客戶之訂單與其提供之產品設計說明，以從事製造與銷售積體電路以及其他晶圓半導體裝置。提供前述產品之封裝與測試服務、積體電路之電腦輔助設計技術服務。提供製造光罩及其設計服務。","Current_equity":151960.15730388}]
      // individualVueData.fields['value']=[]
      // individualVueData.fields['value']=field['field']
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

      let selectKey = {
        idName: 'basic_info',
        key1: 'Basic_Info',
        key2: individualVueData.stockCode.value.toLocaleString().substring(0, 4),
        key3: '1',
        key4: '1',
        key5: '1',
      }
      console.log('selectKey', selectKey)
      GetStockData.getUserBoard(selectKey)
          .then(res => {
            let value = res.data;
            let field = setField(value);
            individualVueData.items['value'] = []
            individualVueData.items['value'] = field['item']
            // individualVueData.items['value']= [{"Stock_num":"2330","Company_name":"台灣積體電路製造股份有限公司","Stock_name":"台積電","Industry_sector":"半導體業","Adress":"新竹科學園區力行六路8號","Chairman":"劉德音","President":"總裁: 魏哲家","Spokesman":"黃仁昭","Funding_date":"1987-02-21  (成立35年)","Listed_date":"1994-09-05  (上市28年)","Per_value":10.0,"Paid_in_capital":2593.1767458,"Outstanding_shares":25931767458.0,"Private_shares":0.0,"Special_shares":0.0,"Financal_report_type":"合併","Assign_share_fre":"每季","English_name":"TSMC","Company_web":"https:www.tsmc.com","Market_type":"上市","Processing_date":"2022-03-21","Main_business":"依客戶之訂單與其提供之產品設計說明，以從事製造與銷售積體電路以及其他晶圓半導體裝置。提供前述產品之封裝與測試服務、積體電路之電腦輔助設計技術服務。提供製造光罩及其設計服務。","Current_equity":151960.15730388}]
            individualVueData.fields['value'] = []
            individualVueData.fields['value'] = field['field']
            console.log('res>>Oversea_Company:', res)
            showState.showSpinner = false
          })
    }
    const getImportantSubsidiary = function () {

      // individualVueData.items1['value']=[]
      // individualVueData.items1['value']= [{"Stock_num":"2330","Happen_date":"2004-04-16","Subsidiary":"台灣積體電路(北美)公司","ccc":"積體電路及其他半導體裝置之銷售業務","Region":"U.S.A美國","Market_type":"上市"},{"Stock_num":"2330","Happen_date":"2017-02-16","Subsidiary":"TSMC Global Ltd.","Bussiness":"一般投資業務","Region":"British Virgin IS.英屬維京群島","Market_type":"上市"}]
      // individualVueData.fields1['value']=[]
      // individualVueData.fields1['value']=
      // [
      //   //登錄日期	子公司名稱	主要經營業務	地區
      //   {key: 'Happen_date', label: '登錄日期', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
      //   {key: 'Subsidiary', label: '子公司名稱', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
      //   {key: 'Bussiness', label: '主要經營業務', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
      //   {key: 'Region', label: '地區', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
      //   ]
      let selectKey = {
        idName: 'basic_info',
        key1: 'Important_Subsidiary',
        key2: individualVueData.stockCode.value.toLocaleString().substring(0, 4),
        key3: '1',
        key4: '1',
        key5: '1',
      }
      console.log('selectKey', selectKey)
      GetStockData.getUserBoard(selectKey)
          .then(res => {
            individualVueData.items1['value'] = []
            individualVueData.items1['value'] = res.data
            individualVueData.fields1['value'] = []
            individualVueData.fields1['value'] = [
              //登錄日期	子公司名稱	主要經營業務	地區
              {key: 'Happen_date', label: '登錄日期', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
              {key: 'Subsidiary', label: '子公司名稱', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
              {key: 'Bussiness', label: '主要經營業務', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
              {key: 'Region', label: '地區', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
            ]
            console.log('res>>Oversea_Company:', res)
            showState.showSpinner = false
          })
    }
    const getOverseaCompany = function () {

      let selectKey = {
        idName: 'basic_info',
        key1: 'Oversea_Company',
        key2: individualVueData.stockCode.value.toLocaleString().substring(0, 4),
        key3: '1',
        key4: '1',
        key5: '1',
      }
      console.log('selectKey', selectKey)
      GetStockData.getUserBoard(selectKey)
          .then(res => {
            individualVueData.items2['value'] = []
            individualVueData.items2['value'] = res.data
            individualVueData.fields2['value'] = []
            individualVueData.fields2['value'] = [
              {
                key: 'Oversea_company_name',
                label: '重要子公司',
                thClass: 'text-center ',
                tdClass: 'text-center',
                sortable: true
              },
              {
                key: 'Oversea_company',
                label: '重要子公司名稱',
                thClass: 'text-center ',
                tdClass: 'text-center',
                sortable: true
              },
              {key: 'Region', label: '地區', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
              {key: 'Hold_equity', label: '持股比率', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
            ]
            console.log('res>>Oversea_Company:', res)
            showState.showSpinner = false
          })
    }
    // individualVueData.items2['value']=[]
    // individualVueData.items2['value']= [{"Stock_num":"2330","Oversea_company_name":"VTAF III","Oversea_company":"Growth Fund","Region":"開曼群島","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC Europe","Region":"荷蘭","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC Global","Region":"英屬維京群島","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC Partners","Region":"英屬維京群島","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"TSMC Partners","Oversea_company":"TSMC Technology","Region":"美國","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"TSMC Partners","Oversea_company":"TSMC Development","Region":"美國","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC North America","Region":"美國","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC Arizona","Region":"美國","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"TSMC Development","Oversea_company":"WaferTech","Region":"美國","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC Korea","Region":"南韓","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"TSMC Partners","Oversea_company":"TSMC Canada","Region":"加拿大","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"JASM","Region":"日本","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC 3DIC","Region":"日本","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC Japan","Region":"日本","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"TSMC JDC","Region":"日本","Hold_equity":100.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"Emerging Fund","Region":"開曼群島","Hold_equity":99.9},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"VTAF II","Region":"開曼群島","Hold_equity":98.0},{"Stock_num":"2330","Oversea_company_name":"台積公司","Oversea_company":"VTAF III","Region":"開曼群島","Hold_equity":98.0}]
    // individualVueData.fields2['value']=[]
    // individualVueData.fields2['value']= [
    //   {key: 'Oversea_company_name', label: '重要子公司', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
    //   {key: 'Oversea_company', label: '重要子公司名稱', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
    //   {key: 'Region', label: '地區', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
    //   {key: 'Hold_equity', label: '持股比率', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
    //   ] }


    const setField= function(data) {

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
      let itemsObj8 = {}
      let itemsObj9 = {}
      let itemsObj10 = {}
      let itemsObj11 = {}
      let itemsObj12 = {}
      let itemsObj13 = {}
      let itemsObj14 = {}
      let itemsObj15 = {}
      let itemsObj16 = {}
      let itemsObj17 = {}
      let itemsObj18 = {}
      let itemsObj19 = {}
      let itemsObj20 = {}
      let itemsObj21 = {}
      let itemsObj22 = {}
      let fieldsObj1 = {}
      value.forEach(f => {
        //{"Stock_num":"2330","Company_name":"台灣積體電路製造股份有限公司","Stock_name":"台積電","Industry_sector":"半導體業","Adress":"新竹科學園區力行六路8號","Chairman":"劉德音","President":"總裁: 魏哲家","Spokesman":"黃仁昭","Funding_date":"1987-02-21  (成立35年)","Listed_date":"1994-09-05  (上市28年)","Per_value":10.0,"Paid_in_capital":2593.1767458,"Outstanding_shares":25931767458.0,"Private_shares":0.0,"Special_shares":0.0,"Financal_report_type":"合併","Assign_share_fre":"每季","English_name":"TSMC","Company_web":"https:www.tsmc.com","Market_type":"上市","Processing_date":"2022-03-21","Main_business":"依客戶之訂單與其提供之產品設計說明，以從事製造與銷售積體電路以及其他晶圓半導體裝置。提供前述產品之封裝與測試服務、積體電路之電腦輔助設計技術服務。提供製造光罩及其設計服務。","Current_equity":151960.15730388}
        let dateformat = ('公司基本資料');
        itemsObj1['date'] = '公司代號'
        itemsObj2['date'] = '市場別'
        itemsObj3['date'] = '產業別'
        itemsObj4['date'] = '公司名稱'
        itemsObj5['date'] = '公司簡稱'
        itemsObj6['date'] = '英文簡稱'
        itemsObj7['date'] = '成立日期'
        itemsObj8['date'] = '上市、上櫃日'
        itemsObj9['date'] = '實收資本額(元)'
        itemsObj10['date'] = '目前市值'
        itemsObj11['date'] = '普通股每股面額'
        itemsObj12['date'] = '發行股數'
        itemsObj13['date'] = '私募普通股(股)'
        itemsObj14['date'] = '特別股(股)'
        itemsObj15['date'] = '普通股盈餘分派或虧損撥補頻率'
        itemsObj16['date'] = '財務報告類型'
        itemsObj17['date'] = '董事長'
        itemsObj18['date'] = '總經理'
        itemsObj19['date'] = '發言人'
        itemsObj20['date'] = '公司網址'
        itemsObj21['date'] = '地址'
        itemsObj22['date'] = '主要業務'


        itemsObj1[dateformat] = f['Stock_num'];
        itemsObj2[dateformat] = f['Market_type'];
        itemsObj3[dateformat] = f['Industry_sector'];
        itemsObj4[dateformat] = f['Company_name'];
        itemsObj5[dateformat] = f['Stock_name'];
        itemsObj6[dateformat] = f['English_name'];
        itemsObj7[dateformat] = f['Funding_date'];
        itemsObj8[dateformat] = f['Listed_date'];
        itemsObj9[dateformat] = f['Paid_in_capital'];
        itemsObj10[dateformat] = f['Current_equity'];
        itemsObj11[dateformat] = f['Per_value'];
        itemsObj12[dateformat] = f['Outstanding_shares'];
        itemsObj13[dateformat] = f['Private_shares'];
        itemsObj14[dateformat] = f['Special_shares'];
        itemsObj15[dateformat] = f['Assign_share_fre'];
        itemsObj16[dateformat] = f['Financal_report_type'];
        itemsObj17[dateformat] = f['Chairman'];
        itemsObj18[dateformat] = f['President'];
        itemsObj19[dateformat] = f['Spokesman'];
        itemsObj20[dateformat] = f['Company_web'];
        itemsObj21[dateformat] = f['Adress'];
        itemsObj22[dateformat] = f['Main_business'];

        let fieldsObj2 = {
          key: null,
          label: null,
          thClass: 'text-center setbg ',
          tdClass: 'text-left ',

        }
        fieldsObj2['key'] = dateformat
        fieldsObj2['label'] = dateformat
        tableFieldsArr.push(fieldsObj2)

        fieldsObj1['key'] = 'date'
        fieldsObj1['label'] = ''
        fieldsObj1['thClass'] = 'text-center setwidth setbg'
        fieldsObj1['tdClass'] = 'text-center setbg '

        fieldsObj1['stickyColumn'] = true
      })
      tableItemsArr.push(itemsObj1)
      tableItemsArr.push(itemsObj2)
      tableItemsArr.push(itemsObj3)
      tableItemsArr.push(itemsObj4)
      tableItemsArr.push(itemsObj5)
      tableItemsArr.push(itemsObj6)
      tableItemsArr.push(itemsObj7)
      tableItemsArr.push(itemsObj8)
      tableItemsArr.push(itemsObj9)
      tableItemsArr.push(itemsObj10)
      tableItemsArr.push(itemsObj11)
      tableItemsArr.push(itemsObj12)
      tableItemsArr.push(itemsObj13)
      tableItemsArr.push(itemsObj14)
      tableItemsArr.push(itemsObj15)
      tableItemsArr.push(itemsObj16)
      tableItemsArr.push(itemsObj17)
      tableItemsArr.push(itemsObj18)
      tableItemsArr.push(itemsObj19)
      tableItemsArr.push(itemsObj20)
      tableItemsArr.push(itemsObj21)
      tableItemsArr.push(itemsObj22)
      tableFieldsArr.unshift(fieldsObj1)
      let bigObj = {item: tableItemsArr, field: tableFieldsArr}
      return bigObj;
    }
    const search = function () {

      showState.showTable = true;
      getBasicInfo();
      getImportantSubsidiary();
      getOverseaCompany();
    }
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
  width: 400px;
}
.setbg{
  color: #070707;
  background:radial-gradient(circle farthest-side at center, #b5c6f6, rgba(36, 94, 191, 0.79));
  font-weight: bolder;
  font-size:21px;
}
</style>
