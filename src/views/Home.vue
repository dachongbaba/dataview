<template>
  <div class="jumbotron">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/views?view=table">Table View</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/views?view=card">Card View</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/views?view=list">List View</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "Home",
};
</script>
