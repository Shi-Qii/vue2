<template>
  <div class="col-12">
    {{ individualVueData.foreignNm }}
    <hr/>
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
import VueCompositionAPI, {computed, onMounted, reactive} from "@vue/composition-api";
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
        individualVueData.items.value.forEach((f, index, arr) => {
          let Growth_mon = f['Growth_mon']; //上月比較增減(%)
          let Growth_year = f['Growth_year']; //去年同月增減(%)
          let Grow_total_earn = f['Growth_year']; //前期比較增減(%)
          // 對應漲跌  + 紅色
          //          - 綠色
          if (Growth_mon > 0) {
            arr[index]['Growth_mon'] =
                '<Strong><span style="color:red">' + arr[index]['Growth_mon'] + '</span></Strong>';
          } else if (Growth_mon < 0) {
            arr[index]['Growth_mon'] =
                '<Strong><span style="color:darkgreen">' + arr[index]['Growth_mon'] + '</span></Strong>';
          }
          if (Growth_year > 0) {
            arr[index]['Growth_year'] =
                '<Strong><span style="color:red">' + arr[index]['Growth_year'] + '</span></Strong>';
          } else if (Growth_year < 0) {
            arr[index]['Growth_year'] =
                '<Strong><span style="color:darkgreen">' + arr[index]['Growth_year'] + '</span></Strong>';
          }
          if (Grow_total_earn > 0) {
            arr[index]['Grow_total_earn'] =
                '<Strong><span style="color:red">' + arr[index]['Grow_total_earn'] + '</span></Strong>';
          } else if (Grow_total_earn < 0) {
            arr[index]['Grow_total_earn'] =
                '<Strong><span style="color:darkgreen">' + arr[index]['Grow_total_earn'] + '</span></Strong>';
          }

        })
        // console.log('individualVueData.items.value:',individualVueData.items.value)
      }

    })
    //key3 年跟 key4 月 輸入框 年月
    const search = function () {

      let selectKey = {
        idName: null,
        key1: 'Listed_Monthly_Revenue',
        key2: '上市',
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

        // individualVueData.items.value = res.data;

        // {
        //   {Up_down: 'This is <i>escaped</i> content'},
        //   Up_down_pct: 'This is <i>raw <strong>HTML</strong></i> <span style="color:red">content</span>',
        // }
        allFunction.editHTMLcolorClassification(res.data);
        individualVueData.fields.value = [{
          key: 'Year',
          label: '年份',
          formatter: numberFormatter,
          thClass: 'text-center ',
          tdClass: 'text-center ',
          sortable: true
        }, {
          key: 'Month',
          label: '月份',
          formatter: numberFormatter,
          thClass: 'text-center ',
          tdClass: 'text-center ',
          sortable: true
        },
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

    const numberFormatter = function (num) {
      if (typeof num === 'number') {
        // console.log('判斷型態:', typeof num)
        let dd = new Date(num);
        return dd.toISOString().substring(0, 10);
      }
      return num
    }

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
      showState, rows, individualVueData, rowClass, transProps, search
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
</style>