<template>
  <div class="jumbotron">
    <div class="row">
      <form class="col-12">
        <h1 v-if="title" class="display-4">{{ title }}</h1>
        <p v-if="desc">{{ desc }}</p>
        <div class="form-group">
          <label for="view">View</label>
          <select id="view" v-model="view" class="form-control font-weight-bolder">
            <option v-for="option in config.views" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <small id="viewHelp" class="form-text text-muted"></small>
        </div>

        <div class="form-group">
          <label for="fetchs">Fetchs</label>
          <textarea id="fetchs" v-model="fetchs" class="form-control font-weight-bolder" rows="3"></textarea>
          <small id="viewHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        
        <div class="form-group">
          <label for="columns">Columns</label>
          <textarea id="columns" v-model="columns" class="form-control font-weight-bolder" rows="3"></textarea>
          <small id="viewHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div class="form-group">
          <label for="options">Options</label>
          <textarea id="options" v-model="options" class="form-control font-weight-bolder" rows="3"></textarea>
          <small id="viewHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
      </form>

      <div class="col-12 text-break">
        <div class="form-row justify-content-center">
          <div class="col-auto">
            <button v-on:click.stop.prevent="fetch" class="btn btn-primary">Load Data</button>
          </div>
          <div class="col-auto">
            <button v-on:click.stop.prevent="build" class="btn btn-primary">Build Link</button>
          </div>
        </div>
        <div class="text-break">
          <router-link v-if="url" :to="path">{{ url }}</router-link>
        </div>
      </div>
    </div>
    <div>
      <pre>{{ datas }}</pre>
    </div>
  </div>
</template>

<script>
import _ from 'loadsh';
import axios from 'axios';
import buildUrl from 'build-url';
import jsonFormat from 'json-format';
import config from '../config';

export default {
  name: "Views",
  props: [
    '_config',
    '_fetchs',
    '_columns',
    '_options',
    '_title',
    '_desc',
    '_view',
  ],
  data() {
    return {
      config: {},
      title: '',
      descs: '',
      view: '',
      fetchs: '',
      columns: '',
      options: '',
      datas: '',
      path: '',
      url: '',
    };
  },
  created() {
    this.loadConfig();
    this.fetchs = this.format(this.$props._fetchs || this.config.fetchs);
    this.columns = this.format(this.$props._columns || this.config.columns);
    this.options = this.format(this.$props._options || this.config.options);
    this.datas = this.format(this.$props._options || this.config.datas);
    this.title = this.$props._title || this.config.title || '';
    this.desc = this.$props.desc || this.config.desc || '';
    this.view = this.$props._view || this.config.view || '';
  },
  computed: {
    jq() {
      return window.jQuery;
    },
    fetch() {
      return _.debounce(this.fetchData, 500);
    }
  },
  methods: {
    async loadConfig() {
      var vm = this;
      if (this._config) {
        const response = await axios.get(this._config);
        response.then((response)=> vm.config = response.data);
      } else {
        this.config = config;
      } 
    },
    fetchData() {
      var vm = this;
      var fetchs = this.parse(vm.fetchs);
      fetchs.params.page = fetchs.pages.page + fetchs.pages.index;
      fetchs.params.size = fetchs.pages.size;
      axios(fetchs).then(function (response) {
        if (response && response.data) {
          vm.datas = vm.format(response.data);
        }
      }).catch(function (error) {
        vm.datas = vm.format(error);
      }).finally(function () {
        
      }); 
    },
    
    format(input) {
      if (!input) {
        return "";
      }
      if (input == 'string') {
        input = this.parse(input)
      }
      return jsonFormat(input, {type: 'space', size: 2});
    },
    json(value) {
      return JSON.stringify(value);
    },
    parse(value) {
      return JSON.parse(value);
    },
    build() {
      var fetchs = this.parse(this.fetchs);
      var columns = this.parse(this.columns);
      var options = this.parse(this.options);
      var querys = {
        _fetchs: this.json(fetchs),
        _columns: this.json(columns),
        _options: this.json(options),
      };
      this.url = '/#' + this.view + buildUrl({queryParams: querys});
      this.path = {path: this.view, query: querys};
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
