<template>
  <div>
    <div class="detailBox">
      <p class="nameTitle"><span class="rank" v-html="votesort"></span>名 <span v-html="name"></span></p>
      <div class="contentBox" v-html="descriton">
      </div>
      <div class="voteBox">
        <p><button class="btn" @click="vote()">投票</button></p>
        <p style="color: #df3f50"><span v-html="votes"></span> 票</p>
      </div>

    </div>
  </div>
</template>

<script>
import api from '@/js/api'
import { Toast } from 'mint-ui'
export default {
  name: 'Detail',
  data () {
    return {
      votesort: '',
      name: '',
      descriton: '',
      votes: '',
      voteid: ''
    }
  },
  methods: {
    getDetail () {
      let optionid = this.$route.params.id
      let data = {
        id: optionid
      }
      api.voteDetail(data).then(res => {
        console.log(res)
        if (res.state.rc >= 0) {
          this.votesort = res.data.votesort
          this.name = res.data.name
          this.descriton = res.data.content_desc
          this.votes = res.data.votes
          this.voteid = res.data.voteid
        }
      }).catch(err => {
        console.log(err)
      })
    },
    vote () {
      let data = {
        id: this.$route.params.id,
        voteid: this.voteid
      }
      let params = JSON.stringify(data)
      api.getVote(params).then(res => {
        if (res.state.rc >= 0) {
          Toast({
            message: '投票成功',
            duration: 2000
          })
        } else {
          Toast({
            message: '您已经投过票了',
            duration: 2000
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>

<style scoped>
.detailBox {
  width: 83%;
  height: auto;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  padding: 0 0.53rem;
}
.nameTitle {
  margin: 0.3rem 0;
}
.rank {
  color: #df3f50;
}
.contentBox {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #e7e9ef;
}
.voteBox {
  width: 100%;
  text-align: center;
  padding-bottom: 0.36rem;
}
.btn {
  width: 1.9rem;
  height: 0.62rem;
  border-radius: 4px;
  background: #df3f50;
  color: #fff;
  border: none;
  outline: none;
  margin-bottom: 0.44rem;
  margin-top: 0.38rem;
}
</style>
