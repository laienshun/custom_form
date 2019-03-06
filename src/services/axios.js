/* 请求 */
import Vue from 'vue'
import store from 'storejs'
import cookie from 'vue-cookie'
import utils from './utils'
import axios from 'axios'
import iView from 'iview'

Vue.use(iView)

// 设置默认的axios配置参数
let instanceAxios = axios.create({
  timeout: 20000,
  headers: {
    get: {
      'Content-Type': 'application/json;charset:utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset:utf-8'
    },
    put: {
      'Content-Type': 'application/json;charset:utf-8'
    },
    delete: {
      'Content-Type': 'application/json;charset:utf-8'
    }
  }
})

// 默认的头部信息
let defaultHeaders = {
  SessionID: ''
}

/* ajax请求
* options: {}
* @params(method)
* @params(url)
* @params(data)
* @params(loading)
* @params(headers)
* @params(config): 其它axios配置
*/
const http = (options) => {
  options = options || {}
  // 默认开启loading
  if (options.loading === 'undefined') options.loading = true
  // 拓展默认头
  if (options.headers) Object.assign(defaultHeaders, options.headers)
  // 执行loading
  if (options.loading) iView.LoadingBar.start()

  // 开始请求
  const requestConfig = {
    method: options.method,
    url: options.url,
    headers: defaultHeaders,
    responseType: 'json'
  }
  if (!requestConfig.sessionID) {
    requestConfig.sessionID = cookie.get('sessionID')
  }

  // 根据请求不同，处理不同的数据
  if (options.method.toLowerCase() === 'get' || options.method.toLowerCase() === 'delete') {
    requestConfig.params = options.data
  } else {
    requestConfig.data = JSON.stringify(options.data)
  }

  // 拓展其它axios配置
  if (options.config) {
    Object.assign(requestConfig, options.config)
  }

  // 创建promise
  const promise = new Promise(function (resolve, reject) {
    instanceAxios.request(requestConfig).then((res) => {
      // 服务器没响应
      if (!res.data) {
        return
      }
      // 拦截器
      switch (res.data.scode) {
        case '200':
          resolve(res.data)
          break
        case '802': // 登录过期
          Vue.prototype.$Message.error(res.data.remark)
          logoutCallback()
          break
        case '800': // 其它地方登录,
          Vue.prototype.$Message.error(res.data.remark)
          logoutCallback()
          break
        case '500': // 服务器错误,
          Vue.prototype.$Message.error(res.data.remark)
          reject(res.data)
          break
        default:
          if (res.data.remark) {
            Vue.prototype.$Message.error(res.data.remark)
          }
          reject(res.data)
      }
    }, (error) => {
      utils.console(error)
      Vue.prototype.$Message.error('服务器错误')
    }).catch((error) => {
      utils.console(error)
    }).finally(() => {
      iView.LoadingBar.finish()
    })
  })

  return promise
}

// 更新sessionId
const updateSessionID = (SessionID) => {
  defaultHeaders.SessionID = SessionID
}

// 登录失效回调
const logoutCallback = () => {

}

export default {
  http,
  updateSessionID
}
