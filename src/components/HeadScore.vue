<template>
  <div>
    <router-link to="/">
      <div class="bannerBox">
        <img :src="dataImg" alt="">
      </div>
    </router-link>
    <div class="countBox">
      <div class="countKind">
        <p>参赛数</p>
        <p class="colorRed" id="joinPeople">{{option_num}}</p>
        <span></span>
      </div>
      <div class="countKind">
        <p>专家数</p>
        <p class="colorRed" id="guestPeople">{{expert_num}}</p>
      </div>
    </div>
    <div class="timeEnd">
      <p>活动于{{starttime}}-{{endtime}}结束</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/js/api'
export default {
  name: 'HeaderTop',
  data () {
    return {
      dataImg: '',
      option_num: '',
      expert_num: '',
      total_votes: '',
      startTime: '',
      endTime: ''
    }
  },
  computed: {
    ...mapState(['voteid']),
    starttime () {
      return this.timeChangeDay(this.startTime)
    },
    endtime () {
      return this.timeChangeDay(this.startTime)
    }
  },
  methods: {
    detail () {
      let that = this
      let data = {
        voteid: that.voteid
      }
      api.getDetail(data).then(res => {
        console.log(res)
        if (res.state.rc >= 0) {
          that.dataImg = res.data.img
          that.option_num = res.data.option_num
          that.expert_num = res.data.guest_num
          that.startTime = res.data.starttime
          that.endTime = res.data.endtime
        }
      }).catch(err => {
        console.log(err)
      })
    },
    timeChangeDay (longTime) {
      var day = new Date(longTime) /* 将毫秒转化为当前日期 */
      var year = day.getFullYear()
      var month = day.getMonth() + 1
      var date = day.getDate()
      var hour = day.getHours()
      var minutes = day.getMinutes()
      if (month < 10) {
        month = '0' + month
      }
      if (date < 10) {
        date = '0' + date
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      var newDay = year + '年 ' + month + '月 ' + date + '日' + hour + '时'
      return newDay
    }
  },
  mounted () {
    this.detail()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bannerBox{
  width: 100%;
  height: 0;
  padding-bottom: 34.5%;
  overflow: hidden;
}
.countBox{
  width: 100%;
  height: 1.42rem;
  background: #fff;
}
.countBox .countKind{
  width: 50%;
  height: 100%;
  padding-top: 0.2rem;
  float: left;
  position: relative;
}
.countKind p{
  text-align: center;
  margin-bottom: 0.2rem;
}
.countKind .colorRed{
  font-size: 0.34rem;
  color: #df3f50;
}
  .countKind span{
    position: absolute;
    width: 1px;
    height: 0.58rem;
    background: #a3acbe;
    right: 0;
    top: 0.43rem;
  }
  .timeEnd{
    width: 100%;
    height: 0.7rem;
    text-align: center;
    font-size: 0.22rem;
    color: #A3ACBE;
  }
</style>
