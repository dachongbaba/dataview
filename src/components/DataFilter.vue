<template>
  <div>
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Username" data-toggle="dropdown">
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "DataTable",
  props: {
    filters: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data() {
   return {
     items: []
   };
  },

  created() {
  },
  
  methods: {
    
  }
};
</script>

<style scoped>

</style>
