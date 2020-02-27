<template>
  <div>
    <data-filter 
      :options="options" 
      :filters.sync="filters"
    />
    <data-table 
      :fields="columns" 
      :fetchs="fetchs"
      :filters="filters" 
      :datas.sync="datas"
    />
  </div>
</template>

<script>
import DataTable from '../components/DataTable';
import DataFilter from '../components/DataFilter';

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

  computed: {
  },

  methods: {
  },

  components: {
    DataTable,
    DataFilter
  }
};
</script>

<style scoped>
</style>
