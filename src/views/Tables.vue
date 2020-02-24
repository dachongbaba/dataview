<template>
  <data-table 
    class="table-hover table-sm" 
    :fields="columns" 
    :datas="datas" 
    :index="index"
    :page.sync="page"
    :size.sync="size"
    :total="total"
    :count="count"
  />
</template>

<script>
import _ from 'loadsh';
import axios from 'axios';
import DataTable from '../components/DataTable';

export default {
  name: "Tables",
  props: [
    '_options',
    '_columns',
    '_fetchs',
    '_querys',
  ],
  data: function () {
    return {
      options: {},
      columns: [],
      fetchs: {},
      datas: [],
      page: 0,
      index: 0,
      size: 0,
      total: 0,
      count: 0,
    }
  },
  watch: {
    page: {
      handler () {
        this.reload();
      },
      deep: true
    },
    size: {
      handler () {
        this.reload();
      },
      deep: true
    }
  },

  created() { 
    this.options = JSON.parse(this.$props._options) || {};
    this.columns = JSON.parse(this.$props._columns) || [];
    this.fetchs = JSON.parse(this.$props._fetchs) || {};

    this.page = (this.fetchs.pages.page + this.fetchs.pages.index) || 0;
    this.index = this.fetchs.pages.index || 0;
    this.size = this.fetchs.pages.size || 20;

    this.reload();
  },

  computed: {
    reload() {
      return _.debounce(this.fetchData, 500);
    }
  },

  methods: {
    fetchData() {
      var vm = this;
      var fetchs = this.fetchs;
      fetchs.params.page = this.page;
      fetchs.params.size = this.size;
      axios(fetchs).then(function (response) {
        vm.datas = _.get(response.data, fetchs.paths.dataPath, []);
        vm.error = _.get(response.data, fetchs.paths.errorPath, {});
        vm.page = _.get(response.data, fetchs.paths.pagePath, 0) * 1;
        vm.total = _.get(response.data, fetchs.paths.totalPath, 0) * 1;
        vm.count = _.get(response.data, fetchs.paths.countPath, 0) * 1;
        vm.size = _.get(response.data, fetchs.paths.sizePath, 20) * 1;
      }).catch(function (error) {
        console.error(fetch, error);
      }).finally(function () {
      });
    }
  },
  components: {
    DataTable
  }
};
</script>

<style scoped>
</style>
