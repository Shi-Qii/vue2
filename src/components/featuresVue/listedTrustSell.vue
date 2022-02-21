<template>
  <div class="col-12">
    {{ individualVueData.foreignNm }}
    <hr/>
    <field-select @update="changeEmit1"></field-select>
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
          <template #cell(Stock_name)="data">
            <!-- `data.value` is the value after formatted by the Formatter -->
            <!--            <a :href="`#${data.value.replace(/[^a-z]+/i,'-').toLowerCase()}`">{{ data.value }}</a>-->
            <a href="sndividualStockInquiry">{{ data.value }}</a>
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
import FieldSelect from "@/components/model_using/fieldSelect";


Vue.use(VueCompositionAPI)
export default {
  name: 'listedTrustSell',
  components: {FieldSelect},
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
      activeNm: {value: 'institutional_investors'},
      foreignNm: '投信賣超',
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      selectDayOptions: {value: ['7', '10', '20', '30', '60']},
      selectDay: {value: 7},
      stockCode: {value: null},
      stockInfo: {name: null, note: null},
      items: {value: []},
      fields: {
        value: []
      },
      currentPage: 1,
      perPage: 10,
    })
    const showState = reactive({
      showTable: true,
      showSpinner: true,
      showBCardNm: false,
      showCollapse: false,
      showPagination: false,
    })
    onMounted(() => {
      let selectKey = {
        idName: null,
        key1: 'Listed_Trust_Sell',
        key2: '上市',
        key3: 'sell',
        key4: 'Foreign_investors',
        key5: '1',

      }
      selectKey.idName = individualVueData.activeNm.value
      //上市
      //buy
      GetStockData.getUserBoard(selectKey).then(res => {
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
          key: 'Processing_date',
          label: '日期',
          formatter: numberFormatter,
          thClass: 'text-center ',
          tdClass: 'text-center ',
          sortable: true
        },
          {key: 'Industry_sector', label: '股票產業別', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Stock_num', label: '公司代號', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Stock_name', label: '股票名稱', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Open_price', label: '開盤價', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Close_price', label: '收盤價', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Up_down', label: '漲跌', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Up_down_pct', label: '漲跌幅', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {
            key: 'Foreign_investors',
            label: '外資買賣超張數',
            thClass: 'text-center ',
            tdClass: 'text-center ',
            sortable: true
          },
          {key: 'Investment_trust', label: '投資買賣超張數', thClass: 'text-center ', tdClass: 'text-center ', sortable: true},
          {key: 'Dealer', label: '自營買賣超張數', thClass: 'text-center ', tdClass: 'text-center ', sortable: true},
          {key: 'Total_buysell', label: '總買賣超張數', thClass: 'text-center', tdClass: 'text-center ', sortable: true}]

      }).then(() => {


      }).catch(() => {
        // showState.showSpinner = true
      })

    })
    const allFunction = reactive({
      editHTMLcolorClassification: (res) => {
        individualVueData.items.value = res
        individualVueData.items.value.forEach((f, index, arr) => {
          let updown = f['Up_down']; //漲跌
          let Updownpct = f['Up_down_pct']; //漲跌幅
          // 對應漲跌  + 紅色
          //          - 綠色
          if (updown > 0) {
            arr[index]['Up_down'] =
                '<Strong><span style="color:red">' + arr[index]['Up_down'] + '</span></Strong>';
          } else if (updown < 0) {
            arr[index]['Up_down'] =
                '<Strong><span style="color:darkgreen">' + arr[index]['Up_down'] + '</span></Strong>';
          }
          // 對應漲跌幅 大於9.5  + 紅底色 + 白色
          //          小於9.5  + 綠底色 + 白色
          if (Updownpct > 9.5) {
            arr[index]['Up_down_pct'] =
                '<Strong><span style="background-color: red;color:white">' + arr[index]['Up_down_pct'] + '</span></Strong>';
          } else if (Updownpct < -9.5) {
            arr[index]['Up_down_pct'] =
                '<Strong><span style="background-color: darkgreen;color:white">' + arr[index]['Up_down_pct'] + '</span></Strong>';
          }
          // 對應外資買賣超張數 小於 0  紅字提示
          if (f['Foreign_investors'] > 0) {
            arr[index]['Foreign_investors'] =
                '<Strong><span style="color:darkgreen">' + arr[index]['Foreign_investors'] + '</span></Strong>';
          }
          // 對應投資買賣超張數 小於 0  紅字提示
          if (f['Investment_trust'] > 0) {
            arr[index]['Investment_trust'] =
                '<Strong><span style="color:darkgreen">' + arr[index]['Investment_trust'] + '</span></Strong>';
          }
          // 對應自營買賣超張數 小於 0  紅字提示
          if (f['Dealer'] > 0) {
            arr[index]['Dealer'] =
                '<Strong><span style="color:darkgreen">' + arr[index]['Dealer'] + '</span></Strong>';
          }
          // 對應總買賣超張數 小於 0  紅字提示
          if (f['Total_buysell'] > 0) {
            arr[index]['Total_buysell'] =
                '<Strong><span style="color:darkgreen">' + arr[index]['Total_buysell'] + '</span></Strong>';
          }


        })
        // console.log('individualVueData.items.value:',individualVueData.items.value)
      }

    })
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

    const changeEmit1 = function (val) {

      let selectKey = {
        idName: null,
        key1: 'Listed_Trust_Sell',
        key2: '上市',
        key3: 'sell',
        key4: 'Foreign_investors',
        key5: null,

      }
      selectKey.idName = individualVueData.activeNm.value
      selectKey.key5 = val.toString()
      //上市
      //buy
      GetStockData.getUserBoard(selectKey).then(res => {
        console.log('res', res.data)
        if (res.data.length > 0) {
          showState.showSpinner = false
          showState.showPagination = true
        }
        allFunction.editHTMLcolorClassification(res.data);
        individualVueData.fields.value = [{
          key: 'Processing_date',
          label: '日期',
          formatter: numberFormatter,
          thClass: 'text-center ',
          tdClass: 'text-center ',
          sortable: true
        },
          {key: 'Industry_sector', label: '股票產業別', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Stock_num', label: '公司代號', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Stock_name', label: '股票名稱', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Open_price', label: '開盤價', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Close_price', label: '收盤價', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Up_down', label: '漲跌', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {key: 'Up_down_pct', label: '漲跌幅', thClass: 'text-center ', tdClass: 'text-center', sortable: true},
          {
            key: 'Foreign_investors',
            label: '外資買賣超張數',
            thClass: 'text-center ',
            tdClass: 'text-center ',
            sortable: true
          },
          {key: 'Investment_trust', label: '投資買賣超張數', thClass: 'text-center ', tdClass: 'text-center ', sortable: true},
          {key: 'Dealer', label: '自營買賣超張數', thClass: 'text-center ', tdClass: 'text-center ', sortable: true},
          {key: 'Total_buysell', label: '總買賣超張數', thClass: 'text-center', tdClass: 'text-center ', sortable: true}]

      }).then(() => {


      }).catch(() => {
        // showState.showSpinner = true
      })

    }


    return {
      showState, rows, individualVueData, rowClass, transProps, changeEmit1
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