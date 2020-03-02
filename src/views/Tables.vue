<template>
  <div v-if="datas">
    <h2 v-if="datas.title">{{ datas.title }}</h2>
    <p v-if="datas.desc" class="text-muted">{{ datas.desc }}</p>
    <data-filter 
      :items="datas.filters" 
      :querys.sync="querys"
    />
    <data-table 
      :fields="datas.columns" 
      :fetchs="datas.fetchs"
      :result.sync="result"
      :querys="querys" 
    />
  </div>
</template>

<script>
import _ from 'loadsh';
import axios from 'axios';
import defultconfig from '../config';
import DataTable from '../components/DataTable';
import DataFilter from '../components/DataFilter';

export default {
  name: "Tables",
  props: [
  ],
  data: function () {
    return {
      config: null,
      datas: null,
      result: null,
      querys: null,
    };
  },

  async created() { 
    var vm = this;
    if (this.$route.query.config) {
      let response = {};
      try {
        response = await axios.get(this.$route.query.config);
        this.config = _.merge({}, defultconfig, response.data || {});
      } catch (ex) {
        alert('config ' + this.$route.query.config + ' load error\n' + ex.message + ' ')
        return
      }
    } else {
      this.config = _.merge({}, defultconfig);
    }

    var datas = this.$route.query;
    
    var options = JSON.parse(datas.options || {});
    var fetchs = JSON.parse(datas.fetchs || {});
    var columns = JSON.parse(datas.columns || []);
    var filters = JSON.parse(datas.filters || []);

    datas.options = _.merge({}, this.config.options, options);
    datas.fetchs = _.merge({}, this.config.fetchs, fetchs);

    datas.columns = _.map(columns, (item, key) => {
      if (typeof key === 'number') {
        if (typeof item === 'string') {
          return vm.config.columns[item];
        } else {
          return item;
        }
      }
      return _.merge({}, this.config.columns[key] || {}, columns[item] ? columns[item] : {});
    });
    
    datas.filters = _.map(filters, (item, key) => {
      if (typeof key === 'number') {
        if (typeof item === 'string') {
          return vm.config.filters[item];
        } else {
          return item;
        }
      }
      return _.merge({}, this.config.filters[key] || {}, filters[item] ? filters[item] : {});
    });
    
    this.datas = _.merge({
      view: '',
      title: '',
      desc: '',
      fetchs: '{}',
      columns: '[]',
      filters: '[]',
      options: '{}',
    }, datas);
  },

  components: {
    DataTable,
    DataFilter
  }
};
</script>

<style scoped>
</style>
