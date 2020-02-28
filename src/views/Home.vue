<template>
  <div class="jumbotron">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/views?_view=table">Table View</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/views?_view=card">Card View</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/views?_view=list">List View</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "Home",
};
</script>
