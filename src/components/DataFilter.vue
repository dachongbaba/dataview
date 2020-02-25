<template>
  <div class="border rounded-left rounded-right">
    <ul class="nav mt-0 mb-0 align-self-center" style="width:100%;">
      <li v-for="(filter, index) in datas" :key="index" class="nav-item dropdown p-1">
        <a href="#" data-toggle="dropdown" class="align-self-center btn bg-light"><span class="badge badge-light">{{ filter.label }}</span> {{ filter.value }}</a>
        <div class="dropdown-menu" :class="{show: filter.show}" style="z-index:1000;">
          <a class="dropdown-item" href="#"
            v-for="item in filter.items"
            v-on:click.self.prevent="setFilterValue(index, filter, item)"
            :key="item"
          >
            {{ item }}
          </a>
        </div>
      </li>
      <li class="nav-item dropdown p-1">
        <div class="input-group" data-toggle="dropdown">
          <input type="text" class="form-control border-0" >
        </div>
        <div class="dropdown-menu" style="z-index:1000;">
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
          items: ['aaaaa', 'bbbbb']
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
  }
};
</script>

<style scoped>

</style>
