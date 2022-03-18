<template>
  <div class="col-12">
    {{ individualVueData.foreignNm }}
    <b-form-group>
      <b-form-radio-group
          button-variant="outline-primary"
          v-model="selected"
          :options="options"
          buttons
          @change="changeFn()"
      ></b-form-radio-group>
      <field-select @update="changeEmit1"></field-select>
    </b-form-group>
    <hr/>
    <section class="col-12">
      <div class="col-12">
        <b-table
            id="table-transition-example"
            :tbody-transition-props="transProps"
            outlined
            sort
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

          <template #cell(Up_down)="data">
            <span
                :class="''+(data.value > 0 ? 'text-danger bold ': '')+(data.value < 0 ? 'text-success bold  ': '' )">
              {{ data.value }}</span>
          </template>
          <template #cell(Up_down_pct)="data">
            <span
                :class="''+(data.value > 0&&data.value<9.4 ? 'text-danger bold ': '' )+(data.value < 0 ? 'text-success bold  ': '' )+(data.value>9.5   ? 'text-light bold ': '' ) ">
              {{ data.value }}</span>
          </template>
          <template #cell(Foreign_investors)="data">
            <span
                :class="''+(data.value < 0 ? 'text-success bold  ': '' )">
              {{ data.value }}</span>
          </template>
          <template #cell(Investment_trust)="data">
            <span
                :class="''+(data.value < 0 ? 'text-success bold  ': '' )">
              {{ data.value }}</span>
          </template>
          <template #cell(Dealer)="data">
            <span
                :class="''+(data.value < 0 ? 'text-success bold  ': '' )">
              {{ data.value }}</span>
          </template>

          <template #cell(add_Up)="data">
            <span
                :class="''+(data.value < 0 ? 'text-success bold  ': '' )">
              {{ data.value }}</span>
          </template>


          <template #cell(Stock_num)="data">
            <router-link :to="{ path:'/mainStockSearch', query:{id:data.value,params:'institutional_investors'}}">
              <a>{{ data.value }}</a>
            </router-link>
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
import FieldSelect from "@/components/model_using/fieldSelect";

Vue.use(VueCompositionAPI)
export default {
  props: {
    params: Object
  },
  components: {FieldSelect},
  setup(props) {
    // console.log('props1:', props['params']['foreignNm'])
    // console.log('props1:', props['params']['key1'])
    // console.log('props1:', props['params']['key4'])

    const selected = ref('上市');
    const options = reactive([
      {text: '上市', value: '上市'},
      {text: '上櫃', value: '上櫃'}
    ])
    const transProps = {
      // Transition name
      name: 'flip-list'
    }
    const rows = computed(() => {
      return individualVueData.items.value.length
    })
    const individualVueData = reactive({
      selected: {value: 'institutional_investors'},
      foreignNm: props['params']['foreignNm'],
      originalData: {value: 'institutional_investors'},
      spinnerVariants: {value: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']},
      selectDayOptions: {value: ['7', '10', '20', '30', '60']},
      selectDay: {value: 7},
      stockCode: {value: null},
      stockInfo: {name: null, note: null},
      items: {value: [], listed: [], cabinet: []},
      fields: {
        value: []
      },
      currentPage: 1,
      perPage: 10,
    })
    const showState = reactive({
      showTable: false,
      showSpinner: true,
      showBCardNm: false,
      showCollapse: false,
      showPagination: false,
    })

    const initDataFunction = function (name, day,key4) {
      let selectKey = {
        idName: null,
        key1: props['params']['key1'],
        key2: name,
        key3: 'buy',
        key4: key4,
        key5: day,
        // 'Foreign_investors',
      }
      selectKey.idName = individualVueData.selected.value
      //上市
      //buy
      if (Number(day) > 1) {
        showState.showTable = false
        showState.showSpinner = true
        showState.showPagination = false
      }

      GetStockData.getUserBoard(selectKey).then(res => {
        console.log('res', res.data)
        if (res.data.length >= 0) {
          showState.showTable = true
          showState.showSpinner = false
          showState.showPagination = true
        }
        if ('上市' === name) {
          individualVueData.items.listed = res.data;
        } else if ('上櫃' === name) {
          individualVueData.items.cabinet = res.data;
        }
        if (selected.value === '上市') {
          individualVueData.items.value = [];
          individualVueData.items.value = [...individualVueData.items.listed]
        } else if (selected.value === '上櫃') {
          individualVueData.items.value = [];
          individualVueData.items.value = [...individualVueData.items.cabinet]
        }
        //設置對應使用的欄位
        allFunction.editHTMLcolorClassification();
        allFunction.setField();
      }).then(() => {

      })

    }

    onMounted(() => {
      initDataFunction('上市', '1',props['params']['key4']);

      initDataFunction('上櫃', '1',props['params']['key4']);

    })

    const allFunction = reactive({

      setField: () => {
        individualVueData.fields.value = [];
        if (props['params']['foreignNm'] === '投信買超' || props['params']['foreignNm'] === '自營買超' || props['params']['foreignNm'] === '外資買超') {
          individualVueData.fields.value.push({
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
              {
                key: 'Investment_trust',
                label: '投資買賣超張數',
                thClass: 'text-center ',
                tdClass: 'text-center ',
                sortable: true
              },
              {key: 'Dealer', label: '自營買賣超張數', thClass: 'text-center ', tdClass: 'text-center ', sortable: true},
              {key: 'Total_buysell', label: '總買賣超張數', thClass: 'text-center', tdClass: 'text-center ', sortable: true})
        }else if (props['params']['foreignNm'] === '總買賣'){
          individualVueData.fields.value = [];
          individualVueData.fields.value.push({
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
                label: '外資',
                thClass: 'text-center ',
                tdClass: 'text-center ',
                sortable: true
              },
              {
                key: 'Investment_trust',
                label: '投信',
                thClass: 'text-center ',
                tdClass: 'text-center ',
                sortable: true
              },
              {key: 'Dealer', label: '自營', thClass: 'text-center ', tdClass: 'text-center ', sortable: true},
              {key: 'Total_buysell', label: '總買賣', thClass: 'text-center', tdClass: 'text-center ', sortable: true})
        }else {
          individualVueData.fields.value = [];
          individualVueData.fields.value.push({
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
                key: 'add_Up',
                label: props['params']['foreignNm'],
                thClass: 'text-center ',
                tdClass: 'text-center',
                sortable: true
              },
              {
                key: 'Foreign_investors',
                label: '外資',
                thClass: 'text-center ',
                tdClass: 'text-center ',
                sortable: true
              },
              {
                key: 'Investment_trust',
                label: '投信',
                thClass: 'text-center ',
                tdClass: 'text-center ',
                sortable: true
              },
              {key: 'Dealer', label: '自營', thClass: 'text-center ', tdClass: 'text-center ', sortable: true},
              {key: 'Total_buysell', label: '總買賣', thClass: 'text-center', tdClass: 'text-center ', sortable: true})
        }
      },
      editHTMLcolorClassification: () => {
        individualVueData.items.value.forEach((f) => {
          console.log('變更table設定')
          let Updownpct = f['Up_down_pct']; //漲跌幅
          /*
              * 對應漲跌  + 紅色
              *          - 綠色
           */
          if (Updownpct > 9.5) {
            f['_cellVariants'] = {Up_down_pct: 'danger'}
          }
          if ('外資+自營買超' === props['params']['foreignNm']) {
            f['add_Up'] = f['Dealer'] + f['Foreign_investors'];
          }
        })
      },
    })
    const numberFormatter = function (num) {
      if (typeof num === 'number') {
        // console.log('判斷型態:', typeof num)
        let dd = new Date(num);
        return dd.toISOString().substring(0, 10);
      }
      return num
    }
    const changeFn = function () {

      if (selected.value.toString() === '上市') {
        individualVueData.items.value = []
        individualVueData.items.value = [...individualVueData.items.listed]
      } else if (selected.value.toString() === '上櫃') {
        individualVueData.items.value = []
        individualVueData.items.value = [...individualVueData.items.cabinet]
        allFunction.editHTMLcolorClassification();
      }

      // key2: selected.value.toString()

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

    const changeEmit1 = (val) => {
      initDataFunction('上市', val.toString(),props['params']['key4']);
      initDataFunction('上櫃', val.toString(),props['params']['key4']);
    }

    return {
      showState, rows, individualVueData, rowClass, transProps, options, selected, changeFn, changeEmit1
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