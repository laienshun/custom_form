// 过滤器
import Vue from 'vue'
import config from '@/services/config'
import utils from '@/services/utils'

// 字符串转换为大写
Vue.filter('upper', function (value) {
  if (!value) {
    return ''
  }
  return value.toLocaleUpperCase()
})

// 字符串转换为小写
Vue.filter('lower', function (value) {
  if (!value) {
    return ''
  }
  return value.toLowerCase()
})

// 日期格式化
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Vue.filter('format', function (value, fmt) {
  let date = new Date(value)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
})

// 价格转换，保留两位小数
Vue.filter('price', function (value) {
  if (!value) {
    return '0.00'
  }
  value = parseInt(parseFloat(value) * 100) / 100
  var arr = value.toString().split('.')
  if (arr.length === 1) {
    return value + '.00'
  } else {
    if (arr[1].length < 2) {
      return value + '0'
    } else {
      return value
    }
  }
})

/* 缩略图,size为数字的时候代表宽高，size为100x200则代表宽高 */
Vue.filter('thumb', function (value, size) {
  if (!size) {
    size = 200
  }
  if (size.indexOf('x') > 0) { // 非正方形
    let arr = size.split('x')
    return value + '?x-oss-process=image/resize,m_fill,h_' + arr[1] + ',w_' + arr[0]
  } else { // 正方形
    size = parseInt(size)
    return value + '?x-oss-process=image/resize,m_fill,h_' + size + ',w_' + size
  }
})

/* 生成临时占位图 ,size为数字的时候代表宽高，size为100x200则代表宽高*/
Vue.filter('placeholder', function (value, size) {
  if (!size) {
    size = 200
  }

  return utils.imgPlaceholder(size)
})

/* html转文字 */
Vue.filter('htmlToText', function (value) {
  if (!value) {
    return ''
  }
  let text = value.replace(/<[^>]+>/g, '')

  return text
})
