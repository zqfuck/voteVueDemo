<template>
  <div class="wraper">
    <div class="bannerBox">
      <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in swiperImg" :key="index"><img class="swiper_img" :src="item"></swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <div class="countBox kindBox">
      <div class="voteBox">
        <router-link to="/vote">
          <p class="voleLeft">
            <img src="@/assets/touIcon.png" alt="">
          </p>
          <p class="voleLeft" style="margin-right: 24%">投票</p>
        </router-link>
      </div>
      <div class="scoreBox">
        <router-link to="/score">
          <p class="voleRight">
            <img src="@/assets/pingIcon.png" alt="">
          </p>
          <p class="voleRight" style="margin-left: 24%">评分</p>
        </router-link>
      </div>
    </div>
    <div class="ruleBox">
      <rules></rules>
    </div>
  </div>
</template>

<script>
import Rules from '@/components/Rules'
import api from '@/js/api'
export default {
  name: 'Home',
  data () {
    return {
      voteid: '',
      swiperImg: [],
      swiperOption: {
        autoplay: true,
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        cancelable: false
      }
    }
  },
  components: {
    Rules
  },
  computed: {
  },
  methods: {
    detail () {
      let that = this
      that.voteid = this.$store.state.voteid
      let data = {
        voteid: that.voteid
      }
      api.getDetail(data)
        .then(res => {
          if (res.state.rc >= 0) {
            that.swiperImg.push(res.data.img)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.detail()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wraper{
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
  }
.bannerBox{
  width: 100%;
  height: 0;
  padding-bottom: 34.5%;
  overflow: hidden;
}
  .kindBox{
    width: 95%;
    height: 2.1rem;
    background: #fff;
    margin-left: 2.5%;
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    border-radius: 6px;
  }
  .ruleBox{
    width: 95%;
    margin-left: 2.5%;
    background: #fff;
    flex: 1;
    border-radius: 6px;
  }
  .voteBox,.scoreBox{
    width: 50%;
    height: 100%;
    float: left;
    padding-top: 0.3rem;
  }
  .voleLeft{
    text-align: right;
    margin-right: 20%;
    margin-bottom: 0.2rem;
  }
  .voleLeft img,.voleRight img{
    width: 0.85rem;
  }
  .voleRight{
    text-align: left;
    margin-left: 20%;
    margin-bottom: 0.2rem;
  }
  .swiper_img{
    width: 100%;
  }
  .bannerBox >>> .swiper-pagination-bullet-active{
    background: #fff!important;
  }
  a{
    color: #333;
  }
</style>
