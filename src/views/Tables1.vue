<template>
  <div class="table-responsive">
    <v-client-table :data="tableData" :columns="columns" :options="options"/>
  </div>
</template>

<script>
import config from '../config';
import _ from 'loadsh';
import axios from 'axios';

import Vue from 'vue';
import {ClientTable} from 'vue-tables-2';
Vue.use(ClientTable);

export default {
  name: "Tables1",
  props: [
    '_fetch',
    '_options',
    '_columns',
    '_datas',
  ],

  data: function () {
    return {
      fetch: {},
      columns: [],
      datas: [],
    }
  },

  created() {
    this.fetch = JSON.parse(this.$props._fetch || JSON.stringify(config.defaultDatas.fetch));
    this.columns = JSON.parse(this.$props._columns || JSON.stringify(config.defaultDatas.columns));
    this.datas = this.$props._datas || config.defaultDatas.datas;
    this.reload();
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
      var fetch = this.fetch;
      axios(fetch).then(function (response) {
        console.debug(fetch, response);
        vm.datas = _.get(response, fetch.path, []);
      }).catch(function (error) {
        console.error(fetch, error);
      }).finally(function () {
        console.log('fetch data end');
      }); 
    }
  }
};
</script>

<style scoped>
</style>
