<template>
  <div>
    {{ 'Welcome__' +items }}
  </div>
</template>
<script>
import VueCompositionAPI, {ref, onMounted} from "@vue/composition-api";
import Vue from 'vue'
import axios from 'axios';
Vue.use(VueCompositionAPI)
export default {
  setup() {
    const items = ref();
    const showSidebar = ref(true)
    onMounted(() => {
      // http://45.32.108.38:8070/api/test
      const API_URL = 'http://45.32.108.38:8071/api/test';
      axios.get(API_URL).then((res) => {
        items.value = res.data;
      })
    })
    const test1 = ref('123')
    const fields1 = ref([]);
    return {
      test1, items, fields1, showSidebar
    }
  }
}
</script>