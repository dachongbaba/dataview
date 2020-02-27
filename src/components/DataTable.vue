<template>
  <div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr class="table-secondary">
            <th 
              v-for="field in fields" 
              :key="field.data"
            >
              {{ field.title || field.data }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(data, row) in datas" 
            :key="row"
          >
            <td
              v-for="(field, col) in fields" 
              :key="col"
            >
              {{ format(data, field) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="total" class="d-flex justify-content-end">
      <div class="align-self-center">
        page: {{ page + 1 }} / {{ total }},
        count: {{ page * this.size + 1 }} - {{ page * this.size + datas.length }} / {{ count }}
      </div>
      <div class="p-1"></div>
      <div class="align-self-center">
        <ul class="pagination m-0">
          <li class="page-item" :class="{'disabled': page <= 0}">
            <a class="page-link" href="#" v-on:click.stop.prevent="pagePrev">
              <i class="fa fa-chevron-left"/>
            </a>
          </li>
          <li class="page-item" :class="{'disabled': page >= total - 1}">
            <a class="page-link" href="#" v-on:click.stop.prevent="pageNext">
              <i class="fa fa-chevron-right"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'loadsh';
import axios from 'axios';
import moment from 'moment';

function fetchData(vm, fetchs) {
  fetchs.params.page = this.page + fetchs.pages.index;
  fetchs.params.size = this.size;
  axios(fetchs).then(function (response) {
    vm.datas = _.get(response.data, fetchs.paths.dataPath, []);
    vm.page = _.get(response.data, fetchs.paths.pagePath, 0) * 1 - fetchs.pages.index;
    vm.total = _.get(response.data, fetchs.paths.totalPath, 0) * 1;
    vm.count = _.get(response.data, fetchs.paths.countPath, 0) * 1;
    vm.size = _.get(response.data, fetchs.paths.sizePath, 20) * 1;
  }).catch(function (error) {
    console.error(fetch, error);
  }).finally(function () {
  });
}

export default {
  name: "DataTable",
  props: {
    fields: {
      type: Array,
      default: function () {
        return []
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
    }
  },

  data() {
    return {
      datas: this.fetchs.datas,
      index: 0,
      page: 0,
      size: 20,
      total: 0,
      count: 0,
      length: 0,
    };
  },

  watch: {
    filters: {
      handler () {
        this.page = this.fetchs.pages.page || 0;
      },
      deep: true
    }
  },

  created() {
    this.index = this.fetchs.pages.page || this.index;
    this.page = this.fetchs.pages.page || this.page;
    this.size = this.fetchs.pages.size || this.size;

    var self = this;
    this.fields.map((field) => {
      if (field.format) {
        var params = field.format.split('|');
        var render = self[params[0]];
        field.format = (value) => {
          params[0] = value;
          return render.apply(self, params);
        };
      }
    })
    this.fetchData(this, this.fetchs);
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
    pagePrev() {
      if (this.page <= 0) {
        return;
      }
      this.page -= 1;
      this.fetchData();
    },
    pageNext() {
      if (this.page >= this.total - 1) {
        return;
      }
      this.page += 1;
      this.fetchData()
    },
    format(data, field) {
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
  }
};
</script>

<style scoped>

</style>
