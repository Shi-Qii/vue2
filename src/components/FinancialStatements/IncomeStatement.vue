<template>
  <div class="col-12">
    {{ individualVueData.foreignNm }}
    <hr/>
    <div class="container-fluid">
      <b-input-group class="">
        <b-form-input type="text" maxlength="3" class="col-2"
                      @input.native="focusNext($event, 3)"
                      v-model="individualVueData.stockCode1.value"
                      list="my-list-id"></b-form-input>
        <b-input-group-text>年</b-input-group-text>
        <b-form-input type="text" class="col-2" maxlength="1" ref='focusElement'
                      v-model="individualVueData.stockCode2.value"
                      list="my-list-id"></b-form-input>
        <b-input-group-text>季</b-input-group-text>
        <b-input-group-append>
          <b-button @click="search" variant="outline-success">送出</b-button>
          <!--          <b-button @click="clean" variant="danger">清除</b-button>-->

        </b-input-group-append>
      </b-input-group>
      <br/>
      <b-form-radio-group
          button-variant="outline-primary"
          v-model="selected"
          :options="options"
          buttons
          @change="changeFn()"
      ></b-form-radio-group>
      <br/>
      <field-season-select @update="changeEmit1"></field-season-select>
    </div>

    <hr/>
    <section class="col-12">
      <div class="col-12">
        <b-table

            id="table-transition-example"
            :tbody-transition-props="transProps"
            outlined
            sort
            striped
            bordered
            hover
            responsive="xl"
            :tbody-tr-class="rowClass"
            sticky-header="800px"
            v-if="showState.showTable"
            :items="individualVueData.items.value"
            :fields="individualVueData.fields.value"
            :per-page="individualVueData.perPage"
            :current-page="individualVueData.currentPage"
            class=" setTB col-12"
        >
          <template #cell(Growth_mon)="data">
            <span
                :class="''+(data.value > 0  && data.value < 99.9 ? 'text-danger bold ': '' )+(data.value < 0  && data.value > (-99.9)? 'text-success bold  ': '' )+(data.value >= 100 ||data.value <= (-100)  ? 'text-light bold ': '' ) ">
              {{ data.value }}</span>
          </template>
          <template #cell(Growth_year)="data">
            <span
                :class="''+(data.value > 0  && data.value < 99.9 ? 'text-danger bold ': '' )+(data.value < 0  && data.value > (-99.9)? 'text-success bold  ': '' )+(data.value >= 100 ||data.value <= (-100)  ? 'text-light bold ': '' ) ">
              {{ data.value }}</span>
          </template>
          <template #cell(Grow_total_earn)="data">
            <span
                :class="''+(data.value > 0 && data.value < 99.9 ? 'text-danger bold ': '' )+(data.value < 0  && data.value > (-99.9)? 'text-success bold  ': '' )+(data.value >= 100 ||data.value <= (-100)  ? 'text-light bold ': '' ) ">
              {{ data.value }}</span>
          </template>
          <template #cell(Stock_num)="data">
            <router-link :to="{ path:'/mainStockSearch', query:{id:data.value,params:'monthly_revenue'}}">
              <a>{{ data.value }}</a>
            </router-link>
          </template>
          <template #cell()="data">
            <span v-html="data.value"></span>
          </template>
          <template #foot()="data">
            <i>{{ data.label }}</i>
          </template>
        </b-table>
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
import VueCompositionAPI, {computed, onMounted, reactive, ref} from "@vue/composition-api";
import Vue from 'vue'
import GetStockData from "@/services/getStockData";
import {router} from "@/router";

import fieldSeasonSelect from "@/components/model_using/fieldSeasonSelect";

Vue.use(VueCompositionAPI)
export default {
  name: "allStockQuery",
  props: {
    idName: String
  },
  components: {fieldSeasonSelect},
  setup(props) {

    console.log('props:', props)
    const params = reactive({
      parentUrl: computed(() => {
        return router
      }),
    });
    console.log('params:', params)
    const transProps = {
      // Transition name
      name: 'flip-list'
    }
    const selected = ref('上市');
    const options = reactive([
      {text: '上市', value: '上市'},
      {text: '上櫃', value: '上櫃'}
    ])

    const rows = computed(() => {
      return individualVueData.items.value.length
    })

    const individualVueData = reactive({
      selected: {value: 'financial_report'},
      foreignNm: '損益表',
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      stockCode1: {value: ''},
      stockCode2: {value: ''},

      items: {value: [], listed: [], cabinet: []},
      fields: {
        value: []
      },
      currentPage: 1,
      perPage: 10,
    })
    const showState = reactive({
      showTable: true,
      showSpinner: false,
      showBCardNm: false,
      showCollapse: false,
      showPagination: false,
    })


    const allFunction = reactive({
      editHTMLcolorClassification: () => {
        individualVueData.items.value.forEach(f => {
          let Growth_mon = f['Growth_mon']; //上月比較增減(%)
          let Growth_year = f['Growth_year']; //去年同月增減(%)
          let Grow_total_earn = f['Grow_total_earn']; //前期比較增減(%)
          let obj = {}
          if (Growth_mon > 100) {
            obj['Growth_mon'] = 'danger'
          }
          if (Growth_mon <= (-100)) {
            obj['Growth_mon'] = 'success'
          }
          if (Growth_year > 100) {
            obj['Growth_year'] = 'danger'
          }
          if (Growth_year <= (-100)) {
            obj['Growth_year'] = 'success'
          }
          if (Grow_total_earn > 100) {
            obj['Grow_total_earn'] = 'danger'
          }
          if (Grow_total_earn <= (-100)) {
            obj['Grow_total_earn'] = 'success'
          }
          f['_cellVariants'] = obj
        })
      },
      setField: () => {


        individualVueData.fields.value = [
          {key: 'Stock_num', label: '公司代號', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Stock_Name', label: '公司名稱', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Close_price', label: '最新股價', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Operating_profit', label: '營業利益', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {
            key: 'Out_operating_revence',
            label: '營業外損益',
            thClass: 'text-center ',
            tdClass: 'text-center',
            sortable: true
          },
          {key: 'CNI', label: '本期綜合損益總額', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Basic_EPS', label: '基本每股盈餘（元）', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
        ]
      }

    })

    const search = function () {
      showState.showSpinner = true
      showState.showPagination = false
      showState.showTable = false
      //def 預設查詢是累加 === accumulate 對應 Comprehensive_Income
      let def = 'Comprehensive_Income';
      searchforRequest('上市', def);
      searchforRequest('上櫃', def);


    }

    const searchforRequest = function (name, keyOne) {

      let selectKey = {
        idName: null,
        key1: keyOne.toString(),
        key2: name.toString(),
        key3: individualVueData.stockCode1.value,
        key4: individualVueData.stockCode2.value,
        key5: '1',
      }

      selectKey.idName = individualVueData.selected.value
      GetStockData.getUserBoard(selectKey).then(res => {
        console.log(res)
        showState.showSpinner = true;
        if ('上市' === name) {
          // individualVueData.items.listed = [{"Stock_num":"1101","Close_price":48.95,"Stock_Name":"台泥","Operating_profit":4679063.0,"Out_operating_revence":2053460.0,"CNI":946727.0,"Basic_EPS":0.89},{"Stock_num":"1110","Close_price":20.5,"Stock_Name":"東泥","Operating_profit":12846.0,"Out_operating_revence":7758.0,"CNI":83277.0,"Basic_EPS":0.04}];
          individualVueData.items.listed = [{
            "Stock_num": "6126",
            "Close_price": 25.15,
            "Stock_Name": "信音",
            "Operating_profit": 432272.0,
            "Out_operating_revence": 12621.0,
            "CNI": 313463.0,
            "Basic_EPS": 1.97
          }, {
            "Stock_num": "6129",
            "Close_price": 34.1,
            "Stock_Name": "普誠",
            "Operating_profit": 115182.0,
            "Out_operating_revence": 45889.0,
            "CNI": 153370.0,
            "Basic_EPS": 0.63
          }, {
            "Stock_num": "6140",
            "Close_price": 16.9,
            "Stock_Name": "訊達電腦",
            "Operating_profit": 39714.0,
            "Out_operating_revence": -4652.0,
            "CNI": 28296.0,
            "Basic_EPS": 0.68
          }];
          // individualVueData.items.listed = res.data;
        }
        if ('上櫃' === name) {
          // individualVueData.items.cabinet = [{"Stock_num":"6104","Close_price":291.5,"Stock_Name":"創惟","Operating_profit":267962.0,"Out_operating_revence":-4355.0,"CNI":227855.0,"Basic_EPS":2.52},{"Stock_num":"6109","Close_price":9.1,"Stock_Name":"亞元","Operating_profit":-26610.0,"Out_operating_revence":-20767.0,"CNI":-43139.0,"Basic_EPS":-0.78},];
          individualVueData.items.cabinet = [{
            "Stock_num": "1231",
            "Close_price": 81.2,
            "Stock_Name": "聯華食",
            "Operating_profit": 946253.0,
            "Out_operating_revence": 64498.0,
            "CNI": 790915.0,
            "Basic_EPS": 4.03
          }, {
            "Stock_num": "1232",
            "Close_price": 156.5,
            "Stock_Name": "大統益",
            "Operating_profit": 1530914.0,
            "Out_operating_revence": 66856.0,
            "CNI": 1297219.0,
            "Basic_EPS": 7.76
          }, {
            "Stock_num": "1233",
            "Close_price": 33.85,
            "Stock_Name": "天仁",
            "Operating_profit": 14836.0,
            "Out_operating_revence": 38102.0,
            "CNI": 30989.0,
            "Basic_EPS": 0.48
          },];
          // individualVueData.items.cabinet = res.data;
        }
        individualVueData.items.value = [];
        setTimeout(() => {
          if ('上市' === selected.value.toString()) {
            individualVueData.items.value = [];
            individualVueData.items.value = [...individualVueData.items.listed]
            showState.showSpinner = false;
            showState.showPagination = true;
            showState.showTable = true;
          } else if ('上櫃' === selected.value.toString()) {
            individualVueData.items.value = [];
            individualVueData.items.value = [...individualVueData.items.cabinet]
            showState.showSpinner = false;
            showState.showPagination = true;
            showState.showTable = true;
          }
        }, 10)
        if (res.data.length > 0) {
          showState.showSpinner = false
          showState.showPagination = true
        }
        allFunction.editHTMLcolorClassification();
        allFunction.setField();
      })
    }


    const changeFn = function () {
      if (selected.value.toString() === '上市') {
        individualVueData.items.value = []
        individualVueData.items.value = [...individualVueData.items.listed]
        allFunction.editHTMLcolorClassification();
      } else if (selected.value.toString() === '上櫃') {
        individualVueData.items.value = []
        individualVueData.items.value = [...individualVueData.items.cabinet]
        allFunction.editHTMLcolorClassification();
      }
    }
    // const numberFormatter = function (num) {
    //   if (typeof num === 'number') {
    //     // console.log('判斷型態:', typeof num)
    //     let dd = new Date(num);
    //     return dd.toISOString().substring(0, 10);
    //   }
    //   return num
    // }

    function rowClass(item) {
      Object.keys(item).forEach(f => {
        // console.log('*',item[f])
        let hasNegative = item[f]
        if (Number(hasNegative) < 0) {
          // console.log('**', item[f])
          // return 'text-danger'
        }
      })
    }

    const changeEmit1 = function (event) {
      console.log('changeEmit1', event)
      if ('single' === event) {
        showState.showSpinner = true
        showState.showPagination = false
        showState.showTable = false
        let def = 'Comprehensive_Income_Season';
        searchforRequest('上市', def);
        searchforRequest('上櫃', def);
      } else if ('accumulate' === event) {
        showState.showSpinner = true
        showState.showPagination = false
        showState.showTable = false
        let def = 'Comprehensive_Income';
        searchforRequest('上市', def);
        searchforRequest('上櫃', def);
      }


    }

    onMounted(() => {

    })
    const focusNext = function (e, maxlength) {
      console.log('e, maxlength', e.target.value.length, this, maxlength)
      if (e.target.value.length === maxlength) this.$refs['focusElement'].focus();
    };
    return {
      showState,
      rows,
      individualVueData,
      rowClass,
      transProps,
      search,
      selected,
      options,
      changeFn,
      changeEmit1,
      focusNext
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
  color: #e50a0a !important;
  font-weight: bold;
}


.text-success {
  color: #04661b !important;
  font-weight: bold;
}
</style>