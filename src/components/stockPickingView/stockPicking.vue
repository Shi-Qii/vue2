<template>
  <div>
    <div class="row mt-3">
      <div class="col-md-3 setBg ">
        <b-button @click="insert">test</b-button>
        <el-button @click="btfunction" native-type="button" type="warning" icon="el-icon-star-off" circle></el-button>

        <el-menu
            collapse-transition
            unique-opened
            default-active="1-4-1" class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
            :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span slot="title">獲利能力</span>
            </template>
            <el-menu-item-group>
              <!--              <span slot="title">分组一</span>-->
              <el-menu-item index="營業毛利率">營業毛利率</el-menu-item>
              <el-menu-item index="營業利益率">營業利益率</el-menu-item>
              <el-menu-item index="稅前淨利率">稅前淨利率</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-collection"></i>
              <span slot="title">獲利年成長率</span>
            </template>
            <el-menu-item-group>
              <!--              <span slot="title">分组一</span>-->
              <el-menu-item index="營收年成長率">營收年成長率</el-menu-item>
              <el-menu-item index="毛利年成長率">毛利年成長率</el-menu-item>
              <el-menu-item index="營業利益年成長率">營業利益年成長率</el-menu-item>
            </el-menu-item-group>

          </el-submenu>


        </el-menu>
      </div>
      <!--      <div class="col-md-3">-->
      <!--        <p>選擇選項</p>-->
      <!--        <el-input-->
      <!--            placeholder="過濾器"-->
      <!--            v-model="filterText">-->
      <!--        </el-input>-->
      <!--        <el-tree-->
      <!--            class="filter-tree"-->
      <!--            accordion-->
      <!--            default-expand-all-->
      <!--            ref="tree"-->
      <!--            :data="data"-->
      <!--            :filter-node-method="filterNode"-->
      <!--            :props="defaultProps"-->
      <!--            @node-click="handleNodeClick">-->
      <!--        </el-tree>-->
      <!--      </div>-->
      <div class="col-md-5 setBg setBorderRight">
        <p>加入條件</p>

        <el-tabs v-if="middle['獲利能力']" :tab-position="tabPosition" style="height: 200px;">
          <p>{{ '獲利能力' }}</p>
          <el-tab-pane label="營業毛利率">
            毛利率大於:
            <el-checkbox v-model="filterText">use</el-checkbox>
            <el-input
                placeholder="請输入内容"
                prefix-icon="el-icon-search"
                v-model="filterText">
            </el-input>
            毛利率小於:
            <el-checkbox v-model="filterText">use</el-checkbox>
            <el-input
                placeholder="請输入内容"
                prefix-icon="el-icon-search"
                v-model="filterText">
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="營業利益率">
            <el-input
                placeholder="請输入内容"
                prefix-icon="el-icon-search"
                v-model="filterText">
            </el-input>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-if="middle['獲利年成長率']" :tab-position="tabPosition" style="height: 200px;">
          <p>{{ '獲利年成長率' }}</p>
          <el-tab-pane label="營收年成長率">
            毛利率大於:
            <el-checkbox v-model="filterText">use</el-checkbox>
            <el-input
                placeholder="請输入内容"
                prefix-icon="el-icon-search"
                v-model="filterText">
            </el-input>
            毛利率小於:
            <el-checkbox v-model="filterText">use</el-checkbox>
            <el-input
                placeholder="請输入内容"
                prefix-icon="el-icon-search"
                v-model="filterText">
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="毛利年成長率">
            <el-input
                placeholder="請输入内容"
                prefix-icon="el-icon-search"
                v-model="filterText">
            </el-input>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="col-md-3 setBg setMargin">
        <p>結果清單</p>
        <div>
          <b-button
              :class="visible ? null : 'collapsed'"
              :aria-expanded="visible ? 'true' : 'false'"
              aria-controls="collapse-4"
              @click="queryFunction"
              variant="success"
          >
            送出
          </b-button>
          <div v-for="(collapse) in collapses " :key="collapse.value+'a'">
            <!--            {{ collapse.items + '分隔線 ' + idx }}-->
            <b-collapse
                class="mt-2"
                id="collapse-4"
                v-model="collapse.items">
              <b-card>
                <div class="card-body p-0 m-2">
                  {{ collapse.value }}
                </div>
              </b-card>
            </b-collapse>
          </div>
          <el-dialog
              center
              title=">>>即將跳轉結果頁面<<<"
              :visible.sync="dialogVisible"
              width="30%"
          >
            <p class="text-center">---確定選定結果---</p>
            <di v-for="(collapse) in collapses " :key="collapse.value">

            <p>{{ collapse.value }}</p>
            </di>
            <span slot="footer" class="dialog-footer">
              <b-button variant="info" @click="ok">確定</b-button>
          </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {ref, reactive, watch, getCurrentInstance} from "@vue/composition-api";

export default {
  name: "stockPicking",
  setup() {
    /*
      *middle 放中間的狀態
     */
    const middle = reactive({
      '獲利能力': false, '獲利年成長率': false
    })


    const tabPosition = ref('top')
    const handleNodeClick = function (data) {
      console.log(data['label']);
    }
    const filterText = ref('')
    const data = ref([
      {
        label: '獲利能力',
        children: [{
          label: '營業毛利率',
          // children: [{
          //   label: '三级 1-1-1'
          // }]
        }, {
          label: '營業利益率',
        }]
      }, {
        label: '獲利年成長率',
        children: [{
          label: '營收年成長率',
          // children: [{
          //   label: '三级 2-1-1'
          // }]
        }, {
          label: '毛利年成長率',
          // children: [{
          //   label: '三级 2-2-1'
          // }]
        }]
      },


    ])
    const defaultProps = reactive({
      children: 'children',
      label: 'label'
    })
    const internalInstance = getCurrentInstance() // 有效
    watch(filterText, (newValue, oldValue) => {
      console.log(newValue, oldValue)
      // console.log('getCurrentInstance', internalInstance)

      console.log(' internalInstance.refs.tree:', internalInstance.refs.tree)


    })
    const filterNode = function (value) {
      if (!value) return true;
      let boolean = null;
      data.value.forEach(fe => {
        // console.log('fe[\'label\']:', fe['label'])
        boolean = fe['label'].indexOf(value) !== -1
        // console.log('boolean:', boolean)
      });
      // console.log('boolean:', boolean)

      return boolean;
    }
    let copy = {}
    Object.assign(copy, middle)
    /*
     handleOpen is controller middle states
     *param: key is select headle
     */
    const handleOpen = function (key, keyPath) {
      Object.assign(middle, copy);
      console.log(key, keyPath);
      if ('1' === key) {
        middle.獲利能力 = true;
      } else if ('2' === key) {
        middle.獲利年成長率 = true;
      }
    }
    const handleClose = function (key, keyPath) {
      console.log(key, keyPath);
    }
    //子選單的觸發事件
    const handleSelect = function (key, keyPath) {
      console.log('key:', key);
      console.log('keyPath:', keyPath);
      // if ('營業毛利率'===key){
      //   middle.獲利能力 =true;
      //   middle.獲利年成長率 =false;
      // }else if ('營收年成長率'===key){
      //   middle.獲利能力 =false;
      //   middle.獲利年成長率 =true;
      // }
    }
    const isCollapse = ref(false);
    const btfunction = function () {
      console.log('btfunction:', isCollapse.value);
      isCollapse.value = !isCollapse.value;
    }
    const visible = ref(true);
    const collapses = reactive([{
      items: '',
      index1: 1,
      value: '第一個'
    }, {
      items: '',
      index2: 2,
      value: '第二個'
    }])
    let count = 3;
    const insert = function () {


      collapses.push({
        items: '',
        index3: count,
        value: '第' + count + '個'
      })
      count++
    }
    const dialogVisible = ref(false);
    const queryFunction = function () {
      dialogVisible.value = !dialogVisible.value;
    }
    const ok = () => {
      dialogVisible.value = !dialogVisible.value;
    }
    return {
      data,
      defaultProps,
      handleNodeClick,
      filterText,
      filterNode,
      tabPosition,
      isCollapse,
      handleClose,
      handleOpen,
      handleSelect,
      btfunction,
      visible,
      collapses,
      insert,
      middle,
      queryFunction,
      dialogVisible,
      ok
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.setBorderRight {
  border-right: solid 1px #e6e6e6;
}

.setMargin {
  margin-left: 7%;
}

.card-body {
  padding: 0px;
  margin: 1%;
}

.setBg {
  /*background-color: #007799;*/
}
</style>