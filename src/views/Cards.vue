<template>
  <div class="table-responsive">
    <datatable class="table table-striped" :columns="columns" :data="datas" />
  </div>
</template>

<script>
import config from '../config';
import _ from 'loadsh';
import axios from 'axios';

import Vue from 'vue';
import { VuejsDatatableFactory } from 'vuejs-datatable';
Vue.use( VuejsDatatableFactory );

export default {
  name: "Cards",
  props: [
    '_fetch',
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
    this.$data.fetch = this.$props._fetch || config.defaultDatas.fetch;
    this.$data.columns = this.$props._columns || config.defaultDatas.columns;
    this.$data.datas = this.$props._datas || config.defaultDatas.datas;
    this.reloadFetch();
  },

  computed: {
    now() {
      return Date.now()
    },
    
    reloadFetch() {
      return _.debounce(this.fetchData, 500);
    },
  },

  methods: {
    fetchData() {
      var vm = this;
      var fetch = {
        method: 'post',
        url: '/data/search/m2/v1/aggregation/common',
        params: {
          tableName: 'o_express',
          query: '{"bool":{"must":[]}}',
        },
        headers: { 
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
      axios(fetch).then(function (response) {
        console.debug(fetch, response);
        //vm.datas.columns = _.keys(data);
        vm.datas = _.get(response, 'data.payload.content', []);
      }).catch(function (error) {
        console.error(fetch, error);
      }).finally(function () {
        // vm.datas = config.test1Datas;
      }); 
    }
  }
};
</script>

<style scoped>
</style>
