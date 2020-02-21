<template>
  <div class="jumbotron mt-5 mb-5">
    <h1>{{ title }}</h1>
    <p>{{ descs }}</p>
    <form>
      <div class="form-group">
        <label for="view">View</label>
        <select id="view" v-model="view" class="form-control font-weight-bolder">
          <option v-for="option in config.defaultViews" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <small id="viewHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>

      <div class="form-group">
        <label for="fetch">Fetch</label>
        <textarea id="fetch" v-model="fetch" class="form-control font-weight-bolder" rows="5"></textarea>
        <small id="viewHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      
      <div class="form-group">
        <label for="columns">Columns</label>
        <textarea id="columns" v-model="columns" class="form-control font-weight-bolder" rows="5"></textarea>
        <small id="viewHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>

      <div class="form-row justify-content-center">
        <div class="col-auto">
          <button v-on:click="reload" class="btn btn-primary">Load Data</button>
        </div>
        <div class="col-auto">
          <button v-on:click="router" class="btn btn-primary">Build Link</button>
        </div>
      </div>
      <div class="form-group text-break">
        <router-link v-if="link" :to="build">{{ link }}</router-link>
        <pre class="mt-1 mb-1"><code>{{ datas }}</code></pre>
      </div>
    </form>
  </div>
</template>

<script>
import config from '../config';
import _ from 'loadsh';
import axios from 'axios';
import jsonFormat from 'json-format';
import buildUrl from 'build-url';

export default {
  name: "Views",
  props: [
    '_title',
    '_descs',
    '_view',
    '_fetch',
    '_columns',
  ],
  data() {
    return {
      title: '',
      descs: '',
      view: '',
      fetch: '',
      columns: '',
      datas: '',
      link: '',
      build: null,
    };
  },
  created() {
    this.title = this.$props._title || this.$data.title;
    this.descs = this.$props._descs || this.$data.descs;
    this.view = this.$props._view || this.$data.view;
    this.fetch = this.format(this.$props._fetch || config.defaultFetch);
    this.columns = this.format(this.$props._columns || config.defaultColumns);
    console.debug('fetch:', this.fetch, 'columns:', this.columns);
  },
  computed: {
    config() {
      return config
    },
    reloadFetch() {
      return _.debounce(this.fetchData, 500);
    },
  },
  methods: {
    reload() {
      this.reloadFetch();
    },
    router() {
      var fetch = this.parse(this.fetch);
      var columns = this.parse(this.columns);
      var querys = {
        fetch: this.json(fetch),
        columns: this.json(columns)
      };
      this.link = '/#' + this.view + buildUrl({queryParams: querys});
      this.build = {path: this.view, query: querys};
    },
    format(input) {
      return jsonFormat(input, {
        type: 'space',
        size: 2
      });
    },
    json(value) {
      return JSON.stringify(value);
    },
    parse(value) {
      return JSON.parse(value);
    },
    fetchData() {
      var vm = this;
      var fetch = this.parse(vm.fetch);
      axios(fetch).then(function (response) {
        var path = 'data.payload.content';
        var datas = _.get(response, path, []);
        vm.datas = vm.format(datas);
      }).catch(function (error) {
        vm.datas = vm.format(error);
      }).finally(function () {
        console.log('fetch data end');
      }); 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
