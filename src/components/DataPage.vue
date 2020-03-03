<template>
  <div v-if="pages && pages.total" class="d-flex">
    <div class="align-self-center">
      page: {{ pages.page + 1 }} / {{ pages.total }},
      count: {{ pages.page * pages.size + 1 }} - {{ pages.page * pages.size + pages.length }} / {{ pages.count }}
    </div>
    <div class="p-1"></div>
    <div class="align-self-center">
      <ul class="pagination m-0">
        <li class="page-item" :class="{'disabled': pages.page <= 0}">
          <a class="page-link" href="#" v-on:click.stop.prevent="pagePrev">
            <i class="fa fa-chevron-left"/>
          </a>
        </li>
        <li class="page-item" :class="{'disabled': pages.page >= pages.total - 1}">
          <a class="page-link" href="#" v-on:click.stop.prevent="pageNext">
            <i class="fa fa-chevron-right"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataPage",
  props: {
    pages: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },

  data() {
    return {
      page: 0,
      size: 20,
    };
  },
  
  methods: {
    fetchData() {
      this.$emit('update:page', this.page);
    },
    pagePrev() {
      if (this.pages.page <= 0) {
        return;
      }
      this.page = this.pages.page - 1;
      this.fetchData();
    },
    pageNext() {
      if (this.pages.page >= this.pages.total - 1) {
        return;
      }
      this.page = this.pages.page + 1;
      this.fetchData()
    },
  }
};
</script>

<style scoped>

</style>
