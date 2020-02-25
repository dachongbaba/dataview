<template>
  <div class="border">
    <div class="d-flex justify-content-start flex-nowrap">
      <ul class="nav d-flex flex-wrap align-self-center" style="width:100%;">
        <li v-for="(filter, index) in datas" :key="index" class="nav-item dropdown">
          <div class="d-flex align-self-center flex-nowrap m-1"  data-toggle="dropdown">
            <span class="align-self-center bg-light pl-2 pr-2">{{ filter.label }}</span>
            <span class="align-self-center badge badge-secondary">{{ filter.value }}</span>
          </div>
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
        <li class="nav-item dropdown">
          <input type="text" class="form-control border-0" data-toggle="dropdown" style="width:50px;">
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
        <!--
        <div v-for="(filter, index) in datas" :key="index" class="input-group" style="width:auto;">
          <div class="d-flex align-self-center flex-nowrap m-1"  data-toggle="dropdown">
            <span class="align-self-center bg-light pl-2 pr-2">{{ filter.label }}</span>
            <span class="align-self-center badge badge-secondary">{{ filter.value }}</span>
          </div>
          <div class="dropdown-menu" :class="{show: filter.show}" style="z-index:1000;">
            <a class="dropdown-item" href="#"
              v-for="item in filter.items"
              v-on:click.self.prevent="setFilterValue(index, filter, item)"
              :key="item"
            >
              {{ item }}
            </a>
          </div>
        </div>
        -->
        <!--
        <div class="input-group align-self-center">
          <input data-toggle="dropdown" style="width:50px;">
          <div class="dropdown-menu" style="z-index:1000;">
            <a class="dropdown-item" href="#"
              v-for="filter in filters" 
              v-on:click.self.prevent="addFilter(filter)"
              :key="filter.label"
            >
              {{ filter.label }}
            </a>
          </div>
        </div>
        -->
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
