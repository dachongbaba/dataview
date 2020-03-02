<template>
  <div class="border rounded-left rounded-right">
    <ul class="nav mt-0 mb-0 align-self-center" style="width:100%;">
      <template v-for="(filter, index) in filters">
        <li v-if="filter.datetime" :key="index" class="nav-item p-1 align-self-center">
          <a class="btn bg-light d-flex h-100">
            <span class="align-self-center mr-1">{{ filter.label }}:</span>
            <datetime 
              v-model="filter.value" 
              class="align-self-center mr-1"
              input-class="border-0"
              :type="filter.datetime.type||'date'"
              :input-style="{'background-color':'transparent', width:filter.datetime.width||'120px'}"
            />
            <span class="align-self-center fa fa-remove p-1" @click.prevent="removeFilter(index)"></span>
          </a>
        </li> 

        <li v-else-if="filter.fetchs" :key="index" class="nav-item dropdown p-1 align-self-center">
          <a href="#" data-toggle="dropdown" class="btn bg-light d-flex h-100">
            <span class="align-self-center mr-1">{{ filter.label }}:</span> 
            <span class="align-self-center mr-1">{{ filter.text }}</span>
            <span class="align-self-center fa fa-remove p-1" @click.prevent="removeFilter(index)"></span>
          </a>
          <div class="dropdown-menu" :class="{show: filter.show}" style="min-width:300px;">
            <div class="input-group p-3">
              <input 
                type="text" 
                class="form-control"
                placeholder="Search" 
                v-model="filter.query" 
                @keyup.enter="fetchFilter(filter)"
              >
            </div>
            <div style="height:300px; overflow-y:auto;">
              <a 
                href="#"
                class="dropdown-item" 
                v-for="(item, id) in filter.datas"
                @click.prevent="setFilterValue(index, filter, item, item[filter.fetchs.paths.label||filter.fetchs.paths.title||filter.fetchs.paths.title.id])"
                :key="id"
              >
                <img 
                  v-if="filter.fetchs.paths.icon" 
                  :src="item[filter.fetchs.paths.icon]" 
                  class="img-thumbnail rounded-circle mr-1" 
                  width="25"
                />
                <b class="p-1">{{ item[filter.fetchs.paths.title||filter.fetchs.paths.label||filter.fetchs.paths.id] }}</b>
                <template v-for="(key, i) in filter.fetchs.paths.desc">
                  <span :key="i" class="p-1">{{ item[key] }}</span>
                </template>
              </a>
            </div>
          </div>
        </li>

        <li v-else-if="filter.items" :key="index" class="nav-item dropdown p-1 align-self-center">
          <a href="#" data-toggle="dropdown" class="btn bg-light d-flex h-100">
            <span class="align-self-center mr-1">{{ filter.label }}:</span> 
            <span class="align-self-center mr-1">{{ filter.value }}</span>
            <span class="align-self-center fa fa-remove p-1" @click.prevent="removeFilter(index)"></span>
          </a>
          <div class="dropdown-menu" :class="{show: filter.show}">
            <a 
              href="#"
              class="dropdown-item" 
              v-for="(item, id) in filter.items"
              @click.prevent="setFilterValue(index, filter, item)"
              :key="id"
            >{{ item }}</a>
          </div>
        </li>
        <li v-else class="nav-item" :key="index">
          <a href="#" class="btn bg-light"><span class="badge badge-light">{{ filter.label }}</span> {{ filter.value }}</a>
        </li>
      </template>
      
      <li class="nav-item dropdown flex-grow-1 p-1">
        <div ref="filterInput" class="input-group" data-toggle="dropdown">
          <input type="text" class="form-control border-0" @keyup.enter="submitFilter">
        </div>
        <div class="dropdown-menu">
          <a 
            href="#"
            class="dropdown-item" 
            @click.prevent="submitFilter"
          ><i class="fa fa-search"/> 输入回车或点击搜索</a>
          <div class="dropdown-divider"></div>
          <template v-for="(filter, id) in items">
            <a
              :key="id"
              href="#"
              class="dropdown-item" 
              v-if="filters"
              @click.prevent="addFilter(filter)"
            ><i v-if="filter.fa" class="fa" :class="filter.fa"/> {{ filter.label }}</a>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'loadsh';
import axios from 'axios';
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';

function fetchData(vm, filter) {
  filter.fetchs.params[filter.fetchs.paths.query] = filter.query || '';
  axios(filter.fetchs).then(function (response) {
    var path = filter.fetchs.paths.data;
    var datas = _.get(response.data, path, []);
    filter.datas = datas;
  })
}

export default {
  name: "DataFilter",
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      },
    }
  },
  data() {
    return {
      filters: [],
      value: ''
   };
  },
  
  created() {

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
    fetchData(filter) {
      return this.fetch(this, filter);
    },

    addFilter(filter) {
      var item = Object.assign({}, filter, {
        show: true
      });
      this.fetchFilter(item);
      this.filters.push(item);
    },
    setFilterValue(index, filter, value, text = '') {
      this.$set(filter, 'show', false);
      this.$set(filter, 'value', value);
      this.$set(filter, 'text', text);
    },
    removeFilter(index) {
      this.filters.splice(index, 1);
    },
    fetchFilter(filter) {
      if (!filter.fetchs) {
        return;
      }
      if (filter.query != undefined && filter.query == filter.fetchs.params[filter.fetchs.paths.query]) {
        return;
      }
      return this.fetchData(filter);
    },
    submitFilter() {
      this.jq(this.$refs.filterInput).click();
      this.buildFilter();
    },
    buildFilter() {
      var filters = {};
      for (var i = 0; i < this.filters.length; i++) {
        var item = this.filters[i];
        if (typeof item.value == 'object') {
          filters[item.name] = item.value.id;
        } else {
          filters[item.name] = item.value;
        }
        
      }
      this.$emit('update:querys', filters)
    }
  },
  components: {
    Datetime,
  }
};
</script>

<style scoped>

</style>
