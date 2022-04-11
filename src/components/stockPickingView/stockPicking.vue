<template>
  <div>
    <div class="row mt-3">
      <div class="col-md-3 setBg ">
        <el-button @click="btfunction" native-type="button" type="warning" icon="el-icon-star-off" circle ></el-button>

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
      <div class="col-md-6 setBg">
        <p>加入條件</p>
        <el-radio-group v-if="false" v-model="tabPosition" style="margin-bottom: 30px;">
          <el-radio-button label="top">top</el-radio-button>
          <el-radio-button label="right">right</el-radio-button>
          <el-radio-button label="bottom">bottom</el-radio-button>
          <el-radio-button label="left">left</el-radio-button>
        </el-radio-group>
        <el-tabs :tab-position="tabPosition" style="height: 200px;">
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
      </div>
      <div class="col-md-3 setBg">
        <p>結果清單</p>
      </div>
    </div>
  </div>
</template>

<script>

import {ref, reactive, watch, getCurrentInstance} from "@vue/composition-api";

export default {
  name: "stockPicking",
  setup() {
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
    const handleOpen = function (key, keyPath) {
      console.log(key, keyPath);
    }
    const handleClose = function (key, keyPath) {
      console.log(key, keyPath);
    }
    //子選單的觸發事件
    const handleSelect = function (key, keyPath) {
      console.log('key:', key);
      console.log('keyPath:', keyPath);
    }
    const isCollapse = ref(false);
    const btfunction =function () {
      console.log('btfunction:',isCollapse.value);
      isCollapse.value = !isCollapse.value;
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
      btfunction
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.setBg{
  /*background-color: #007799;*/
}
</style>