<template>
  <div>
    <div class="bottom">
      <ul>
        <router-link to="/vote/voteList" tag="li">全部参赛 <span></span></router-link>
        <router-link to="/vote/voterank" tag="li">当前排名 <span></span></router-link>
        <router-link to="/vote/voterules" tag="li">活动规则</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped>
.bottom{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  height: 1.1rem;
  background: #fff;
  font-size: 0.28rem;
}
  .bottom ul{
    width: 100%;
    height: 100%;
  }
  .bottom li{
    width: 33.3%;
    float: left;
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: center;
    position: relative;
  }
.bottom ul li span{
  position: absolute;
  width: 1px;
  height: 0.49rem;
  background: #a3acbe;
  right: 0;
  top: 0.32rem;
}
  .active{
    border-bottom: 0.08rem solid #df3f50;
    color: #df3f50;
    height: 1.02rem !important;
  }
</style>
