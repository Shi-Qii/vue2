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
        <b-form-input type="text" class="col-2"   maxlength="1" ref= 'focusElement' v-model="individualVueData.stockCode2.value"
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
      <field-season-select v-if="false" @update="changeEmit1"></field-season-select>
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
  name: "balanceSheet",
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
      foreignNm: '資產負債表',
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
          {key: 'Stock_name', label: '公司名稱', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Close_price', label: '最新股價', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Asset', label: '資產總額', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Liability', label: '負債總額', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Total_equity', label: '權益總額', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Book_value_per_share', label: '每股參考淨值', thClass: 'text-center ', tdClass: 'text-center', sortable: true},

        ]
      }

    })

    const search = function () {
      showState.showSpinner = true
      showState.showPagination = false
      showState.showTable = false

      searchforRequest('上市');
      searchforRequest('上櫃');


    }

    const searchforRequest = function (name) {
      let selectKey = {
        idName: null,
        key1: 'Balance_Sheet',
        key2: name.toString(),
        key3: individualVueData.stockCode1.value,
        key4: individualVueData.stockCode2.value,
        key5: '1',
      }
      selectKey.idName = individualVueData.selected.value
      GetStockData.getQueryData(selectKey).then(res => {
        console.log(res)
        showState.showSpinner = true;
        if ('上市' === name) {
          // individualVueData.items.listed = [{"Stock_num":"1101","Close_price":48.95,"Stock_name":"台泥","Asset":441684559.0,"Liability":216029886.0,"Total_equity":225654673.0,"Book_value_per_share":32.37},{"Stock_num":"1110","Close_price":20.5,"Stock_name":"東泥","Asset":10958500.0,"Liability":2247791.0,"Total_equity":8710709.0,"Book_value_per_share":15.13}];
          individualVueData.items.listed = res.data;
        }
        if ('上櫃' === name) {
          // individualVueData.items.cabinet = [{"Stock_num":"6104","Close_price":291.5,"Stock_name":"創惟","Asset":3571227.0,"Liability":1683779.0,"Total_equity":1887448.0,"Book_value_per_share":20.86},{"Stock_num":"6109","Close_price":9.1,"Stock_name":"亞元","Asset":1192192.0,"Liability":647817.0,"Total_equity":544375.0,"Book_value_per_share":9.19}];
          individualVueData.items.cabinet = res.data;
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

    const changeEmit1 = function () {

    }
    changeEmit1();
    onMounted(() => {

    })
    const focusNext = function (e, maxlength) {
      console.log('e, maxlength',e.target.value.length,  this,maxlength)
      if (e.target.value.length === maxlength) this.$refs['focusElement'].focus();
    };
    return {
      showState, rows, individualVueData, rowClass, transProps, search, selected, options, changeFn, changeEmit1,focusNext
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