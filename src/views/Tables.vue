<template>
  <div class="table-responsive">
    <datatable class="table table-striped" :columns="datas.columns" :data="datas.rows" />
  </div>
</template>

<script>
import config from '../config';
import Vue from "vue";
import { VuejsDatatableFactory } from "vuejs-datatable";
import axios from 'axios';
// import loadsh from 'loadsh';

Vue.use(VuejsDatatableFactory);

export default {
  name: "Tables",
  data: function () {
    return {
      datas: config.defaultDatas
    }
  },
  created() {
    this.fetch();
  },
  computed: {
    now() {
      return Date.now()
    }
  },
  methods: {
    fetch() {
      var fetch = '/data/search/m2/v1/aggregation/common';
      var data = {
        params: {},
        tableName: 'o_express',
        query: '{"bool":{"must":[]}}',
        page: 1,
        size: 20,
        sort: ''
      }
      var self = this;
      axios.post(fetch, data).then(function (response) {
        console.debug(response);
        if (response, response.data) {
          self.datas = response.data;
        }
      }).catch(function (error) {
        console.error(error);
      }).finally(function () {
        vm.set('datas', config.testDatas);
      }); 
    }
  }
};
</script>

<style scoped>
</style>
