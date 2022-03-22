<template>
  <div>
    <div class=" col-4 pl-0 ">
      <br/>
      <b-input-group prepend="選擇幾日排行:"  >
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
    const selected = ref(2)
    const options = ref([
      {value: 1, text: '單季'},
      {value: 2, text: '累季'},

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