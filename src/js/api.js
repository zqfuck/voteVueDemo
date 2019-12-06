/**
 * Created by zq on 2018/9/5.
 */
import axios from 'axios'
// axios 配置
axios.defaults.timeout = 3000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://livetapi.v114.com'

export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function fetchGet (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default {
  /**
   * 获取详情信息
   */
  getDetail (params) {
    return fetchGet('/appapi/vote/getdetail', params)
  },

  /**
   * 获取规则
   */
  getRules (params) {
    return fetchGet('/appapi/vote/getrules', params)
  },

  /**
   * 获取投票人员列表
   */
  getVoteList (params) {
    return fetchGet('/appapi/vote/getoption', params)
  },
  /**
   * 投票
   */
  getVote (params) {
    return fetchPost('/appapi/vote/vote', params)
  },
  /**
   * 投票详情
   */
  voteDetail (params) {
    return fetchGet('/appapi/vote/optiondetail', params)
  },
  /**
   * 排名列表
   */
  voteRank (params) {
    return fetchGet('/appapi/vote/votesort', params)
  },
  /**
   * 搜索投票
   */
  voteSearch (params) {
    return fetchGet('/appapi/vote/optionsearch', params)
  }
}
