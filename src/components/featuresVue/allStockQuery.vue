<template>
  <div class="col-12">
    {{ individualVueData.foreignNm }}
    <hr/>
    <b-form-radio-group
        button-variant="outline-primary"
        v-model="selected"
        :options="options"
        buttons
        @change="changeFn()"
    ></b-form-radio-group>
    <div class="container-fluid">
      <b-input-group class="mt-3">
        <b-form-input type="text" class="col-2" v-model="individualVueData.stockCode1.value"
                      list="my-list-id"></b-form-input>
        <b-input-group-text>年</b-input-group-text>
        <b-form-input type="text" class="col-2" v-model="individualVueData.stockCode2.value"
                      list="my-list-id"></b-form-input>
        <b-input-group-text>月</b-input-group-text>
        <b-input-group-append>
          <b-button @click="search" variant="outline-success">送出</b-button>
          <!--          <b-button @click="clean" variant="danger">清除</b-button>-->

        </b-input-group-append>
      </b-input-group>
    </div>


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
                :class="''+(data.value > 0  && data.value < 99.9 ? 'text-danger bold ': '' )+(data.value < 0  && data.value < (-99.9)? 'text-success bold  ': '' )+(data.value >= 100 ||data.value < (-100)  ? 'text-light bold ': '' ) ">
              {{ data.value }}</span>
          </template>
          <template #cell(Growth_year)="data">
            <span
                :class="''+(data.value > 0  && data.value < 99.9 ? 'text-danger bold ': '' )+(data.value < 0  && data.value < (-99.9)? 'text-success bold  ': '' )+(data.value >= 100 ||data.value < (-100)  ? 'text-light bold ': '' ) ">
              {{ data.value }}</span>
          </template>
          <template #cell(Grow_total_earn)="data">
            <span
                :class="''+(data.value > 0 && data.value < 99.9 ? 'text-danger bold ': '' )+(data.value < 0  && data.value < (-99.9)? 'text-success bold  ': '' )+(data.value >= 100 ||data.value < (-100)  ? 'text-light bold ': '' ) ">
              {{ data.value }}</span>
          </template>
          <template #cell(Stock_num)="data">
            <a :href="`/${'sndividualStockInquiry?id='+data.value}`">{{ data.value }}</a>
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

Vue.use(VueCompositionAPI)
export default {
  name: "allStockQuery",
  props: {
    idName: String
  },
  setup(props) {
    console.log('props:', props)
    const params1 = reactive({
      parentUrl: computed(() => {
        return router
      }),
    });
    console.log('params1:', params1)
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
      selected: {value: 'monthly_revenue'},
      foreignNm: '上市全部營收查詢',
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      stockCode1: {value: ''},
      stockCode2: {value: ''},

      items: {value: []},
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

    onMounted(() => {

    })
    const allFunction = reactive({
      editHTMLcolorClassification: (res) => {
        individualVueData.items.value = res
        individualVueData.items.value.forEach(f => {
          let Growth_mon = f['Growth_mon']; //上月比較增減(%)
          let Growth_year = f['Growth_year']; //去年同月增減(%)
          let Grow_total_earn = f['Grow_total_earn']; //前期比較增減(%)
          let obj = {}
          if (Growth_mon > 100 || Growth_mon < (-100)) {
            obj['Growth_mon'] = 'danger'
            // f['_cellVariants'] = {Growth_mon: 'danger'}
          }
          if (Growth_year > 100 || Growth_year < (-100)) {
            obj['Growth_year'] = 'danger'
            // f['_cellVariants'] = {Growth_year: 'danger'}
          }
          if (Grow_total_earn > 100 || Grow_total_earn < (-100)) {
            obj['Grow_total_earn'] = 'danger'
            // f['_cellVariants'] = {Grow_total_earn: 'danger'}
          }
          console.log(obj);
          f['_cellVariants'] = obj
        })
      }

    })

    const search = function () {

      let selectKey = {
        idName: null,
        key1: 'Listed_Monthly_Revenue',
        key2: selected.value.toString(),
        key3: individualVueData.stockCode1.value,
        key4: individualVueData.stockCode2.value,
        key5: '1',
        //Listed_Monthly_Revenue	Monthly_revenue
      }
      selectKey.idName = individualVueData.selected.value
      //上市
      //buy
      GetStockData.getUserBoard(selectKey).then(res => {
        showState.showSpinner = true;
        console.log('res', res.data)
        if (res.data.length > 0) {
          showState.showSpinner = false
          showState.showPagination = true
        }

        allFunction.editHTMLcolorClassification(res.data);
        individualVueData.fields.value = [
          {key: 'Stock_num', label: '公司代號', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Stock_name', label: '股票名稱', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Close_price', label: '最新股價', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Mon_earn', label: '當月營收', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Last_mon_earn', label: '上月營收', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Growth_mon', label: '上月比較增減(%)', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Last_year_mon_earn', label: '去年同月營收', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {
            key: 'Growth_year',
            label: '去年同月增減(%)',
            thClass: 'text-center ',
            tdClass: 'text-center ',
            sortable: true
          },
          {key: 'Total_earn', label: '當月累計營收', thClass: 'text-center ', tdClass: 'text-center ', sortable: true},
          {key: 'Last_total_earn', label: '去年累計營收', thClass: 'text-center ', tdClass: 'text-center ', sortable: true},
          {key: 'Grow_total_earn', label: '前期比較增減(%)', thClass: 'text-center', tdClass: 'text-center ', sortable: true},
          {key: 'Comment', label: '註記', thClass: 'text-center', tdClass: 'text-center ', sortable: true}
        ]

      })
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

    return {
      showState, rows, individualVueData, rowClass, transProps, search, selected, options
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

.text-danger {
  color: #e50a0a !important;
  font-weight: bold;
}


.text-success {
  color: #04661b !important;
  font-weight: bold;
}
</style>