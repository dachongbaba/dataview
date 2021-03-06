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
        <textarea v-model="datas.title" class="col form-control font-weight-bolder" :rows="textline(datas.title)" placeholder="Title" @focus="onFocus('#titleHelp')" @blur="onBlur('#titleHelp')"></textarea>
        <small id="titleHelp" class="form-text text-muted" data-toggle="collapse" data-target="#titleConfig">dataview title</small>
        <pre id="titleConfig" class="collapse"><code>{{ config.title }}</code></pre>
      </div>

      <div class="form-group">
        <textarea v-model="datas.desc" class="col form-control font-weight-bolder" :rows="textline(datas.desc)" placeholder="Desc" @focus="onFocus('#descHelp')" @blur="onBlur('#descHelp')"></textarea>
        <small id="descHelp" class="form-text text-muted" data-toggle="collapse" data-target="#descConfig">dataview desc</small>
        <pre id="descConfig" class="collapse"><code>{{ config.desc }}</code></pre>
      </div>

      <div class="form-group">
        <textarea v-model="datas.fetchs" class="col form-control font-weight-bolder" :rows="textline(datas.fetchs)" placeholder="Fetch" @focus="onFocus('#fetchHelp')" @blur="onBlur('#fetchHelp')"></textarea>
        <small id="fetchHelp" class="form-text text-muted" data-toggle="collapse" data-target="#fetchConfig">dataview fetch</small>
        <pre id="fetchConfig" class="collapse"><code>{{ format(config.fetchs) }}</code></pre>
      </div>

      <div class="form-group">
        <textarea v-model="datas.columns" class="form-control font-weight-bolder" :rows="textline(datas.columns)" placeholder="Column" @focus="onFocus('#columnHelp')" @blur="onBlur('#columnHelp')"></textarea>
        <small id="columnHelp" class="form-text text-muted" data-toggle="collapse" data-target="#columnConfig">dataview column</small>
        <pre id="columnConfig" class="collapse"><code>{{ format(config.columns) }}</code></pre>
      </div>

      <div class="form-group">
        <textarea v-model="datas.filters" class="form-control font-weight-bolder" :rows="textline(datas.filters)" placeholder="Filter" @focus="onFocus('#filterHelp')" @blur="onBlur('#filterHelp')"></textarea>
        <small id="filterHelp" class="form-text text-muted" data-toggle="collapse" data-target="#filterConfig" >dataview filter</small>
        <pre id="filterConfig" class="collapse"><code>{{ format(config.filters) }}</code></pre>
      </div>

      <div class="form-group">
        <textarea v-model="datas.options" class="form-control font-weight-bolder" :rows="textline(datas.options)" placeholder="Options" @focus="onFocus('#optionHelp')" @blur="onBlur('#optionHelp')"></textarea>
        <small id="optionHelp" class="form-text text-muted" data-toggle="collapse" data-target="#optionConfig">dataview options</small>
        <pre id="optionConfig" class="collapse"><code>{{ format(config.options) }}</code></pre>
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
import buildUrl from 'build-url';
import defultConfig from '../config';

function fetchData(vm) {
  var fetchs = _.merge({}, vm.config.fetchs, JSON.parse(vm.datas.fetchs));
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
        this.config = _.merge({}, defultConfig, response.data || {});
      } catch (ex) {
        alert('config ' + this.$route.query.config + ' load error\n' + ex.message + ' ')
        return
      }
    } else {
      this.config = _.merge({}, defultConfig);
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

    if (!this.$route.query.options) {
      this.datas.options = this.format({});
    } else {
      this.datas.options = this.format(this.datas.options);
    }

    if (!this.$route.query.fetchs) {
      this.datas.fetchs = this.format({
        method: this.config.fetchs.method,
        url: this.config.fetchs.url
      });
    } else {
      this.datas.fetchs = this.format(this.datas.fetchs);
    }

    if (!this.$route.query.columns) {
      this.datas.columns = this.format(_.keys(this.config.columns));
    } else {
      this.datas.columns = this.format(this.datas.columns);
    }

    if (!this.$route.query.filters) {
      this.datas.filters = this.format(_.keys(this.config.filters));
    } else {
      this.datas.filters = this.format(this.datas.filters);
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
    fetchData() {
      return this.fetch(this);
    },
    buildData() {
      return _.merge({}, this.datas, {
        fetchs: this.datas.fetchs ? this.format(this.datas.fetchs) : this.datas.fetchs,
        columns: this.datas.columns ? this.format(this.datas.columns) : this.datas.columns,
        filters: this.datas.filters ? this.format(this.datas.filters) : this.datas.filters,
        options: this.datas.options ? this.format(this.datas.options) : this.datas.options,
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
    },
    onFocus(target) {
      this.jq(target).click();
    },
    onBlur(target) {
      this.jq(target).click();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
