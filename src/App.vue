<template>
  <div id="app">
    <div class="container">
      <h1 class="title">Список пользователей</h1>
      <Search/>
      <Table/>
    </div>
  </div>
</template>

<script>
import Search from "@/components/search/Search"
import Table from "@/components/table/Table"

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    Search,
    Table
  }
}
</script>

<style lang="sass">
#app
  padding: 1.25rem 0 0

.title
  font:
    size: 1.75rem
    weight: 700
    
</style>