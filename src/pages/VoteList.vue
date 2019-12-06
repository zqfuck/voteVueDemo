<template>
  <div>
    <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" :top-pull-text="topPullText" :top-drop-text="topDropText" :top-loading-text="topLoadingText">
        <div class="listBox">
          <div class="searchBox">
            <input type="text" placeholder="请输入编号或名称" v-model="val">
            <span @click.stop="search()"><img src="@/assets/search.png" alt=""></span>
          </div>
          <div class="listCount" v-for="(item,index) in voteList" :key="index">
            <router-link :to="{name:'Detail', params:{id: item.optionid}}">
              <div class="imgBox">
                <img :src= "item.thumb" alt="">
                <span class="number">{{item.serial_number}}</span>
              </div>
              <div class="infoBox">
                <p><span>{{item.name}}</span> <span class="numTou">{{item.votes}}</span><span class="numTou">票</span></p>
              </div>
            </router-link>
              <p style="text-align: center;"><button class="btn" @click.stop="vote(item.optionid,item.voteid,index)">投票</button></p>

          </div>
        </div>
      </v-loadmore>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Loadmore, Toast } from 'mint-ui'
import api from '@/js/api'
export default {
  name: 'VoteList',
  components: {
    'v-loadmore': Loadmore
  },
  data () {
    return {
      val: '',
      voteList: [],
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
    search () {
      let searchVal = this.val.replace(/\s+/g, '')
      let data = {
        name: searchVal,
        voteid: this.voteid
      }
      api.voteSearch(data).then(res => {
        if (res.data.length > 0) {
          this.voteList = res.data
        } else {
          Toast({
            message: '暂无搜索结果',
            duration: 2000
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    vote (optionid, voteid) {
      let data = {
        id: optionid,
        voteid: voteid
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
    },
    loadTop: function () { /* 组件提供的下拉触发方法 */
      this.page = 1
      this.rePageList()
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
    rePageList () {
      let that = this
      let data = {
        page: that.page,
        pagesize: that.pagesize,
        voteid: that.voteid
      }
      api.getVoteList(data).then(res => {
        that.voteList = res.data
        that.totalPage = res.totalpage
        this.$nextTick(function () {
          this.scrollMode = 'touch'
        })
        console.log(that.voteList)
      }).catch(err => {
        console.log(err)
      })
    },
    loadPageList () {
      let that = this
      let data = {
        page: that.page,
        pagesize: that.pagesize,
        voteid: that.voteid
      }
      api.getVoteList(data).then(res => {
        console.log(res)
        res.data.forEach(function (item, index) {
          that.voteList.push(item)
        })
        that.totalPage = res.totalpage
        this.$nextTick(function () {
          this.scrollMode = 'touch'
        })
        console.log(that.voteList)
      }).catch(err => {
        console.log(err)
      })
    },
    more: function () {
      this.page = this.page + 1
      if (this.page <= this.totalPage) {
        this.loadPageList()
      } else {
        this.allLoaded = true
      }
    }
  },
  mounted () {
    this.rePageList()
  }
}
</script>

<style scoped>
  .main-body{
    width:100%;
   height: 60vh;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
.listBox{
  width: 96%;
  height: auto;
  overflow: hidden;
  margin-left: 2%;
  border-radius: 8px;
  background: #fff;
  padding-top: 0.3rem;
  padding-bottom: 1rem;
}
.searchBox {
  width: 80%;
  padding: 0 0.22rem;
  margin-bottom: 0.25rem;
  background: #fff;
  position: relative;
}
.searchBox input {
  width: 100%;
  height: 0.64rem;
  border: 1px solid #e7e9ef;
  border-radius: 0.3rem;
  font-size: 0.24rem;
  padding-left: 0.75rem;
  color: #c2cce1;
  outline: none;
}
.searchBox span {
  display: inline-block;
  position: absolute;
  top: 19%;
  left: 7%;
  width: 0.4rem;
  height: 0.4rem;
  line-height: 0.5rem;
  text-align: center;
}
.listBox .listCount {
  border: 1px solid #e7e9ef;
  border-radius: 8px;
  width: 42%;
  margin: 0 0.1rem 0.15rem 0.1rem;
  padding: 0 0.12rem;
  float: left;
}
.imgBox {
  width: 100%;
  height: 3.1rem;
  margin-bottom: 0.38rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #e7e9ef;
  position: relative;
}
.imgBox img {
  width: 100%;
  height: 100%;
}
.imgBox .number {
  position: absolute;
  left: 0.17rem;
  top: 0.14rem;
}
.infoBox {
  width: 100%;
  text-align: center;
  font-size: 0.24rem;
}
.numTou {
  color: #df3f50;
  margin-left: 0.1rem;
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
  text-align: center;
}
  a{
    color: inherit!important;
  }
</style>
