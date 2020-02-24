<template>
  <div>
    <table ref="table" class="display" style="width:100%"></table>
  </div>
</template>

<script>
import config from '../config';
import _ from 'loadsh';
import axios from 'axios';
import moment from 'moment';
import 'datatables.net/js/jquery.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.css'

/*
import 'datatables.net-plugins/dataRender/datetime'
import 'datatables.net-plugins/dataRender/ellipsis'
import 'datatables.net-plugins/dataRender/intl'
import 'datatables.net-plugins/dataRender/percentageBars'

import 'datatables.net-plugins/type-detection/currency'
import 'datatables.net-plugins/type-detection/date-uk'
import 'datatables.net-plugins/type-detection/file-size'
import 'datatables.net-plugins/type-detection/formatted-num'
import 'datatables.net-plugins/type-detection/ip-address'
import 'datatables.net-plugins/type-detection/num-html'
import 'datatables.net-plugins/type-detection/numeric-comma'
*/

export default {
  name: "Tables",
  props: [
    '_fetchs',
    '_columns',
    '_options',
    '_querys',
  ],
  data: function () {
    return {
      dt: null,
      fetchs: {},
      columns: [],
      options: {},
      datas: [],
      total: 0,
    }
  },

  watch: {
    query: {
      handler (query) {
        this.reload(query);
      },
      deep: true
    }
  },

  created() { 
    this.fetchs = JSON.parse(this.$props._fetchs || JSON.stringify(config.defaultDatas.fetchs));
    this.columns = JSON.parse(this.$props._columns || JSON.stringify(config.defaultDatas.columns));
    this.options = JSON.parse(this.$props._options || JSON.stringify(config.defaultDatas.options));
  },
  mounted() {
    var that = this;
    var defaultOptions = {
      ajaxDataProp: 'data',
      serverSide: true,
      ajax: this.reload,
      search: {
        search: this.fetchs.params.query
      }
    };
    var options = _.merge({}, defaultOptions, that.options, {
      columns: _.map(this.columns, (column) => {
        return this.columnRender.call(that, column);
      })
      // columns: this.columns
    })
    that.dt = that.jq(that.$refs.table).DataTable(options);
  },
  beforeDestroy() {
    this.dataTable.destroy(true);
  },
  
  computed: {
    jq() {
      return this.jquery || window.jQuery
    },
    reload() {
      return _.debounce(this.fetchData, 500);
    }
  },

  methods: {
    fetchData(data, callback) {
      var vm = this;
      var fetchs = this.fetchs;
      if (!this.options.searching) {
        fetchs.params.query = data.search.value;
      }
      if (!this.options.paging) {
        fetchs.params.page = data.start / data.length + 1;
        fetchs.params.size = data.length || 20;
      }
      if (!this.options.ordering) {
        var index = data.order[0].column;
        var sort = data.columns[index].data;
        var order = data.order[0].dir
      }
      fetchs.params.sort = `${sort},${order}`;
      axios(fetchs).then(function (response) {
        vm.datas = _.get(response.data, fetchs.dataPath, []);
        vm.total = _.get(response.data, fetchs.pagePath, 0) * 1;
        vm.error = _.get(response.data, fetchs.errorPath, {});
      }).catch(function (error) {
        console.error(fetch, error);
      }).finally(function () {
        // vm.dt.clear().rows.add(vm.datas).draw(false);
        callback({
          recordsTotal: vm.total,
          recordsFiltered: vm.total,
          data: vm.datas,
          error: vm.error
        });
      });
    },
    columnRender(column) {
      if (column.render) {
        var that = this;
        var renders = column.render.split('|');
        var render = that[renders[0]];
        column.render = function(data) {
          renders[0] = data;
          return render.apply(that, renders);
        }
      }
      return column; 
    },
    formatDate(value, fmt = 'YYYY-MM-DD') {
      if (!value) return '';
      var date = new Date(value/1);
      var text = moment(date).format(fmt);
      return text;
    }
  },
};
</script>

<style scoped>
</style>
