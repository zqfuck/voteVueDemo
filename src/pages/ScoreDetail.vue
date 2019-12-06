<template>
  <div>
    <div class="detailBox">
      <p class="nameTitle"><span class="rank" v-html="votesort"></span>名 <span v-html="name"></span></p>
      <div class="contentBox" v-html="descriton">
      </div>
      <div class="voteBox">
        <p class="teacherTit">专家评分</p>
        <p class="scoretip">请输入分数:</p>
        <p><input type="text" maxlength="3" minlength="1" v-model="valScore" onkeyup="this.value=this.value.replace(/\D/g,'')" class="scoreInp"></p>
        <p><button class="btn" @click="vote()">确认打分</button></p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/js/api'
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'Detail',
  data () {
    return {
      valScore: '',
      votesort: '',
      name: '',
      descriton: '',
      votes: ''
    }
  },
  computed: {
    ...mapState(['voteid'])
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
        }
      }).catch(err => {
        console.log(err)
      })
    },
    vote () {
      if (this.valScore <= 0 || this.valScore > 100) {
        Toast({
          message: '请输入正确分数',
          duration: 2000
        })
        return
      }
      let data = {
        id: this.$route.params.id,
        voteid: this.voteid,
        guestid: 7,
        grade: this.valScore
      }
      let params = JSON.stringify(data)
      api.getVote(params).then(res => {
        if (res.state.rc >= 0) {
          Toast({
            message: '打分成功',
            duration: 2000
          })
        } else {
          Toast({
            message: '您已经打过分了',
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
  background: #fff;
  margin-top: 0.2rem;
  padding: 0 0.1rem;
  padding-bottom: 0.3rem;
  border-radius: 6px;
  text-align: center;
}
.teacherTit {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: left;
  padding-left: 0.3rem;
  border-bottom: 1px solid #e7e9ef;
}
.scoretip {
  width: 100%;
  font-size: 0.24rem;
  color: #a3acbe;
  text-align: left;
  padding-left: 26%;
  margin: 0.58rem 0 0.38rem 0;
}
.scoreInp {
  width: 2.8rem;
  height: 1rem;
  border: 1px solid #a3acbe;
  outline: none;
  text-align: center;
  color: #df3f50;
  font-size: 0.6rem;
  margin-bottom: 0.3rem;
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
