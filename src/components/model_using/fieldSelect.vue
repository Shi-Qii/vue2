<template>
  <div>
    <div class="col-4">
      <b-input-group prepend="選擇幾日排行:" class="m-2">
        <b-form-select v-model="selected" :options="options" @change="changeEmit(selected)"></b-form-select>
      </b-input-group>
    </div>
  </div>
</template>

<script lang="ts">
import VueCompositionAPI, {ref} from "@vue/composition-api";
import Vue from "vue";

Vue.use(VueCompositionAPI)
export default {
  name: "fieldSelect",
  emits: ["changeEmit"]
  , setup(props, {emit}) {
    const selected = ref(1)
    const options = ref([
      {value: 1, text: '1日排行'},
      {value: 2, text: '2日排行'},
      {value: 3, text: '3日排行'},
      {value: 4, text: '4日排行'},
      {value: 5, text: '5日排行'},
      {value: 7, text: '7日排行'},
      {value: 10, text: '10日排行'},
      {value: 20, text: '20日排行'},
      {value: 60, text: '60日排行'},

    ])
    // const changeEmit = function () {
    //   this.$emit('changeEmit', {selected});
    //   console.log(this.$emit());
    // }
    const changeEmit = (val) => {
      emit('update', val);
    };
    return {selected, options, changeEmit}
  }
}
</script>

<style scoped>

</style>