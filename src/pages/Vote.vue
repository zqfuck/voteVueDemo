<template>
  <div>
    <header-top></header-top>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Nav></Nav>
  </div>
</template>

<script>
import HeaderTop from '@/components/HeaderTop'
import Nav from '@/components/Nav'
export default {
  name: 'Vote',
  data () {
    return {
    }
  },
  components: {
    HeaderTop,
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
