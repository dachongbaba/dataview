<template>
  <div>
    <div class="col mb-4" v-for="(data, row) in datas" :key="row">
      <div class="card">
        <div v-if="fields.header" class="card-header">
          <template v-for="(field, index) in fields.header">
            <span :key="index"><b>{{ field.title }}:</b> {{ format(data, field) }}</span>
          </template>
        </div>
        <div v-if="fields.body" class="card-body">
          <template v-for="(field, index) in fields.body">
            <span :key="index"><b>{{ field.title }}</b> {{ format(data, field) }}</span>
          </template>
        </div>
        <ul v-if="fields" class="list-group list-group-flush">
          <li 
            class="list-group-item d-flex justify-content-between"
            v-for="(field, col) in fields" 
            :key="col"
          >
            <span class="text-muted">{{ field.title }}</span>
            <span>{{ format(data, field) }}</span>
          </li>
        </ul>
        <div v-if="fields.footer" class="card-footer">
          <template v-for="(field, index) in fields.footer">
            <small class="text-muted" :key="index">{{ field.title }}: {{ format(data, field) }}</small>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'loadsh';
import axios from 'axios';
import moment from 'moment';

function fetchData(vm, fetchs, filters) {
  var request = _.clone(fetchs);
  if (request.methods == 'post') {
    request.data = _.merge({}, fetchs.data, filters);
  } else {
    request.params = _.merge({}, fetchs.params, filters);
  }
  request.params.page = (this.page === null ? request.pages.page : this.page) + request.pages.index;
  request.params.size = (this.size === null ? request.pages.size : this.size);
  axios(request).then(function (response) {
    vm.datas = _.get(response.data, request.paths.dataPath, []);

    var pages = {};
    pages.page = _.get(response.data, request.paths.pagePath, 0) * 1 - request.pages.index;
    pages.total = _.get(response.data, request.paths.totalPath, 0) * 1;
    pages.count = _.get(response.data, request.paths.countPath, 0) * 1;
    pages.size = _.get(response.data, request.paths.sizePath, 20) * 1;
    pages.length = vm.datas.length;
    vm.$emit('update:pages', pages);
  }).catch(function (error) {
    console.error(fetch, error);
  }).finally(function () {
  });
}

export default {
  name: "DataCard",
  props: {
    fields: {
      type: Object,
      default: function () {
        return {}
      },
    },
    fetchs: {
      type: Object,
      default: function () {
        return {}
      },
    },
    filters: {
      type: Object,
      default: function () {
        return {}
      },
    },
    pages: {
      type: Object,
      default: function () {
        return {}
      },
    },
    page: {
      type: Number,
      default: function () {
        return null
      },
    },
    size: {
      type: Number,
      default: function () {
        return null
      },
    },
  },

  data() {
    return {
      datas: this.fetchs.datas,
    };
  },

  watch: {
    filters: {
      handler () {
        this.resetPage();
        this.fetchData();
      },
      deep: true
    },
    page: {
      handler () {
        this.fetchData();
      },
      deep: true
    }
  },

  created() {
    var self = this;
    _.map(this.fields, (field) => {
      // eslint-disable-next-line valid-typeof
      if (field.length) {
        _.map(field, (item) => {
          if (item.format) {
            var params = item.format.split('|');
            var render = self[params[0]];
            item.format = (value) => {
              params[0] = value;
              return render.apply(self, params);
            };
          }
        });
      } else {
        if (field.format) {
          var params = field.format.split('|');
          var render = self[params[0]];
          field.format = (value) => {
            params[0] = value;
            return render.apply(self, params);
          };
        }
      }
    })
    this.fetchData();
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
      return this.fetch(this, this.fetchs, this.filters);
    },
    resetPage() {
      this.$emit('update:page', this.fetchs.pages.page || 0);
    },
    format(data, field) {
      if (!field) {
        return '-';
      }
      if (field.format) {
        return field.format(data[field.data]);
      }
      return data[field.data];
    },
    formatDate(value, fmt = 'YYYY-MM-DD') {
      value = value/1;
      if (!value) return '';
      var date = new Date(value);
      var text = moment(date).format(fmt);
      return text;
    },
    formatStat(value, stat = '') {
      value = value/1;
      stat = JSON.parse(stat);
      return stat[value] || value || '-';
    },
  }
};
</script>

<style scoped>

</style>
