<template>
  <div style="padding-left: 0.35rem">
    <h5>活动说明</h5>
    <div v-html="rulesData">
    </div>
  </div>
</template>

<script>
import api from '@/js/api'
import { mapState } from 'vuex'
export default {
  name: 'Rules',
  data () {
    return {
      rulesData: ''
    }
  },
  computed: {
    ...mapState([ 'voteid' ])
  },
  methods: {
    getRules () {
      let data = {
        voteid: this.voteid
      }
      api.getRules(data)
        .then(res => {
          this.rulesData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getRules()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h5{
  height: 0.86rem;
  line-height: 0.86rem;
  font-weight: normal;
  border-bottom: 1px solid #e7e9ef;
  margin-bottom: 0.2rem;
}
p{
  margin: 0.15rem 0;
}
</style>
