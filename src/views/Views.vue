<template>
  <div class="jumbotron">
    <form>
      <div class="form-group">
        <select v-model="datas.view" class="form-control font-weight-bolder">
          <option v-for="option in config.views" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <small id="viewHelp" class="form-text text-muted">view type</small>
      </div>

      <div class="form-group">
        <textarea v-model="datas.title" class="col form-control font-weight-bolder" :rows="textline(datas.title)" placeholder="Title" data-toggle="collapse" data-target="#titleConfig"></textarea>
        <small id="viewHelp" class="form-text text-muted">view desc</small>
        <pre id="descConfig" class="collapse"><code>{{ config.title }}</code></pre>
      </div>

      <div class="form-group">
        <textarea v-model="datas.desc" class="col form-control font-weight-bolder" :rows="textline(datas.desc)" placeholder="Desc" data-toggle="collapse" data-target="#descConfig"></textarea>
        <small id="viewHelp" class="form-text text-muted">view desc</small>
        <pre id="descConfig" class="collapse"><code>{{ config.desc }}</code></pre>
      </div>

      <div class="form-group">
          <textarea v-model="datas.fetchs" class="col form-control font-weight-bolder" :rows="textline(datas.fetchs)" placeholder="Fetch" data-toggle="collapse" data-target="#fetchConfig"></textarea>
          <small id="viewHelp" class="form-text text-muted">data fetch</small>
          <pre id="fetchConfig" class="collapse"><code>{{ format(config.fetchs) }}</code></pre>
      </div>

      <div class="form-group">
        <textarea id="columns" v-model="datas.columns" class="form-control font-weight-bolder" :rows="textline(datas.columns)" placeholder="Column" data-toggle="collapse" data-target="#columnConfig"></textarea>
        <small id="viewHelp" class="form-text text-muted">table column</small>
        <pre id="columnConfig" class="collapse"><code>{{ format(config.columns) }}</code></pre>
      </div>

      <div class="form-group">
        <textarea id="filter" v-model="datas.filters" class="form-control font-weight-bolder" :rows="textline(datas.filters)" placeholder="Filter" data-toggle="collapse" data-target="#filterConfig"></textarea>
        <small id="viewHelp" class="form-text text-muted">filter search</small>
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
            <router-link :to="{path: datas.view, query:$route.query}">{{ viewurl }}</router-link>
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
  data() {
    return {
      config: {},
      datas: {
        title: '',
        desc: '',
        view: '',
        fetchs: '',
        columns: '',
        filters: '',
        options: '',
      },
      result: '',
      viewurl: buildUrl('http://localhost:8080/', {
        path: 'dataview',
        hash: this.$route.query._view,
        queryParams: this.$route.query
      }),
    };
  },
  async created() {
    if (this._config) {
      let res = await axios.get(this._config);
      _.merge(this.config, config, res.data);
    } else {
      _.merge(this.config, config);
    }
    this.datas.title = this._title || '';
    this.datas.desc = this._desc || '';
    this.datas.view = this._view || '';
    this.datas.fetchs = this.format(this._fetchs || {});
    this.datas.columns = this.format(this._columns || []);
    this.datas.filters = this.format(this._filters || []);
    this.datas.options = this.format(this._options|| []);
    this.datas.datas = this.format(this._datas || []);
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
      var fetchs = JSON.parse(this.datas.fetchs);
      var columns = JSON.parse(this.datas.columns);
      var filters = JSON.parse(this.datas.filters);
      var options = JSON.parse(this.datas.options);
      return _.merge({}, this.$route.query, {
        _view: this.datas.view,
        _title: this.datas.title,
        _desc: this.datas.desc,
        _fetchs: JSON.stringify(fetchs),
        _columns: JSON.stringify(columns),
        _filters: JSON.stringify(filters),
        _options: JSON.stringify(options),
      });
    },
    buildConfig() {
      this.result = this.format(this.buildData());
    },
    buildLink() {
      this.$router.replace({
        path: 'views',
        query: this.buildData()
      });
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
      var len = input.split('\n').length;
      return len || 1;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
