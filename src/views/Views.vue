<template>
  <div class="jumbotron">
    <form>
      <div class="form-group">
        <select v-model="datas.view" class="form-control font-weight-bolder">
          <option v-for="option in config.views" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <small id="viewHelp" class="form-text text-muted">dataview type</small>
      </div>

      <div class="form-group">
        <textarea v-model="datas.title" class="col form-control font-weight-bolder" :rows="textline(datas.title)" placeholder="Title" data-toggle="collapse" data-target="#titleConfig"></textarea>
        <small id="viewHelp" class="form-text text-muted">dataview desc</small>
        <pre id="descConfig" class="collapse"><code>{{ config.title }}</code></pre>
      </div>

      <div class="form-group">
        <textarea v-model="datas.desc" class="col form-control font-weight-bolder" :rows="textline(datas.desc)" placeholder="Desc" data-toggle="collapse" data-target="#descConfig"></textarea>
        <small id="viewHelp" class="form-text text-muted">dataview desc</small>
        <pre id="descConfig" class="collapse"><code>{{ config.desc }}</code></pre>
      </div>

      <div class="form-group">
          <textarea v-model="datas.fetchs" class="col form-control font-weight-bolder" :rows="textline(datas.fetchs)" placeholder="Fetch" data-toggle="collapse" data-target="#fetchConfig"></textarea>
          <small id="viewHelp" class="form-text text-muted">data fetch</small>
          <pre id="fetchConfig" class="collapse"><code>{{ format(config.fetchs) }}</code></pre>
      </div>

      <div class="form-group">
        <textarea id="columns" v-model="datas.columns" class="form-control font-weight-bolder" :rows="textline(datas.columns)" placeholder="Column" data-toggle="collapse" data-target="#columnConfig"></textarea>
        <small id="viewHelp" class="form-text text-muted">data column</small>
        <pre id="columnConfig" class="collapse"><code>{{ format(config.columns) }}</code></pre>
      </div>

      <div class="form-group">
        <textarea id="filter" v-model="datas.filters" class="form-control font-weight-bolder" :rows="textline(datas.filters)" placeholder="Filter" data-toggle="collapse" data-target="#filterConfig"></textarea>
        <small id="viewHelp" class="form-text text-muted">data filter</small>
        <pre id="filterConfig" class="collapse"><code>{{ format(config.filters) }}</code></pre>
      </div>
      <div class="form-group">
        <div class="form-row justify-content-center">
          <div class="col-auto">
            <button v-on:click.stop.prevent="fetchData" class="btn btn-primary">Load Data</button>
          </div>
          <div class="col-auto">
            <button v-on:click.stop.prevent="buildConfig" class="btn btn-primary">Build Config</button>
          </div>
          <div class="col-auto">
            <button v-on:click.stop.prevent="buildLink" class="btn btn-primary">Build Link</button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="text-break">
            <router-link :to="{path: datas.view, query:$route.query}">{{ view }}</router-link>
          </div>
        <pre>{{ result }}</pre>
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'loadsh';
import axios from 'axios';
import config from '../config';
import buildUrl from 'build-url';

function fetchData(vm) {
  var fetchs = _.merge({}, config.fetchs, JSON.parse(vm.datas.fetchs));
  fetchs.params.page = fetchs.pages.page + fetchs.pages.index;
  fetchs.params.size = fetchs.pages.size;
  axios(fetchs).then(function (response) {
    if (response && response.data) {
      vm.result = vm.format(response.data);
    }
  }).catch(function (error) {
    vm.result = vm.format(error);
  });
}

export default {
  name: "Views",
  props: [],
  data() {
    return {
      config: {},
      datas: {},
      result: '',
      view: '',
    };
  },
  async created() {
    if (this.$route.query.config) {
      let response = {};
      try {
        response = await axios.get(this.$route.query.config);
        this.config = _.merge({}, config, response.data || {});
      } catch (ex) {
        alert('config ' + this.$route.query.config + ' load error\n' + ex.message + ' ')
        return
      }
    } else {
      this.config = _.merge({}, config);
    }
    
    this.datas = _.merge({
      view: '',
      title: '',
      desc: '',
      fetchs: '{}',
      columns: '[]',
      filters: '[]',
      options: '{}',
    }, this.$route.query);

    if (!this.$route.query.fetchs) {
      this.datas.fetchs = this.format({
        method: config.fetchs.method,
        url: config.fetchs.url
      });
    } else {
      this.datas.fetchs = this.format(this.datas.fetchs);
    }

    if (!this.$route.query.columns) {
      this.datas.columns = this.format(_.keys(config.columns));
    } else {
      this.datas.columns = this.format(this.datas.columns);
    }

    if (!this.$route.query.filters) {
      this.datas.filters = this.format(_.keys(config.filters));
    } else {
      this.datas.filters = this.format(this.datas.filterss);
    }
  },
  computed: {
    jq() {
      return window.jQuery;
    },
    fetch() {
      return _.debounce(fetchData, 500);
    }
  },
  
  methods: {
    async loadConfig(url) {
      if (url) {
        let res = await axios.get(url);
        return res.data;
      } 
      return config;
    },
    fetchData() {
      return this.fetch(this);
    },
    buildData() {
      return _.merge({}, this.datas, {
        fetchs: this.datas.fetchs ? this.format(this.datas.fetchs) : this.datas.fetchs,
        columns: this.datas.columns ? JSON.parse(this.datas.columns) : this.datas.columns,
        filters: this.datas.filters ? JSON.parse(this.datas.filters) : this.datas.filters,
        options: this.datas.options ? JSON.parse(this.datas.options) : this.datas.options,
      });
    },
    buildConfig() {
      this.result = this.format(this.buildData());
    },
    buildLink() {
      var query = this.buildData();
      this.$router.replace({path: 'views', query: query});
      this.view = buildUrl('dataview/#/' + this.datas.view, {queryParams: query});
    },
    format(input) {
      if (!input) {
        return;
      }
      if (typeof input === 'string') {
        input = JSON.parse(input)
      }
      return JSON.stringify(input, null, 2);
    },
    textline(input) {
      if (!input) {
        return 1;
      }
      var len = input.split('\n').length;
      return len || 1;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>