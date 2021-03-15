<template>
  <div class="scroll-image">
    <img :src="source" alt="a placeholder scroll image" />
  </div>
</template>

<script>
export default {
  props: ['source']
}
</script>

<style>
.scroll-image {
  margin: 0 auto 400px;
  max-width: 600px;
}
</style>