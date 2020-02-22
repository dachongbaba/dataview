<template>
  <div class="table-responsive">
    <vuetable 
      ref="vuetable"
      data-path=""
      api-url="https://vuetable.ratiw.net/api/users"
      pagination-path=""
      :fields="columns"
      :data="datas"
    ></vuetable>
  </div>
</template>

<script>
import config from '../config';
import _ from 'loadsh';
import axios from 'axios';

import Vuetable from 'vuetable-2'

export default {
  name: "Tables",
  props: [
    '_fetchs',
    '_columns',
    '_options',
    '_datas',
  ],

  data: function () {
    return {
      fetchs: {},
      columns: [],
      options: {},
      datas: [],
    }
  },

  created() {
    this.fetchs = JSON.parse(this.$props._fetchs || JSON.stringify(config.defaultDatas.fetchs));
    this.columns = JSON.parse(this.$props._columns || JSON.stringify(config.defaultDatas.columns));
    this.options = JSON.parse(this.$props._options || JSON.stringify(config.defaultDatas.options));
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
      var fetchs = this.fetchs;
      axios(fetchs).then(function (response) {
        vm.datas = _.get(response, fetchs.path, []);
      }).catch(function (error) {
        console.error(fetch, error);
      }).finally(function () {
      }); 
    }
  },
  components: {
    Vuetable
  }
};
</script>

<style scoped>
</style>
