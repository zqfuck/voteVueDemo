import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Vote from '@/pages/Vote'
import VoteList from '@/pages/VoteList'
import Detail from '@/pages/Detail'
import VoteRank from '@/pages/VoteRank'
import VoteRules from '@/pages/VoteRules'
import Score from '@/pages/Score'
import ScoreList from '@/pages/ScoreList'
import ScoreRank from '@/pages/ScoreRank'
import ScoreDetail from '@/pages/ScoreDetail'
import ScoreRules from '@/pages/ScoreRules'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  scrollBehavior (to, from, savePosition) { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
    console.log(to) // to：要进入的目标路由对象，到哪里去
    console.log(from) // from：离开的路由对象，哪里来
    console.log(savePosition) // savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
    if (savePosition) {
      return savePosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/vote',
      component: Vote,
      children: [
        {
          path: 'voteList',
          name: 'VoteList',
          component: VoteList
        },
        {
          path: 'voterank',
          name: 'VoteRank',
          component: VoteRank
        },
        {
          path: 'voterules',
          name: 'VoteRules',
          component: VoteRules
        }
      ]
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/scoredetail/:id',
      name: 'ScoreDetail',
      component: ScoreDetail
    },
    {
      path: '/score',
      component: Score,
      children: [
        {
          path: '/',
          name: 'ScoreList',
          component: ScoreList
        },
        {
          path: '/scorerank',
          name: 'ScoreRank',
          component: ScoreRank
        },
        {
          path: '/scorerules',
          name: 'ScoreRules',
          component: ScoreRules
        }
      ]
    }
  ]
})
