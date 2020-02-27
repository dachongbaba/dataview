<template>
  <div class="jumbotron">
    <router-link class="m-5" to="/views?_title=Tables&_view=table">Table View</router-link>
    <router-link class="m-5" to="/views?_title=Tables&_view=card">Card View</router-link>
    <router-link class="m-5" to="/views?_title=Tables&_view=list">List View</router-link>
  </div>
</template>

<script>

export default {
  name: "Home",
};
</script>
