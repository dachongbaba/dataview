<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <p>{{ descs }}</p>
    <form>
      <div class="form-group">
        <label for="view">View</label>
        <select v-model="view" class="form-control" id="view">
          <option v-for="option in views" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <small id="viewHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1">Fetch</label>
        <textarea v-model="fetch" class="form-control" id="fetch" rows="5"></textarea>
        <small id="viewHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      
      <div class="form-group">
        <label for="exampleInputPassword1">Columns</label>
        <textarea v-model="columns" class="form-control" id="columns" rows="5"></textarea>
        <small id="viewHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      
      <button type="submit" class="btn btn-primary">Build</button>
    </form>
    <router-link to="/tables?vm=test">data table</router-link>
  </div>
</template>

<script>
export default {
  name: "DataView",
  props: [
    'title',
    'descs',
    'view'
  ],

  data() {
    return {
      views: ['tables'],
      fetch: '',
      columns: '',
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
