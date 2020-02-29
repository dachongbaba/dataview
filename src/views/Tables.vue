<template>
  <div>
    <data-filter 
      :filters="filters" 
      :datas.sync="search"
    />
    <data-table 
      :fields="columns" 
      :fetchs="fetchs"
      :search="search" 
      :datas.sync="datas"
    />
  </div>
</template>

<script>
import _ from 'loadsh';
import axios from 'axios';
import config from '../config';
import DataTable from '../components/DataTable';
import DataFilter from '../components/DataFilter';

export default {
  name: "Tables",
  props: [
    '_config',
    '_title',
    '_desc',
    '_view',
    '_fetchs',
    '_columns',
    '_filters',
    '_options',
  ],

  data: function () {
    return {
      config: {},
      title: '',
      desc: '',
      view: '',
      options: {},
      fetchs: {},
      columns: [],
      filters: [],
      datas: {},
      search: {},
    }
  },

  async created() { 
    if (this._config) {
      let res = await axios.get(this._config);
      _.merge(this.config, config, res.data);
    } else {
      _.merge(this.config, config);
    }

    this.title = this._title || '';
    this.desc = this._desc || '';
    this.view = this._view || '';

    var options = JSON.parse(this._options || {});
    this.options = _.merge({}, config.options, options);

    var fetchs = JSON.parse(this._fetchs || {});
    this.fetchs = _.merge({}, config.fetchs, fetchs);
    
    var columns = JSON.parse(this._columns || []);
    this.columns = columns.map((item) => _.merge({}, config.columns[item] || {}, columns[item] ? columns[item] : {}));
    
    var filters = JSON.parse(this._filters || []);
    this.filters = filters.map((item) => _.merge({}, config.filters[item] || {}, filters[item] ? filters[item] : {}));
  },

  components: {
    DataTable,
    DataFilter
  }
};
</script>

<style scoped>
</style>
