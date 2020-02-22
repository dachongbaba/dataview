<template>
  <div>
    <code>query: {{ query }}</code>
    <datatable 
      :columns="columns"
      :data="datas"
      :total="total"
      :query="query">
      
    </datatable>
  </div>
</template>

<script>
import config from '../config';
import _ from 'loadsh';
import axios from 'axios';

import Vue from 'vue'
import Datatable from 'vue2-datatable-component'

Vue.use(Datatable)

export default {
  name: "Tables",
  props: [
    '_fetchs',
    '_columns',
    '_options',
    '_querys',
  ],

  data: function () {
    return {
      fetchs: {},
      columns: [],
      options: {},
      datas: [],
      total: 0,
      query: {},
    }
  },

  created() { 
    this.fetchs = JSON.parse(this.$props._fetchs || JSON.stringify(config.defaultDatas.fetchs));
    this.columns = JSON.parse(this.$props._columns || JSON.stringify(config.defaultDatas.columns));
    this.options = JSON.parse(this.$props._options || JSON.stringify(config.defaultDatas.options));
  },
  watch: {
    query: {
      handler (query) {
        this.reload(query);
      },
      deep: true
    }
  },
  computed: {
    config() {
      return config
    },
    reload() {
      return _.debounce(this.fetchData, 500);
    },
  },

  methods: {
    fetchData(query) {
      var vm = this;
      var fetchs = this.fetchs;
      fetchs.params.page = query.offset / query.limit;
      fetchs.params.sort = `${query.sort},${query.order}`;
      axios(fetchs).then(function (response) {
        vm.datas = _.get(response.data, fetchs.dataPath, []);
        vm.total = _.get(response.data, fetchs.pagePath, 0) * 1;
        console.log('end');
      }).catch(function (error) {
        console.error(fetch, error);
      }).finally(function () {
      }); 
    }
  },
};
</script>

<style scoped>
</style>
