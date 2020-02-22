<template>
  <div class="table-responsive">
    <vuetable ref="vuetable" class="table-striped"
      :fields="columns"
      :http-fetch="fetchData"
      :http-options="fetchs"
      :api-url="fetchs.url"
      :http-method="fetchs.method"
      :append-params="fetchs.params"
      :query-params="fetchs.querys"
      data-path="datas"
      pagination-path="pages"
      @vuetable:pagination-data="onPaginationData">
    </vuetable>
    <vuetable-pagination ref="pagination"
      @vuetable-pagination:change-page="onChangePage">
    </vuetable-pagination>
  </div>
</template>

<script>
import config from '../config';
import _ from 'loadsh';
import axios from 'axios';
import moment from 'moment'

import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'

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
    //this.reload();
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
      return axios(this.fetchs);
    },
    formatDate(value, fmt = 'YYYY-MM-DD HH:mm:ss') {
      if (value == null) return ''
      var date = new Date(value/1);
      return moment(date).format(fmt)
    },
    transform: function(data) {
      var datas = _.get(data, this.fetchs.dataPath, []);
      var pages = _.get(data, this.fetchs.pagePath, {});
      var transformed = {datas: datas};
      transformed.pages = {
        total: pages.totalElements,
        per_page: pages.size,
        current_page: pages.number,
        last_page: pages.totalPages,
        next_page_url: "https://vuetable.ratiw.net/api/users?page=2",
        prev_page_url: null,
        from: pages.numberOfElements,
        to: parseInt(pages.numberOfElements) + datas.length
      }
      return transformed;
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },

  },
  components: {
    Vuetable, 
    VuetablePagination
  }
};
</script>

<style scoped>
</style>
