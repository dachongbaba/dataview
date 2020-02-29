<template>
  <div class="card">
    <data-table class="table table-striped" :columns="columns" :data="datas" />
  </div>
</template>

<script>
import DataTable from '../components/DataTable';

export default {
  name: "Tables",
  props: [
    '_options',
    '_columns',
    '_fetchs',
  ],

  data: function () {
    return {
      options: {},
      columns: [],
      fetchs: {},
      filters: {},
      datas: {},
    }
  },

  created() { 
    this.options = JSON.parse(this.$props._options) || {};
    this.columns = JSON.parse(this.$props._columns) || [];
    this.fetchs = JSON.parse(this.$props._fetchs) || {};
  },

  components: {
    DataTable
  }
};
</script>
