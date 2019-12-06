<template>
  <div>
    <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" :top-pull-text="topPullText" :top-drop-text="topDropText" :top-loading-text="topLoadingText">
        <div class="rankingBox">
          <div class="titleBox">
            <span>排名</span>
            <span>姓名</span>
            <span>票数</span>
          </div>
          <div class="listItem" v-for="(item,index) of rankList" @click="showGuest(item.guest_grade,index)" :key="index">
            <p class="detailItem">
              <span class="pos"><span v-html="index+1"></span>  <span class="borderR"></span></span>
              <span class="pos"><span v-text="item.name"></span> <span class="borderR"></span></span>
              <span class="allNum" v-text="item.votes"></span>
            </p>
            <p class="showMore" v-if="item.guest_grade!=0 && showMore[index]">
              <span class="half">投票数: <span v-text="item.guest_grade"></span></span>
              <span class="half">评委分析票: <span v-html="item.guest_votes"></span></span>
            </p>
          </div>
        </div>
      </v-loadmore>
    </div>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui'
import { mapState } from 'vuex'
import api from '@/js/api'
export default {
  name: 'VoteRank',
  components: {
    'v-loadmore': Loadmore
  },
  data () {
    return {
      rankList: [],
      showMore: [],
      page: 1,
      pagesize: 8,
      allLoaded: false, /* 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了 */
      scrollMode: 'auto', /* 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动 */
      totalPage: '',
      topPullText: '下拉啊',
      topDropText: '下拉就刷啊',
      topLoadingText: '刷新加载啊'
    }
  },
  computed: {
    ...mapState(['voteid'])
  },
  methods: {
    loadTop: function () { /* 组件提供的下拉触发方法 */
      this.page = 1
      this.reRankList()
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded() /* 固定方法，查询完要调用一次，用于重新定位 */
      }, 1000)
      this.allLoaded = false
    },
    loadBottom: function () {
      this.more() /* 上拉触发的分页查询 */
      setTimeout(() => {
        this.$refs.loadmore.onBottomLoaded() /* 固定方法，查询完要调用一次，用于重新定位 */
      }, 1000)
    },
    reRankList () {
      let that = this
      let data = {
        page: that.page,
        pagesize: that.pagesize,
        type: 1,
        voteid: that.voteid
      }
      api.voteRank(data).then(res => {
        that.rankList = res.data
        res.data.forEach(function () {
          that.showMore.push(false)
        })
        that.totalPage = res.totalpage
        this.$nextTick(function () {
          this.scrollMode = 'touch'
        })
        console.log(that.rankList)
      }).catch(err => {
        console.log(err)
      })
    },
    loadRankList () {
      let that = this
      let data = {
        page: that.page,
        pagesize: that.pagesize,
        voteid: that.voteid
      }
      api.getVoteList(data).then(res => {
        console.log(res)
        res.data.forEach(function (item, index) {
          that.rankList.push(item)
        })
        that.totalPage = res.totalpage
        this.$nextTick(function () {
          this.scrollMode = 'touch'
        })
        console.log(that.rankList)
      }).catch(err => {
        console.log(err)
      })
    },
    more: function () {
      this.page = this.page + 1
      if (this.page <= this.totalPage) {
        this.loadRankList()
      } else {
        this.allLoaded = true
      }
    },
    showGuest (grade, index) {
      let that = this
      if (that.showMore[index] === false) {
        that.showMore.splice(index, 1, true)
      } else {
        that.showMore.splice(index, 1, false)
      }
    }
  },
  mounted () {
    this.reRankList()
  }
}
</script>

<style>
.main-body{
  width:100%;
  height: 60vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.rankingBox {
  width: 94%;
  margin-left: 3%;
  height: auto;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  min-height: 4rem;
  padding-bottom: 1rem;
}
.titleBox {
  width: 96%;
  margin: 0 auto;
  height: 0.9rem;
  line-height: 0.9rem;
  display: flex;
  border-bottom: 1px solid #e7e9ef;
}
.titleBox span {
  flex: 1;
  text-align: center;
}
.listItem {
  width: 100%;
}
.listItem .detailItem {
  display: flex;
  border-bottom: 1px solid #e7e9ef;
}
.listItem p {
  width: 96%;
  height: 0.9rem;
  margin: 0 auto;
  line-height: 0.9rem;
}
.listItem .detailItem span {
  flex: 1;
  text-align: center;
}
.detailItem .pos {
  position: relative;
}
.detailItem .borderR {
  position: absolute;
  background: #e7e9ef;
  width: 1px;
  height: 0.5rem;
  right: 0;
  top: 0.2rem;
}
.allNum {
  color: #df3f50;
}
.listItem .showMore {
  width: 100%;
  background: #fafafa;
  font-size: 0.24rem;
}
.showMore .half {
  display: inline-block;
  width: 50%;
  float: left;
}
.listItem .showMore span {
  text-align: center;
}
</style>
