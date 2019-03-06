import Vue from 'vue'
import axios from 'axios'
import cookie from 'vue-cookie'
import config from './config'
//  oss上传配置
let ossParams = ''

const utils = {
  // 快速挂载组件
  serializeUse: (...args) => {
    args.map((v) => { Vue.use(v) })
  },

  /* 工具函数 */
  isArray: args => {
    return Array.isArray(args)
  },
  isPhone: (phone) => {
    if (!phone) {
      return false
    }
    if (/^1[3456789]\d{9}$/.test(phone)) {
      return true
    } else {
      return false
    }
  },
  isObject: (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
  },
  // 拓展对象, 相同属性默认不覆盖，不影响原对象，返回新对象
  expandObject: (target, obj, isReplace) => {
    if (!utils.isObject(target) || utils.isObject(obj)) {
      return {}
    }

    let newObj = utils.copyObj(target)

    for(let key in obj) {
      if (isReplace !== undefined && isReplace) {
        newObj[key] = obj[key]
      } else {
        if (!newObj.hasOwnProperty(key)) {
          newObj[key] = obj[key]
        }
      }
    }

    return newObj
  },
  // 自定义打印console
  console: (...arg) => {
    if (config.showConsole) {
      console.log(...arg)
    }
  },
  // 日期格式化
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  format: (value, fmt) => {
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
  },
  // 克隆复制对象（属性为数组也复制）
  copyObj: (obj) => {
    let data = {}
    let arr = []
    if (!utils.isObject(obj) && !utils.isArray(obj)) {
      return obj
    }
    // 为对象时
    if (utils.isObject(obj)) {
      for (var key in obj) {
        data[key] = utils.copyObj(obj[key])
      }
      return data
    }
    // 为数组时
    if (utils.isArray(obj)) {
      obj.map(item => {
        arr.push(utils.copyObj(item))
      })
      return arr
    }
  },
  /*
  * 过滤对象字段
  * @params(obj): 待过滤对象，必填，object
  * @params(fields): 字段名，多个字段以","隔开，必填， string
  * @params(isReverse): 是否过滤掉fields字段，默认为false，boolean
  */
  objectfields: (obj, fields, isReverse) => {
    let tempObj = {}
    isReverse = isReverse || false
    // 参数验证
    if (!obj || !fields) {
      return
    }
    if (!utils.isObject(obj)) {
      return tempObj
    }
    let fieldsArr = fields.replace(/ /, '').split(',')

    for (let key in obj) {
      for (let i = 0; i < fieldsArr.length; i++) {
        if (!isReverse) {
          if (fieldsArr[i] === key) {
            tempObj[key] = obj[key]
          }
        } else {
          if (fieldsArr[i] !== key && i === fieldsArr.length - 1) {
            tempObj[key] = obj[key]
          }
        }
      }
    }

    return tempObj
  },
  /*
  * 防抖函数：延迟执行需要跑的代码，如果方法多次触发，只执行最后一次方法
  * @params Function fn: 需要执行的函数
  * @params Number delay: 延迟的时间，单位毫秒数
  * @return Function: 待调用的函数
  */
  debounceFn: (fn, delay) => {
    let timer
    if (!fn || typeof fn !== 'function') {
      return
    }
    // 设置默认延迟时间，单位毫秒
    delay = delay || 300

    // 返回一个函数，形成闭包，持久化变量
    return function () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay)
    }
  },
  /*
  * 节流函数：如果空闲，则可以正常触发方法执行，如果代码正在执行，则取消这次方法执行
  * @params Function fn: 需要执行的函数
  * @params Number delay: 延迟的时间，单位毫秒数
  * @return Function: 待调用的函数
  */
  throttleFu: (fn, delay) => {
    let canRun
    if (!fn || typeof fn !== 'function') {
      return
    }
    // 设置默认延迟时间，单位毫秒
    delay = delay || 300

    return function () {
      if (!canRun) {
        // 判断是否已空闲，如果在执行中，则直接return
        return
      }

      canRun = false
      setTimeout(() => {
        fn.apply(this, arguments)
        canRun = true
      }, 300)
    }
  },
  /*
  * 客户端信息检测
  */
  client: () => {
    //呈现引擎
    let engine = {
      ie: 0,
      gecko: 0,
      webkit: 0,
      khtml: 0,
      opera: 0,
      //具体的版本号
      ver: null
    }
    // 浏览器
    let browser = {
      ie: 0,
      firefox: 0,
      safari: 0,
      konq: 0,
      opera: 0,
      chrome: 0,
      weixin: 0,
      // 具体的版本
      ver: null
    }
    var system = {
      win: false,
      mac: false,
      unix: false,
      linux: false,
      // 移动设备
      iphone: false,
      ipod: false,
      ipad: false,
      ios: false,
      android: false,
      winMobile: false
    }
    //在此检测呈现引擎、平台和设备
    let ua = navigator.userAgent

    if (window.opera){
      engine.ver = browser.ver = window.opera.version()
      engine.opera = browser.opera = parseFloat(engine.ver)
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
      engine.ver = RegExp["$1"]
      engine.webkit = parseFloat(engine.ver)

      // 确定是 Chrome  还是 Safari
      if (/Chrome\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"]
        browser.chrome = parseFloat(browser.ver)
      } else if (/Version\/(\S+)/.test(ua)){
        browser.ver = RegExp["$1"]
        browser.safari = parseFloat(browser.ver)
      } else {
        // 近似地确定版本号
        var safariVersion = 1
        if (engine.webkit < 100){
          safariVersion = 1
        } else if (engine.webkit < 312){
          safariVersion = 1.2
        } else if (engine.webkit < 412){
          safariVersion = 1.3
        } else {
          safariVersion = 2
        }
        browser.safari = browser.ver = safariVersion
      }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
      engine.ver = browser.ver = RegExp["$1"]
      engine.khtml = browser.konq = parseFloat(engine.ver)
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
      engine.ver = RegExp["$1"]
      engine.gecko = parseFloat(engine.ver)

      // 确定是不是 Firefox
      if (/Firefox\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"]
        browser.firefox = parseFloat(browser.ver)
      }
    } else if (/MSIE ([^;]+)/.test(ua)) {
      engine.ver = browser.ver = RegExp["$1"]
      engine.ie = browser.ie = parseFloat(engine.ver)
    } else if (/MicroMessenger\/\S/.test(ua)) {
      browser.ver = RegExp["$1"]
      browser.weixin = parseFloat(browser.ver)
    }

    // 识别系统
    let p = navigator.platform;
    system.win = p.indexOf("Win") == 0
    system.mac = p.indexOf("Mac") == 0
    system.unix = p.indexOf("X11") == 0
    system.linux = p.indexOf("Linux") == 0
    system.iphone = ua.indexOf("iPhone") > -1
    system.ipod = ua.indexOf("iPod") > -1
    system.ipod = ua.indexOf("iPad") > -1

    // 检测win系统具体版本号
    if (system.win){
      if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
        if (RegExp["$1"] == "NT"){
          console.log(RegExp["$2"])
          switch(RegExp["$2"]){
            case "5.0":
              system.win = "2000"
              break
            case "5.1":
              system.win = "XP"
              break
            case "6.0":
              system.win = "Vista"
              break
            case "6.1":
              system.win = "7"
              break
            case "8.0":
              system.win = "8"
              break
            case "10.0":
              system.win = "10"
              break
            default:
              system.win = "NT"
              break
          }
        } else if (RegExp["$1"] == "9x"){
          system.win = "ME";
        } else {
          system.win = RegExp["$1"];
        }
      }
    }

    // 检测 iOS 版本
    if (system.mac && ua.indexOf("Mobile") > -1){
      if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
        system.ios = parseFloat(RegExp.$1.replace("_", "."))
      } else {
        system.ios = 2 // 不能真正检测出来，所以只能猜测
      }
    }

    //检测 Android 版本
    if (/Android (\d+\.\d+)/.test(ua)){
      system.android = parseFloat(RegExp.$1);
    }

    //windows mobile
    if (system.win == "CE"){
      system.winMobile = system.win;
    } else if (system.win == "Ph"){
      if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
        system.win = "Phone";
        system.winMobile = parseFloat(RegExp["$1"]);
      }
    }

    return {
      engine: engine,
      browser: browser,
      system: system
    }
  },
  // 浏览器滚动到顶部
  scrollTop: (el, from = 0, to, duration = 500) => {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000/60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll(start, end, step) {
        if (start === end) return;

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
  }
}

export default utils
