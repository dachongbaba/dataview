<template>
  <div v-if="views && views.columns && views.fetchs">
    <h2 v-if="views.title">{{ datas.title }}</h2>
    <p v-if="views.desc" class="text-muted">{{ datas.desc }}</p>
    <data-filter 
      :items="views.filters" 
      :filters.sync="filters"
    />
    <br/>
    <data-table 
      :fields="views.columns" 
      :fetchs="views.fetchs"
      :filters="filters"
      :pages.sync="pages"
      :page="page"
      :size="size"
    />
    <br/>
    <data-page 
      class="justify-content-center"
      :page.sync="page"
      :size.sync="size"
      :pages="pages"
    />
  </div>
</template>

<script>
import _ from 'loadsh';
import axios from 'axios';
import defultConfig from '../config';
import DataTable from '../components/DataTable';
import DataFilter from '../components/DataFilter';
import DataPage from '../components/DataPage';

export default {
  name: "Tables",
  props: [],
  data: function () {
    return {
      config: {},
      views: {},
      filters: {},
      pages: {},
      page: null,
      size: null,
    };
  },

  async created() { 
    var vm = this;
    if (this.$route.query.config) {
      let response = {};
      try {
        response = await axios.get(this.$route.query.config);
        this.config = _.merge({}, defultConfig, response.data || {});
      } catch (ex) {
        alert('config ' + this.$route.query.config + ' load error\n' + ex.message + ' ')
        return
      }
    } else {
      this.config = _.merge({}, defultConfig);
    }

    var views = this.$route.query;
    var options = JSON.parse(views.options || {});
    var fetchs = JSON.parse(views.fetchs || {});
    var columns = JSON.parse(views.columns || []);
    var filters = JSON.parse(views.filters || []);

    views.options = _.merge({}, this.config.options, options);
    views.fetchs = _.merge({}, this.config.fetchs, fetchs);

    views.columns = _.map(columns, (item, key) => {
      if (typeof key === 'number') {
        if (typeof item === 'string') {
          return vm.config.columns[item];
        } else {
          return item;
        }
      }
      return _.merge({}, vm.config.columns[key], item);
    });
    
    views.filters = _.map(filters, (item, key) => {
      if (typeof key === 'number') {
        if (typeof item === 'string') {
          return vm.config.filters[item];
        } else {
          return item;
        }
      }
      return _.merge({}, vm.config.filters[key], item);
    });
    
    this.views = _.merge({
      view: '',
      title: '',
      desc: '',
      fetchs: '{}',
      columns: '[]',
      filters: '[]',
      options: '{}',
    }, views);
  },

  components: {
    DataTable,
    DataFilter,
    DataPage
  }
};
</script>

<style scoped>
</style>
