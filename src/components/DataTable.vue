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
              {{ renderCell(data, field) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="total" class="d-flex justify-content-end">
      <div class="align-self-center">
        count: {{ (this.page - this.index) * this.size + 1 }} - {{ (this.page - this.index) * this.size + datas.length }} / {{ count }}, 
        page: {{ page }} / {{ total }}
      </div>
      <div class="p-1"></div>
      <div class="align-self-center">
        <ul class="pagination m-0">
          <li class="page-item" :class="{'disabled': page <= index}">
            <a class="page-link" href="#" v-on:click.stop.prevent="pagePrev">
              <i class="fa fa-chevron-left"/>
            </a>
          </li>
          <li class="page-item" :class="{'disabled': page >= total}">
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
import moment from 'moment';

export default {
  name: "DataTable",
  props: {
    fields: {
      type: Array,
      default: function () {
        return []
      },
    },
    datas: {
      type: Array,
      default: function () {
        return []
      },
    },
    index: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 20,
    },
  },
  data() {
   return {
     
   };
  },

  created() {
    var self = this;
    this.fields.map((field) => {
      if (field.render) {
        var params = field.render.split('|');
        var render = self[params[0]];
        field.render = (value) => {
          params[0] = value;
          return render.apply(self, params);
        };
      }
    })
  },
  
  methods: {
    pagePrev() {
      if (this.page <= this.index) {
        return;
      }
      var page = this.page - 1;
      this.$emit('update:page', page)
    },
    pageNext() {
      if (this.page >= this.total) {
        return;
      }
      var page = this.page + 1;
      this.$emit('update:page', page)
    },
    renderCell(data, field) {
      if (field.render) {
        return field.render(data[field.data]);
      }
      return data[field.data];
    },
    formatDate(value, fmt = 'YYYY-MM-DD') {
      if (!value) return '';
      var date = new Date(value/1);
      var text = moment(date).format(fmt);
      return text;
    },
  }
};
</script>

<style scoped>

</style>
