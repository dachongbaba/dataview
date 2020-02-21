<template>
  <div class="jumbotron mt-5 mb-5">
    <data-view></data-view>
  </div>
</template>

<script>
import DataView from '@/components/DataView.vue'

export default {
  name: "Home",
  components: {
    DataView
  }
};
</script>
