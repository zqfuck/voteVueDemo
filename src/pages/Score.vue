<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Nav></Nav>
  </div>
</template>

<script>
import Nav from '@/components/Nav2'
export default {
  name: 'Vote',
  data () {
    return {
    }
  },
  components: {
    Nav
  },
  computed: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
