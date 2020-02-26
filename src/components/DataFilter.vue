<template>
  <div class="border rounded-left rounded-right">
    <ul class="nav mt-0 mb-0 align-self-center" style="width:100%;">
      <template v-for="(filter, index) in datas">
        <li v-if="filter.datetime" :key="index" class="nav-item p-1">
          <a class="btn bg-light d-flex">
            <span class="badge badge-light align-self-center mr-1">{{ filter.label }}</span>
            <datetime v-model="filter.value" 
              class="align-self-center" 
              input-class="border-0"
              :input-style="{'background-color':'transparent', width:filter.datetime.width||'100px'}"></datetime>
          </a>
        </li> 
        <li v-else-if="filter.items" :key="index" class="nav-item dropdown p-1">
          <a href="#" data-toggle="dropdown" class="btn bg-light"><span class="badge badge-light">{{ filter.label }}</span> {{ filter.value }}</a>
          <div class="dropdown-menu" :class="{show: filter.show}">
            <a class="dropdown-item" href="#"
              v-for="item in filter.items"
              v-on:click.self.prevent="setFilterValue(index, filter, item)"
              :key="item"
            >
              {{ item }}
            </a>
          </div>
        </li>
        <li v-else class="nav-item" :key="index">
          <a href="#" class="btn bg-light"><span class="badge badge-light">{{ filter.label }}</span> {{ filter.value }}</a>
        </li>
      </template>
      
      <li class="nav-item dropdown p-1">
        <div class="input-group" data-toggle="dropdown">
          <input type="text" class="form-control border-0" >
        </div>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#"
            v-for="filter in filters" 
            v-on:click.self.prevent="addFilter(filter)"
            :key="filter.label"
          >
            {{ filter.label }}
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';

export default {
  name: "DataFilter",
  props: {
    
  },
  data() {
    return {
      filters: [
        {
          label: 'lable1',
          name: 'filter1',
          items: ['aaaaa', 'bbbbb']
        },
        {
          label: 'lable2',
          name: 'filter2',
          items: ['aaaaa', 'bbbbb']
        },
        {
          label: 'lable3',
          name: 'filter3',
          items: ['aaaaa', 'bbbbb']
        },
        {
          label: 'lable4',
          name: 'filter4',
          datetime: {}
        },
      ],
      datas: [

      ]
   };
  },
  computed: {
    jq() {
      return window.jQuery;
    }
  },
  created() {
  },
  
  methods: {
    addFilter(filter) {
      var item = Object.assign({}, filter, {
        show: true
      });
      this.datas.push(item);
    },
    setFilterValue(index, filter, value) {
      this.$set(filter, 'value', value);
      this.$set(filter, 'show', false);
    },
    removeFilter(index) {
      this.datas.splice(index, 1);
    },
  },
  components: {
    Datetime,
  }
};
</script>

<style scoped>

</style>
