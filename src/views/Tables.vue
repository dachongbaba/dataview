<template>
  <div class="table-responsive">
    <datatable class="table table-striped" :columns="datas.columns" :data="datas.rows" />
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
  name: "Tables",

  data: function () {
    return {
      datas: config.defaultDatas
    }
  },

  created() {
    this.reload();
  },

  computed: {
    now() {
      return Date.now()
    }
  },

  methods: {
    reload() {
      //return _.debounce(this.fetch, 500);
      this.fetch();
    },

    fetch() {
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
        var data = _.get(response, 'data.payload.content', []);
        vm.datas.columns = _.keys(data);
        vm.datas.rows = data;
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
