<template>
  <div>
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" />
  </div>
</template>

<script>
import config from '../config1';
import _ from 'loadsh';
import axios from 'axios';

import Vue from 'vue'
import Datatable from 'vue2-datatable-component'

Vue.use(Datatable)

export default {
  name: "Tables1",
  props: [
    '_fetchs',
    '_columns',
    '_options',
  ],

  data: function () {
    return {
      fetchs: {},
      columns: [],
      options: {},
      data: [],
      total: 0,
      query: {}
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
        this.$router.push({ query })
      },
      deep: true
    },
    '$route.query' (query) {
      this.reload(query);
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
    fetchData() {
      var vm = this;
      var fetchs = this.fetchs;
      axios(fetchs).then(function (response) {
        vm.data = _.get(response.data, fetchs.dataPath, []);
        vm.total = _.get(response.date, fetchs.pagePath, []);
        console.log('end');
      }).catch(function (error) {
        console.error(fetch, error);
      }).finally(function () {
      }); 
    }
  }
};
</script>

<style scoped>
</style>
