<template>
  <div class="border">
    <div class="d-flex justify-content-start">
      <div v-for="(filter, index) in datas" :key="index" class="input-group" style="width:auto;">
        <div class="d-flex align-self-center flex-nowrap m-1"  data-toggle="dropdown">
          <span class="align-self-center bg-light pl-2 pr-2">{{ filter.label }}</span>
          <span class="align-self-center badge badge-secondary">{{ filter.value }}</span>
        </div>
        <div class="dropdown-menu" :class="{show: filter.show}">
          <a class="dropdown-item" href="#"
            v-for="item in filter.items"
            v-on:click="setFilterValue(index, filter, item)"
            :key="item"
          >
            {{ item }}
          </a>
        </div>
      </div>
      <div class="input-group align-self-center">
        <input type="text" class="form-control border-0" placeholder="Username" data-toggle="dropdown">
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#"
            v-for="filter in filters" 
            v-on:click="addFilter(filter)"
            :key="filter.label"
          >
            {{ filter.label }}
          </a>
        </div>
      </div>
    </div>
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
          value: '',
          show: false,
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
